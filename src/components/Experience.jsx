const experiences = [
  {
    role: "Co-founder",
    company: "SonsOfNode",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Leading an initiative focused on AI education for developers. Building educational content and community-driven projects around artificial intelligence and modern web technologies.",
    tags: ["AI", "Education", "Community", "Leadership"],
  },
  {
    role: "Co-founder",
    company: "ConnectEco",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Co-founded a technology organization focused on sustainable tech solutions and ecological connectivity. Developed web platform and collaborative projects using React, Node.js, and Python. Managed a team of developers and led strategic product planning.",
    tags: ["React", "Node.js", "Python", "Team Lead"],
  },
  {
    role: "Co-owner",
    company: "Heavens Hair",
    period: "2022 — Present",
    location: "Amsterdam, NL",
    description:
      "Co-own and operate a hair salon where I sharpen soft skills daily — discipline, creativity, resilience, and teamwork. Handle business operations, client relations, and digital presence.",
    tags: ["Business", "Operations", "Client Relations"],
  },
  {
    role: "Waiter",
    company: "Restaurant",
    period: "2017 — 2020",
    location: "Lisbon, Portugal",
    description:
      "Provided customer service in a multicultural environment, communicating in Portuguese, English, and Spanish with international clients. Developed strong interpersonal skills and problem-solving under pressure.",
    tags: ["Customer Service", "Multilingual", "Teamwork"],
  },
  {
    role: "Customer Support Agent",
    company: "OI Telecommunications",
    period: "2016 — 2017",
    location: "Belo Horizonte, Brazil",
    description:
      "Provided customer support at one of Brazil's largest telecommunications companies. Resolved technical and commercial issues via phone and chat. Consistently met satisfaction targets.",
    tags: ["Support", "Telecom", "Problem Solving"],
  },
];

const education = [
  {
    title: "Full-Stack Web Development Bootcamp",
    institution: "TripleTen",
    detail: "React, Node.js, Agile Methodologies",
  },
  {
    title: "Complete Web Development Bootcamp",
    institution: "Udemy — Dr. Angela Yu",
    detail: "HTML, CSS, JavaScript, Node.js, React, MongoDB",
  },
  {
    title: "Front-End Development",
    institution: "Origamid",
    detail: "HTML, CSS, JavaScript, React, UI/UX Design",
  },
  {
    title: "Technology Courses",
    institution: "Alura",
    detail: "Programming & Web Development",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience" aria-label="Professional experience">
      <div className="experience__inner">
        <div className="section__label reveal">Experience</div>
        <h2 className="section__title reveal">
          Where I&apos;ve <span className="gradient-text">worked</span>
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

        <div className="experience__edu-section reveal" aria-label="Education and certifications">
          <h3 className="experience__edu-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Education & Certifications
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

        <div className="experience__langs reveal" aria-label="Spoken languages">
          <h3 className="experience__langs-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Languages
          </h3>
          <dl className="experience__langs-list">
            <div className="experience__lang">
              <dt className="experience__lang-name">Portuguese</dt>
              <dd className="experience__lang-level">Native</dd>
            </div>
            <div className="experience__lang">
              <dt className="experience__lang-name">English</dt>
              <dd className="experience__lang-level">Conversational</dd>
            </div>
            <div className="experience__lang">
              <dt className="experience__lang-name">Spanish</dt>
              <dd className="experience__lang-level">Conversational</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
