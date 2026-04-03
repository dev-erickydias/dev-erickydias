"use client";

import dynamic from "next/dynamic";
import Contact from "../../components/Contact";
import ContactExtra from "../../components/ContactExtra";
import FloatingShapes from "../../components/FloatingShapes";
import { useI18n } from "../../i18n/I18nContext";

const Scene3DPage = dynamic(() => import("../../components/Scene3DPage"), { ssr: false });

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <Scene3DPage variant="contact" />
      <div className="page-header">
        <FloatingShapes />
        <div className="page-header__inner">
          <div className="section__label reveal">{t("pages.contactLabel")}</div>
          <h1 className="page-header__title reveal">
            {t("pages.contactTitle")} <span className="gradient-text">{t("pages.contactTitleAccent")}</span>
          </h1>
          <p className="page-header__sub reveal">{t("pages.contactSub")}</p>
        </div>
      </div>
      <Contact />
      <ContactExtra />
    </>
  );
}
