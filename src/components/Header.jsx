import Link from "next/link";
import handleDownload from "../utils/cvDownLoade";

export default function Header() {
  return (
    <section id="home" className="hero">
      {/* Background blobs */}
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__blob hero__blob--3" />

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Available for new projects
          </div>

          <h1 className="hero__heading">
            Hi, I&apos;m <span className="gradient-text">Ericky</span>
            <br />Full Stack Developer
          </h1>

          <p className="hero__sub">
            I craft modern web experiences that are fast, accessible,
            and visually compelling. Let&apos;s build something great together.
          </p>

          <div className="hero__actions">
            <Link href="/projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Projects
            </Link>
            <button className="btn-outline" onClick={handleDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </button>
          </div>

          <div className="hero__socials">
            <Link className="hero__social" href="https://www.linkedin.com/in/erickydias/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/image/linkedin.svg" alt="LinkedIn" />
            </Link>
            <Link className="hero__social" href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src="/image/github.svg" alt="GitHub" />
            </Link>
            <Link className="hero__social" href="https://www.instagram.com/ericky_dias/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/image/instagram.svg" alt="Instagram" />
            </Link>
          </div>
        </div>

        <div className="hero__photo-container">
          <div className="hero__photo-ring" />
          <img
            className="hero__photo"
            src="/image/header_image.png"
            alt="Ericky Dias — Full Stack Developer"
          />
        </div>
      </div>
    </section>
  );
}
