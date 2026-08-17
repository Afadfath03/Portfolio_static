import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Works({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal">{t.works.title}</h2>
      <div className="works-grid">
        {[...t.works.items].sort((a, b) => b.no - a.no).map((w, i) => (
          <article className="work-card reveal" key={i}>
            {w.image && <img className="work-image" src={w.image} alt={w.name} />}
            <div className="work-badges">
              <span className="work-tag">{w.tag}</span>
              <span className={`work-type work-type-${w.type}`} />
            </div>
            <h3>{w.name}</h3>
            <p>{w.desc}</p>
            {w.links?.some((l) => l.href) && (
              <div className="work-links">
                {w.links.filter((l) => l.href).map((l) => (
                  <a key={l.label} className="work-link" href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
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
