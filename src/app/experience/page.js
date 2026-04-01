"use client";

import Experience from "../../components/Experience";
import { useI18n } from "../../i18n/I18nContext";

export default function ExperiencePage() {
  const { t } = useI18n();

  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">{t("pages.expLabel")}</div>
          <h1 className="page-header__title reveal">
            {t("pages.expTitle")} <span className="gradient-text">{t("pages.expTitleAccent")}</span>
          </h1>
          <p className="page-header__sub reveal">{t("pages.expSub")}</p>
        </div>
      </div>
      <Experience />
    </>
  );
}
