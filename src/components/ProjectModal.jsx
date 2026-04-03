"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/I18nContext";

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);
  const { t } = useI18n();

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = "auto"; };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal__overlay" onClick={onClose} role="presentation">
      <div className="modal__content" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label={t("projects.closeModal")}>&times;</button>

        <div className="modal__meta">
          {project.language && <span className="modal__meta-tag modal__meta-tag--accent">{project.language}</span>}
          <span className="modal__meta-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            {project.stars || 0}
          </span>
          <span className="modal__meta-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
            {project.forks || 0}
          </span>
          {project.updatedAt && (
            <span className="modal__meta-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
        </div>

        <h2 id="project-modal-title" className="modal__title font-display">{project.name}</h2>
        <p className="modal__description">{project.longDescription || project.description}</p>

        {project.technologies?.length > 0 && (
          <div className="modal__techs">
            {project.technologies.map((tech) => (<span key={tech} className="modal__tech">{tech}</span>))}
          </div>
        )}

        <div className="modal__btns">
          {project.deploy && (
            <a className="modal__btn modal__btn--site" href={project.deploy} target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              {t("projects.liveSite")}
            </a>
          )}
          {project.repository && (
            <a className="modal__btn modal__btn--repo" href={project.repository} target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              {t("projects.repository")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
