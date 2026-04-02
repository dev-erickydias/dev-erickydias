'use client';

import { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import { useI18n } from '../i18n/I18nContext';

const API_URL =
  'https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&sort=updated&order=desc&per_page=100';

function formatName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function mapRepo(repo) {
  const technologies = [];
  if (repo.language) technologies.push(repo.language);
  repo.topics?.forEach((t) => {
    if (!technologies.includes(t)) technologies.push(t);
  });
  return {
    id: repo.id,
    name: formatName(repo.name),
    description: repo.description || '',
    technologies,
    category: repo.language || 'Other',
    isFeatured: repo.stats?.stars > 0,
    deploy: repo.homepage || null,
    repository: repo.url,
    stars: repo.stats?.stars || 0,
    forks: repo.stats?.forks || 0,
    language: repo.language || null,
    updatedAt: repo.dates?.updated_at || null,
  };
}

export default function Projects() {
  const { t } = useI18n();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then((data) => {
        setProjects((data.projects || []).map(mapRepo));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="projects"
        aria-label={t('projects.label')}
      >
        <div className="projects__inner">
          <div className="projects__header">
            <div className="section__label">{t('projects.label')}</div>
            <h2 className="section__title">{t('projects.title')}</h2>
          </div>
          <div className="projects__grid stagger-children" aria-busy="true">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="project__card project__card--skeleton"
                aria-hidden="true"
              >
                <div className="skeleton-line skeleton-line--short" />
                <div className="skeleton-line skeleton-line--long" />
                <div className="skeleton-line skeleton-line--medium" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="projects"
        aria-label={t('projects.label')}
      >
        <div className="projects__inner">
          <div className="projects__header">
            <div className="section__label">{t('projects.label')}</div>
            <h2 className="section__title">{t('projects.title')}</h2>
          </div>
          <p className="projects__error" role="alert">
            {t('projects.error')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="projects"
      aria-label={t('projects.label')}
    >
      <div className="projects__inner">
        <div className="projects__header">
          <div className="section__label reveal">{t('projects.label')}</div>
          <h2 className="section__title reveal">{t('projects.title')}</h2>
        </div>
        <div className="projects__grid stagger-children">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project__card reveal ${project.isFeatured ? 'project__card--featured' : ''}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${t('projects.viewDetails')} ${project.name}`}
            >
              <span className="project__card_number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project__card_header">
                <svg
                  className="project__card_icon"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              {project.isFeatured && (
                <span className="project__card_featured">
                  {t('projects.featured')}
                </span>
              )}
              <span className="project__card_category">{project.category}</span>
              <h3 className="project__card_title font-display">
                {project.name}
              </h3>
              <p className="project__card_text">
                {project.description || t('projects.error')}
              </p>
              <div className="project__card_techs">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="project__card_tech">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="project__card_tech">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
