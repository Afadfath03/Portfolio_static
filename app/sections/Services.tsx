import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Services({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal">{t.services.title}</h2>
      <p className="services-heading reveal">{t.services.heading}</p>
      <div className="services-grid reveal">
        {t.services.items.map((svc) => (
          <div className="services-card" key={svc.name}>
            <div className={`stack-icon stack-icon-${svc.icon}`} />
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
