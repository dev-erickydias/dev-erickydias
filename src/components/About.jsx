"use client";

import Image from "next/image";
import handleDownload from "../utils/cvDownLoade";
import { useI18n } from "../i18n/I18nContext";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="about" aria-label={t("about.label")}>
      <div className="about__inner">
        <div className="about__sidebar reveal-left">
          <div className="about__photo-wrap">
            <Image
              className="about__photo"
              src="/erickynew.jpg"
              alt={t("hero.photoAlt")}
              width={380}
              height={380}
              quality={85}
            />
          </div>
          <button className="btn-primary about__download" onClick={handleDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {t("about.downloadCv")}
          </button>
        </div>

        <div className="about__content">
          <div className="section__label about__label reveal">{t("about.label")}</div>
          <h2 className="about__heading reveal">
            {t("about.heading")} <span className="gradient-text">{t("about.headingAccent")}</span> {t("about.headingSuffix")}
          </h2>

          <p className="about__text reveal">{t("about.p1")}</p>

          <p className="about__text reveal">
            {t("about.p2_prefix")} <span className="about__highlight">{t("about.p2_sons")}</span>
            {t("about.p2_mid1")} <span className="about__highlight">{t("about.p2_eco")}</span>
            {t("about.p2_mid2")} <span className="about__highlight">{t("about.p2_heavens")}</span> {t("about.p2_suffix")}
          </p>

          <p className="about__text reveal">{t("about.p3")}</p>

          <div className="about__stats reveal" role="list" aria-label="Key statistics">
            <div className="about__stat" role="listitem">
              <div className="about__stat-number">2+</div>
              <div className="about__stat-label">{t("about.yearsExp")}</div>
            </div>
            <div className="about__stat" role="listitem">
              <div className="about__stat-number">9+</div>
              <div className="about__stat-label">{t("about.projects")}</div>
            </div>
            <div className="about__stat" role="listitem">
              <div className="about__stat-number">3</div>
              <div className="about__stat-label">{t("about.languages")}</div>
            </div>
            <div className="about__stat" role="listitem">
              <div className="about__stat-number">3</div>
              <div className="about__stat-label">{t("about.countries")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
