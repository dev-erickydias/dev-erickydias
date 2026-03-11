"use client";

import Projects from "../../components/Projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">Work</div>
          <h1 className="page-header__title reveal">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="page-header__sub reveal">
            Real-world applications built with modern technologies.
          </p>
        </div>
      </div>
      <Projects />
    </>
  );
}
