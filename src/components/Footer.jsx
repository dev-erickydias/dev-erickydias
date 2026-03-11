import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner reveal">
        <div className="footer__brand">
          <div className="footer__name">Ericky<span>.</span></div>
          <div className="footer__tagline">Full Stack Developer</div>
        </div>

        <div className="footer__links">
          <Link href="/" className="footer__link">Home</Link>
          <Link href="/about" className="footer__link">About</Link>
          <Link href="/experience" className="footer__link">Experience</Link>
          <Link href="/projects" className="footer__link">Projects</Link>
          <Link href="/contact" className="footer__link">Contact</Link>
        </div>

        <div className="footer__socials">
          <Link className="footer__social" href="https://www.linkedin.com/in/erickydias/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src="/image/linkedin.svg" alt="LinkedIn" />
          </Link>
          <Link className="footer__social" href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/image/github.svg" alt="GitHub" />
          </Link>
          <Link className="footer__social" href="https://www.instagram.com/ericky_dias/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/image/instagram.svg" alt="Instagram" />
          </Link>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">&copy; 2026 Ericky Dias. All rights reserved.</p>
      </div>
    </footer>
  );
}
