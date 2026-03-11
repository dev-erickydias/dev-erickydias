"use client";

import Contact from "../../components/Contact";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">Contact</div>
          <h1 className="page-header__title reveal">
            Let&apos;s <span className="gradient-text">connect</span>
          </h1>
          <p className="page-header__sub reveal">
            I&apos;m always open to new opportunities and interesting projects.
          </p>
        </div>
      </div>

      <Contact />

      {/* Extra contact info section */}
      <section className="contact-extra">
        <div className="contact-extra__inner">
          <div className="contact-extra__grid">
            {/* Availability */}
            <div className="contact-extra__card reveal-scale">
              <div className="contact-extra__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="contact-extra__title">Availability</h3>
              <p className="contact-extra__text">
                Open to full-time, part-time, or freelance work. Flexible hours and
                available for remote or hybrid positions.
              </p>
            </div>

            {/* Response Time */}
            <div className="contact-extra__card reveal-scale">
              <div className="contact-extra__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="contact-extra__title">Response Time</h3>
              <p className="contact-extra__text">
                I typically respond within 24 hours. For urgent matters, reach me
                directly on LinkedIn.
              </p>
            </div>

            {/* What I Work On */}
            <div className="contact-extra__card reveal-scale">
              <div className="contact-extra__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="contact-extra__title">What I Work On</h3>
              <p className="contact-extra__text">
                Web applications, landing pages, e-commerce, SaaS platforms,
                API development, and technical consulting.
              </p>
            </div>

            {/* Languages */}
            <div className="contact-extra__card reveal-scale">
              <div className="contact-extra__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="contact-extra__title">I Speak</h3>
              <p className="contact-extra__text">
                Portuguese (native), English (conversational), and Spanish
                (conversational). Comfortable in multicultural environments.
              </p>
            </div>
          </div>

          {/* Social links strip */}
          <div className="contact-extra__socials reveal">
            <h3 className="contact-extra__socials-title">Find me on</h3>
            <div className="contact-extra__socials-grid">
              <Link href="https://www.linkedin.com/in/erickydias/" target="_blank" rel="noopener noreferrer" className="contact-extra__social">
                <img src="/image/linkedin.svg" alt="LinkedIn" />
                <span>LinkedIn</span>
              </Link>
              <Link href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" className="contact-extra__social">
                <img src="/image/github.svg" alt="GitHub" />
                <span>GitHub</span>
              </Link>
              <Link href="https://www.instagram.com/ericky_dias/" target="_blank" rel="noopener noreferrer" className="contact-extra__social">
                <img src="/image/instagram.svg" alt="Instagram" />
                <span>Instagram</span>
              </Link>
              <Link href="https://discord.com/users/344918178679357441" target="_blank" rel="noopener noreferrer" className="contact-extra__social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                <span>Discord</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
