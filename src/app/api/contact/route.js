import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const MAX_LEN = { first_name: 50, last_name: 50, email: 100, subject: 150, message: 2000 };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiting (per IP, 1 request per 30 seconds)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 30000;
const MAX_REQUESTS = 1;

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

function getRateKey(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { timestamp: now, count: 1 });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count++;
  return false;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.timestamp > RATE_LIMIT_WINDOW * 2) rateLimitMap.delete(key);
  }
}, 300000);

export async function POST(request) {
  const ip = getRateKey(request);

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait 30 seconds." },
      { status: 429 }
    );
  }

  if (!supabase) {
    return Response.json(
      { error: "Service unavailable" },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check — if filled, silently succeed (bots fill hidden fields)
  if (body.website) {
    return Response.json({ success: true });
  }

  // Validate and sanitize
  const first_name = stripHtml(String(body.first_name || "")).slice(0, MAX_LEN.first_name);
  const last_name = stripHtml(String(body.last_name || "")).slice(0, MAX_LEN.last_name);
  const email = stripHtml(String(body.email || "")).slice(0, MAX_LEN.email);
  const subject = stripHtml(String(body.subject || "")).slice(0, MAX_LEN.subject);
  const message = stripHtml(String(body.message || "")).slice(0, MAX_LEN.message);

  if (!first_name || !last_name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return Response.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert({
      first_name,
      last_name,
      email,
      services: subject,
      message,
    });

    if (error) throw error;

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to submit" }, { status: 500 });
  }
}
