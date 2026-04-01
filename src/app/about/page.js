"use client";

import About from "../../components/About";
import Skills from "../../components/Skills";
import { useI18n } from "../../i18n/I18nContext";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">{t("pages.aboutLabel")}</div>
          <h1 className="page-header__title reveal">
            {t("pages.aboutTitle")} <span className="gradient-text">{t("pages.aboutTitleAccent")}</span>
          </h1>
          <p className="page-header__sub reveal">{t("pages.aboutSub")}</p>
        </div>
      </div>
      <About />
      <Skills />
    </>
  );
}
