"use client";

import Contact from "../../components/Contact";
import ContactExtra from "../../components/ContactExtra";
import { useI18n } from "../../i18n/I18nContext";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <div className="page-header">
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
