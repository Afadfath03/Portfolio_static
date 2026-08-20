import type { Dict } from "@/data";

type Props = {
  t: Dict;
};

export default function Hero({ t }: Props) {
  return (
    <section className="section is-visible">
      <div className="hero-burst lang-graphic" aria-hidden="true" />
      {t.hero.image && (
        <img className="hero-image reveal lang-graphic" src={t.hero.image} alt="Profile" />
      )}
      <p className="hero-greet reveal"><span className="lang-text">{t.hero.greeting}</span></p>
      <h1 className="hero-name reveal">
        <span className="line1">AFAD FATH</span>
        <span className="line2">MUSYAROF HALIM</span>
      </h1>
      <p className="hero-tag reveal"><span className="lang-text">{t.hero.tagline}</span></p>
      <p className="hero-sub reveal"><span className="lang-text">{t.hero.sub}</span></p>
    </section>
  );
}
