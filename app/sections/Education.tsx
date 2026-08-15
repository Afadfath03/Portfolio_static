import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Education({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal">{t.education.title}</h2>
      <p className="edu-heading reveal">{t.education.heading}</p>
      <div className="edu-list reveal">
        {t.education.items.map((item, i) => (
          <article className="edu-card" key={i}>
            <span className="edu-year">{item.year}</span>
            <h3 className="edu-degree">{item.degree}</h3>
            <p className="edu-school">{item.school}</p>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
