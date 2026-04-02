"use client";

import Projects from "../../components/Projects";
import FloatingShapes from "../../components/FloatingShapes";
import { useI18n } from "../../i18n/I18nContext";

export default function ProjectsPage() {
  const { t } = useI18n();

  return (
    <>
      <div className="page-header">
        <FloatingShapes />
        <div className="page-header__inner">
          <div className="section__label reveal">{t("pages.projLabel")}</div>
          <h1 className="page-header__title reveal">
            {t("pages.projTitle")} <span className="gradient-text">{t("pages.projTitleAccent")}</span>
          </h1>
          <p className="page-header__sub reveal">{t("pages.projSub")}</p>
        </div>
      </div>
      <Projects />
    </>
  );
}
