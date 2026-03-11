"use client";

import About from "../../components/About";
import Skills from "../../components/Skills";

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">About</div>
          <h1 className="page-header__title reveal">
            Get to know <span className="gradient-text">me</span>
          </h1>
          <p className="page-header__sub reveal">
            Developer, entrepreneur, and lifelong learner.
          </p>
        </div>
      </div>
      <About />
      <Skills />
    </>
  );
}
