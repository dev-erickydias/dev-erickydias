"use client";

import { useState } from "react";
import projects from "../data/projects";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <div className="projects__header">
          <div className="section__label reveal">Work</div>
          <h2 className="section__title reveal">Featured Projects</h2>
        </div>

        <div className="projects__grid stagger-children">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project__card reveal ${project.isFeatured ? "project__card--featured" : ""}`}
              onClick={() => setSelectedProject(project)}
            >
              <span className="project__card_number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="project__card_header">
                <svg
                  className="project__card_icon"
                  width="32" height="32"
                  viewBox="0 0 24 24" fill="none"
                  stroke="var(--accent)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {project.isFeatured && (
                <span className="project__card_featured">Featured</span>
              )}

              <span className="project__card_category">{project.category}</span>

              <h3 className="project__card_title font-display">{project.name}</h3>
              <p className="project__card_text">{project.description}</p>

              <div className="project__card_techs">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="project__card_tech">{tech}</span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="project__card_tech">+{project.technologies.length - 4}</span>
                )}
              </div>
            </div>
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
