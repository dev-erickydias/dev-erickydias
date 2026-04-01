"use client";

import { useI18n } from "../i18n/I18nContext";

export default function Experience() {
  const { t } = useI18n();

  const experiences = [
    {
      role: t("experience.roles.cofounder"),
      company: "SonsOfNode",
      period: "2024 — Present",
      location: "Remote",
      description: t("experience.descriptions.sons"),
      tags: ["AI", "Education", "Community", "Leadership"],
    },
    {
      role: t("experience.roles.cofounder"),
      company: "ConnectEco",
      period: "2023 — Present",
      location: "Remote",
      description: t("experience.descriptions.eco"),
      tags: ["React", "Node.js", "Python", "Team Lead"],
    },
    {
      role: t("experience.roles.coowner"),
      company: "Heavens Hair",
      period: "2022 — Present",
      location: "Amsterdam, NL",
      description: t("experience.descriptions.heavens"),
      tags: ["Business", "Operations", "Client Relations"],
    },
    {
      role: t("experience.roles.waiter"),
      company: "Restaurant",
      period: "2017 — 2020",
      location: "Lisbon, Portugal",
      description: t("experience.descriptions.restaurant"),
      tags: ["Customer Service", "Multilingual", "Teamwork"],
    },
    {
      role: t("experience.roles.support"),
      company: "OI Telecommunications",
      period: "2016 — 2017",
      location: "Belo Horizonte, Brazil",
      description: t("experience.descriptions.oi"),
      tags: ["Support", "Telecom", "Problem Solving"],
    },
  ];

  const education = [
    { title: t("experience.education.tripleten"), institution: "TripleTen", detail: t("experience.education.tripletenDetail") },
    { title: t("experience.education.udemy"), institution: t("experience.education.udemyInst"), detail: t("experience.education.udemyDetail") },
    { title: t("experience.education.origamid"), institution: "Origamid", detail: t("experience.education.origamidDetail") },
    { title: t("experience.education.alura"), institution: "Alura", detail: t("experience.education.aluraDetail") },
  ];

  return (
    <section id="experience" className="experience" aria-label={t("experience.label")}>
      <div className="experience__inner">
        <div className="section__label reveal">{t("experience.label")}</div>
        <h2 className="section__title reveal">
          {t("experience.title")} <span className="gradient-text">{t("experience.titleAccent")}</span>
        </h2>

        <div className="experience__timeline">
          {experiences.map((exp, i) => (
            <article key={i} className="experience__item reveal">
              <div className="experience__dot" aria-hidden="true" />
              <div className="experience__card">
                <div className="experience__card-top">
                  <div>
                    <h3 className="experience__role">{exp.role}</h3>
                    <div className="experience__company">{exp.company}</div>
                  </div>
                  <div className="experience__meta">
                    <time className="experience__period">{exp.period}</time>
                    <span className="experience__location">{exp.location}</span>
                  </div>
                </div>
                <p className="experience__desc">{exp.description}</p>
                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="experience__edu-section reveal">
          <h3 className="experience__edu-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            {t("experience.eduHeading")}
          </h3>
          <div className="experience__edu-grid">
            {education.map((edu, i) => (
              <div key={i} className="experience__edu-card">
                <div className="experience__edu-title">{edu.title}</div>
                <div className="experience__edu-inst">{edu.institution}</div>
                <div className="experience__edu-detail">{edu.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience__langs reveal">
          <h3 className="experience__langs-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t("experience.langsHeading")}
          </h3>
          <dl className="experience__langs-list">
            <div className="experience__lang">
              <dt className="experience__lang-name">{t("experience.langs.portuguese")}</dt>
              <dd className="experience__lang-level">{t("experience.langs.native")}</dd>
            </div>
            <div className="experience__lang">
              <dt className="experience__lang-name">{t("experience.langs.english")}</dt>
              <dd className="experience__lang-level">{t("experience.langs.conversational")}</dd>
            </div>
            <div className="experience__lang">
              <dt className="experience__lang-name">{t("experience.langs.spanish")}</dt>
              <dd className="experience__lang-level">{t("experience.langs.conversational")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
