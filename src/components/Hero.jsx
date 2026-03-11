const techs = [
  { src: "/image/htmlimg.svg", label: "HTML5" },
  { src: "/image/css.svg", label: "CSS3" },
  { src: "/image/javascript.svg", label: "JavaScript" },
  { src: "/image/nextjs.svg", label: "Next.js" },
  { src: "/image/react.svg", label: "React" },
];

export default function Hero() {
  const items = [...techs, ...techs, ...techs, ...techs];

  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((tech, i) => (
          <div key={i} className="marquee__item">
            <img src={tech.src} alt={tech.label} />
            <span className="marquee__label">{tech.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
