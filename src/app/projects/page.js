import Projects from "../../components/Projects";

export const metadata = {
  title: "Projects",
  description:
    "Featured projects by Ericky Dias: real-world web applications built with React, Next.js, TypeScript, Supabase, and modern technologies. Shipped to production.",
  openGraph: {
    title: "Projects — Ericky Dias",
    description:
      "Real-world applications built with modern technologies and shipped to production.",
  },
  alternates: {
    canonical: "/projects",
  },
};

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
            Real-world applications built with modern technologies and shipped to production.
          </p>
        </div>
      </div>
      <Projects />
    </>
  );
}
