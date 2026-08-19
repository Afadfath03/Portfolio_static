import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Education({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.education.title}</span></h2>
      <p className="edu-heading reveal"><span className="lang-text">{t.education.heading}</span></p>
      <div className="edu-list reveal">
        {[...t.education.items].sort((a, b) => b.no - a.no).map((item, i) => (
          <article className="edu-card" key={i}>
            <span className="edu-year"><span className="lang-text">{item.year}</span></span>
            <h3 className="edu-degree"><span className="lang-text">{item.degree}</span></h3>
            <p className="edu-school"><span className="lang-text">{item.school}</span></p>
            <p><span className="lang-text">{item.desc}</span></p>
          </article>
        ))}
      </div>
    </section>
  );
}
