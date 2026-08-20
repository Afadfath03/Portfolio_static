import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function About({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.about.title}</span></h2>
      <div className="about-panel reveal">
        {t.about.image && (
          <img className="about-image lang-graphic" src={t.about.image} alt="About" />
        )}
        <p className="about-heading"><span className="lang-text">{t.about.heading}</span></p>
        <p><span className="lang-text">{t.about.body}</span></p>
        <div className="about-stats">
          {t.about.stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <b>{s.value}</b>
              <span className="lang-text">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
