import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner reveal">
        <div className="footer__brand">
          <div className="footer__name">Ericky<span>.</span></div>
          <div className="footer__tagline">Full Stack Developer</div>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link href="/" className="footer__link">Home</Link>
          <Link href="/about" className="footer__link">About</Link>
          <Link href="/experience" className="footer__link">Experience</Link>
          <Link href="/projects" className="footer__link">Projects</Link>
          <Link href="/contact" className="footer__link">Contact</Link>
        </nav>

        <nav className="footer__socials" aria-label="Social media">
          <a className="footer__social" href="https://www.linkedin.com/in/erickydias/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image src="/image/linkedin.svg" alt="" width={20} height={20} aria-hidden="true" />
          </a>
          <a className="footer__social" href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Image src="/image/github.svg" alt="" width={20} height={20} aria-hidden="true" />
          </a>
          <a className="footer__social" href="https://www.instagram.com/ericky_dias/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src="/image/instagram.svg" alt="" width={20} height={20} aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">&copy; {new Date().getFullYear()} Ericky Dias. All rights reserved.</p>
      </div>
    </footer>
  );
}
