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
  const isPortfolio = repo.name === 'dev-erickydias';
  return {
    id: repo.id,
    rawName: repo.name,
    name: formatName(repo.name),
    description: repo.description || '',
    technologies,
    category: repo.language || 'Other',
    isFeatured: repo.stats?.stars > 0 || isPortfolio,
    isPortfolio,
    deploy: isPortfolio ? null : (repo.homepage || null),
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
              className={`project__card reveal ${project.isFeatured ? 'project__card--featured' : ''} ${project.isPortfolio ? 'project__card--portfolio' : ''}`}
              onClick={() => !project.isPortfolio && setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!project.isPortfolio) setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role={project.isPortfolio ? 'article' : 'button'}
              aria-label={project.isPortfolio ? project.name : `${t('projects.viewDetails')} ${project.name}`}
            >
              {project.isPortfolio && (
                <div className="project__card_portfolio-badge" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {t('projects.youAreHere') || 'You are here'}
                </div>
              )}
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
                  stroke={project.isPortfolio ? 'var(--secondary)' : 'var(--accent)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {project.isPortfolio
                    ? <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>
                    : <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  }
                </svg>
              </div>
              {project.isPortfolio ? (
                <span className="project__card_featured project__card_featured--portfolio">
                  {t('projects.thisPortfolio') || 'This Portfolio'}
                </span>
              ) : project.isFeatured ? (
                <span className="project__card_featured">
                  {t('projects.featured')}
                </span>
              ) : null}
              <span className="project__card_category">{project.category}</span>
              <h3 className="project__card_title font-display">
                {project.name}
              </h3>
              <p className="project__card_text">
                {project.description || t('projects.error')}
              </p>
              {project.isPortfolio && (
                <div className="project__card_portfolio-links">
                  <a className="project__card_portfolio-link" href={project.repository} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    {t('projects.sourceCode') || 'Source Code'}
                  </a>
                </div>
              )}
              {!project.isPortfolio && (
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
              )}
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
