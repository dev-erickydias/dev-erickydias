"use client";

import Experience from "../../components/Experience";

export default function ExperiencePage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">Experience</div>
          <h1 className="page-header__title reveal">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h1>
          <p className="page-header__sub reveal">
            My professional journey across three countries.
          </p>
        </div>
      </div>
      <Experience />
    </>
  );
}
