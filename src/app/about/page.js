import About from "../../components/About";
import Skills from "../../components/Skills";

export const metadata = {
  title: "About",
  description:
    "Learn about Ericky Dias: trilingual Full Stack Developer with 2+ years of experience in React, Next.js, and modern web technologies. Based in the Netherlands.",
  openGraph: {
    title: "About Ericky Dias",
    description:
      "Trilingual Full Stack Developer from Brazil, living in the Netherlands. 2+ years building modern web apps.",
  },
  alternates: {
    canonical: "/about",
  },
};

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
