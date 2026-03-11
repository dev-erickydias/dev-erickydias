"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__info reveal-left">
          <div className="section__label">Contact</div>
          <h2 className="section__title">
            Let&apos;s <span className="gradient-text">work together</span>
          </h2>
          <p className="contact__desc">
            Have a project in mind or want to chat? Fill out the form and
            I&apos;ll get back to you as soon as possible.
          </p>

          <div className="contact__details">
            <div className="contact__detail">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact__detail-label">Email</div>
                <a href="mailto:deverickydias@gmail.com" className="contact__detail-value">
                  deverickydias@gmail.com
                </a>
              </div>
            </div>

            <div className="contact__detail">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact__detail-label">Location</div>
                <div className="contact__detail-value">Netherlands</div>
              </div>
            </div>

            <div className="contact__detail">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <div className="contact__detail-label">LinkedIn</div>
                <a
                  href="https://www.linkedin.com/in/erickydias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__detail-value"
                >
                  /in/erickydias
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          className="contact__form reveal-right"
          onSubmit={handleSubmit}
        >
          <div className="contact__field">
            <label htmlFor="name" className="contact__label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="contact__input"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email" className="contact__label">Return Contact</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className="contact__input"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="subject" className="contact__label">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What is this about?"
              value={formData.subject}
              onChange={handleChange}
              className="contact__input"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message" className="contact__label">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={handleChange}
              className="contact__input contact__textarea"
            />
          </div>

          <button
            type="submit"
            className="btn-primary contact__submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="contact__spinner" />
                Sending...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Message
              </>
            )}
          </button>

          {status === "success" && (
            <div className="contact__toast contact__toast--success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              Message sent successfully!
            </div>
          )}
          {status === "error" && (
            <div className="contact__toast contact__toast--error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
              Something went wrong. Try again!
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
