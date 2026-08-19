import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Experience({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.experience.title}</span></h2>
      <p className="exp-heading reveal"><span className="lang-text">{t.experience.heading}</span></p>
      <div className="exp-list reveal">
        {[...t.experience.items].sort((a, b) => b.no - a.no).map((item, i) => (
          <article className="exp-card" key={i}>
            <div className="exp-top">
              <span className="exp-period"><span className="lang-text">{item.period}</span></span>
            </div>
            <h3 className="exp-role"><span className="lang-text">{item.role}</span></h3>
            <p className="exp-company"><span className="lang-text">{item.company}</span></p>
            <p><span className="lang-text">{item.desc}</span></p>
            {item.tags.length > 0 && (
              <div className="exp-tags">
                {item.tags.map((tag) => (
                  <span className="exp-tag" key={tag}><span className="lang-text">{tag}</span></span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
