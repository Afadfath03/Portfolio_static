import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Services({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.services.title}</span></h2>
      <p className="services-heading reveal"><span className="lang-text">{t.services.heading}</span></p>
      <div className="services-grid reveal">
        {t.services.items.map((svc) => (
          <div className="services-card" key={svc.name}>
            <div className={`stack-icon stack-icon-${svc.icon} lang-graphic`} />
            <span className="services-name">{svc.name}</span>
            <div className="services-tools">
              {svc.tools.map((tool) => (
                <span className="stack-pill" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
