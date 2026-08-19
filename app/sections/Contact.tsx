import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Contact({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.contact.title}</span></h2>
      <div className="cc-card reveal">
        <p className="cc-head"><span className="lang-text">{t.contact.heading}</span></p>
        <ul className="cc-list">
          {t.contact.links.map((l) => (
            <li key={l.label}>
              <span className="lang-text">{l.label}</span>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                <span className="lang-text">{l.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
