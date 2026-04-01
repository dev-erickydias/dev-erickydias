import { DM_Sans, Playfair_Display, JetBrains_Mono, Caveat } from "next/font/google";
import "../blocks/globals.css";
import ClientLayout from "../components/ClientLayout";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-nf",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-nf",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-nf",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["400", "700"],
});

const SITE_URL = "https://erickydias.dev";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ericky Dias | Full Stack Developer",
    template: "%s | Ericky Dias",
  },
  description:
    "Portfolio of Ericky Dias — Full Stack Developer experienced in React, Next.js, TypeScript, Node.js, and MongoDB. Building modern web experiences from Brazil to the Netherlands.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Ericky Dias",
    "Web Developer Netherlands",
    "Frontend Developer",
    "Portfolio",
  ],
  authors: [{ name: "Ericky Dias", url: SITE_URL }],
  creator: "Ericky Dias",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ericky Dias Portfolio",
    title: "Ericky Dias | Full Stack Developer",
    description:
      "Full Stack Developer crafting modern web experiences with React, Next.js, TypeScript, and Node.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ericky Dias — Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ericky Dias | Full Stack Developer",
    description:
      "Full Stack Developer crafting modern web experiences with React, Next.js, TypeScript, and Node.js.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ericky Dias",
  url: SITE_URL,
  image: `${SITE_URL}/erickynew.jpg`,
  jobTitle: "Full Stack Developer",
  description:
    "Trilingual Full Stack Developer with 2+ years of experience building modern web applications.",
  knowsLanguage: ["Portuguese", "English", "Spanish"],
  sameAs: [
    "https://www.linkedin.com/in/erickydias/",
    "https://github.com/dev-erickydias",
    "https://www.instagram.com/ericky_dias/",
  ],
  worksFor: [
    { "@type": "Organization", name: "Fronnexus" },
    { "@type": "Organization", name: "ConnectEco" },
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
    "MongoDB", "Tailwind CSS", "PostgreSQL", "Docker",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        <meta name="theme-color" content="#818CF8" />
        <link rel="preconnect" href="https://api-pearl-nine-29.vercel.app" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.dataset.theme=t}else if(window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.dataset.theme="light"}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
