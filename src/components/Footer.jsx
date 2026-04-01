"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner reveal">
        <div className="footer__brand">
          <div className="footer__name">Ericky<span>.</span></div>
          <div className="footer__tagline">{t("footer.tagline")}</div>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link href="/" className="footer__link">{t("nav.home")}</Link>
          <Link href="/about" className="footer__link">{t("nav.about")}</Link>
          <Link href="/experience" className="footer__link">{t("nav.experience")}</Link>
          <Link href="/projects" className="footer__link">{t("nav.projects")}</Link>
          <Link href="/contact" className="footer__link">{t("nav.contact")}</Link>
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
        <p className="footer__copy">&copy; {new Date().getFullYear()} {t("footer.copy")}</p>
      </div>
    </footer>
  );
}
