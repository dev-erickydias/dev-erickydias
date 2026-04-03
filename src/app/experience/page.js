"use client";

import dynamic from "next/dynamic";
import Experience from "../../components/Experience";
import FloatingShapes from "../../components/FloatingShapes";
import { useI18n } from "../../i18n/I18nContext";

const Scene3DPage = dynamic(() => import("../../components/Scene3DPage"), { ssr: false });

export default function ExperiencePage() {
  const { t } = useI18n();

  return (
    <>
      <Scene3DPage variant="experience" />
      <div className="page-header">
        <FloatingShapes />
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
