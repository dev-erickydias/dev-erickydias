"use client";

import { useI18n } from "../i18n/I18nContext";

const skillCategories = [
  {
    titleKey: "skills.frontend",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    titleKey: "skills.backend",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "PostgreSQL", level: 70 },
      { name: "Firebase", level: 65 },
    ],
  },
  {
    titleKey: "skills.tools",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Figma", level: 75 },
      { name: "Docker", level: 60 },
      { name: "Vercel", level: 85 },
      { name: "Linux", level: 70 },
      { name: "CI/CD", level: 65 },
    ],
  },
];

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="skills" aria-label={t("skills.label")}>
      <div className="skills__inner">
        <div className="section__label reveal">{t("skills.label")}</div>
        <h2 className="section__title reveal">
          {t("skills.title")} <span className="gradient-text">{t("skills.titleAccent")}</span>
        </h2>
        <p className="skills__subtitle reveal">{t("skills.subtitle")}</p>

        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <div key={cat.titleKey} className="skills__card reveal-scale" style={{ "--card-index": i }}>
              <div className="skills__card-header">
                <div className="skills__card-icon">{cat.icon}</div>
                <h3 className="skills__card-title">{t(cat.titleKey)}</h3>
              </div>
              <div className="skills__bars">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skills__bar-row">
                    <div className="skills__bar-info">
                      <span className="skills__bar-name">{skill.name}</span>
                      <span className="skills__bar-pct" aria-label={`${skill.level}%`}>{skill.level}%</span>
                    </div>
                    <div className="skills__bar-track" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
                      <div className="skills__bar-fill" style={{ "--bar-width": `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
