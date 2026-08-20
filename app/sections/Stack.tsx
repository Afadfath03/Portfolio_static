import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Stack({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal"><span className="lang-text">{t.stack.title}</span></h2>
      <p className="stack-heading reveal"><span className="lang-text">{t.stack.heading}</span></p>
      <div className="stack-grid reveal">
        {t.stack.categories.map((cat) => (
          <div className="stack-card" key={cat.name}>
            <div className={`stack-icon stack-icon-${cat.icon} lang-graphic`} />
            <h3 className="stack-cat-name">{cat.name}</h3>
            <div className="stack-items">
              {cat.items.map((item) => (
                <span className="stack-pill" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
