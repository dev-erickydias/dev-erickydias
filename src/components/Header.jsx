"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import handleDownload from "../utils/cvDownLoade";
import { useI18n } from "../i18n/I18nContext";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <>
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />
      <div className="hero__blob hero__blob--3" />
    </>
  ),
});

export default function Header() {
  const { t } = useI18n();

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <Scene3D />

      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge" aria-label={t("hero.badge")}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {t("hero.badge")}
          </div>

          <h1 className="hero__heading">
            {t("hero.greeting")} <span className="gradient-text">{t("hero.name")}</span>
            <br />{t("hero.role")}
          </h1>

          <p className="hero__sub">{t("hero.sub")}</p>

          <div className="hero__actions">
            <Link href="/projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {t("hero.viewProjects")}
            </Link>
            <button className="btn-outline" onClick={handleDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {t("hero.downloadCv")}
            </button>
          </div>

          <nav className="hero__socials" aria-label="Social media">
            <a className="hero__social" href="https://www.linkedin.com/in/erickydias/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Image src="/image/linkedin.svg" alt="" width={24} height={24} aria-hidden="true" />
            </a>
            <a className="hero__social" href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Image src="/image/github.svg" alt="" width={24} height={24} aria-hidden="true" />
            </a>
            <a className="hero__social" href="https://www.instagram.com/ericky_dias/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Image src="/image/instagram.svg" alt="" width={24} height={24} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="hero__photo-container">
          <div className="hero__photo-ring" aria-hidden="true" />
          <Image
            className="hero__photo"
            src="/image/header_image.png"
            alt={t("hero.photoAlt")}
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
