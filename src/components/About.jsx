"use client";
import handleDownload from "../utils/cvDownLoade";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        {/* Sidebar */}
        <div className="about__sidebar reveal-left">
          <div className="about__photo-wrap">
            <img
              className="about__photo"
              src="/erickynew.jpg"
              alt="Ericky Dias"
            />
          </div>
          <button className="btn-primary about__download" onClick={handleDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </button>
        </div>

        {/* Content */}
        <div className="about__content">
          <div className="section__label about__label reveal">About</div>
          <h2 className="about__heading reveal">
            Crafting <span className="gradient-text">digital experiences</span> with passion and precision
          </h2>

          <p className="about__text reveal">
            I&apos;m Ericky Dias, a trilingual Full Stack Developer (Portuguese,
            English, Spanish) with 2+ years of experience building modern web
            applications. With an international background spanning Brazil,
            Portugal, and the Netherlands, I bring strong cultural adaptability
            and communication skills to every project.
          </p>

          <p className="about__text reveal">
            As co-founder of <span className="about__highlight">SonsOfNode</span>,
            I lead an initiative focused on AI education for developers. I also
            co-founded <span className="about__highlight">ConnectEco</span>, a
            sustainable tech platform, and co-own
            {" "}<span className="about__highlight">Heavens Hair</span> salon in
            Amsterdam — where I sharpen my soft skills daily through discipline,
            creativity, and teamwork.
          </p>

          <p className="about__text reveal">
            I love transforming ideas into beautiful, functional products that make
            an impact. My training includes bootcamps at TripleTen and Udemy,
            along with courses at Origamid and Alura.
          </p>

          <div className="about__stats reveal">
            <div className="about__stat">
              <div className="about__stat-number">2+</div>
              <div className="about__stat-label">Years Exp</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">6+</div>
              <div className="about__stat-label">Projects</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">3</div>
              <div className="about__stat-label">Languages</div>
            </div>
            <div className="about__stat">
              <div className="about__stat-number">3</div>
              <div className="about__stat-label">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
