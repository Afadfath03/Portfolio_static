import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Works({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.works.title}</span></h2>
      <div className="works-grid">
        {[...t.works.items].sort((a, b) => b.no - a.no).map((w, i) => (
          <article className="work-card reveal" key={i}>
            {w.image && <img className="work-image" src={w.image} alt={w.name} />}
            <div className="work-badges">
              <span className="work-tag"><span className="lang-text">{w.tag}</span></span>
              <span className={`work-type work-type-${w.type}`} />
            </div>
            <h3><span className="lang-text">{w.name}</span></h3>
            <p><span className="lang-text">{w.desc}</span></p>
            {w.links?.some((l) => l.href) && (
              <div className="work-links">
                {w.links.filter((l) => l.href).map((l) => (
                  <a key={l.label} className="work-link" href={l.href} target="_blank" rel="noopener noreferrer">
                    <span className="lang-text">{l.label}</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
