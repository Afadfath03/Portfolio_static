"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Dict } from "@/data";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import {
  getDefaultLang,
  getLang,
  setLang,
  subscribeLang,
  type Lang,
  type SectionId,
  sectionIds,
} from "./i18n";

const T_EXIT = 180;
const T_ENTER = 280;
const T_LANG_EXIT = 350;
const T_LANG_ENTER = 450;

type Phase = "idle" | "exit" | "enter";
type Dir = "cw" | "ccw";

type Props = {
  initial: { en: Dict; id: Dict };
};

/* ── helpers ── */
function clearTransition(el: HTMLElement) {
  el.style.transition = "none";
  el.offsetHeight; // force reflow
  el.style.transition = "";
}

export default function PageClient({ initial }: Props) {
  const [active, setActive] = useState<SectionId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<Dir>("cw");
  const [indicator, setIndicator] = useState<SectionId | null>(null);
  const lang = useSyncExternalStore(subscribeLang, getLang, getDefaultLang);
  const [displayLang, setDisplayLang] = useState<Lang>(lang);
  const [langPhase, setLangPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const paneRef = useRef<HTMLDivElement>(null);

  /* ── generation counter for lang transitions ── */
  const langGen = useRef(0);

  /* ── title width animation refs ── */
  const prevNatW = useRef(0);

  /* ── work card height animation refs ── */
  const prevCardH = useRef<number[]>([]);
  const prevH3H = useRef<number[]>([]);
  const prevLinksH = useRef<number[]>([]);

  /* ── about panel height animation ref ── */
  const prevPanelH = useRef(0);

  /* ── active animation frame ids for cleanup ── */
  const rafIds = useRef<number[]>([]);

  useEffect(() => {
    const list = timers.current;
    const rafs = rafIds.current;
    return () => {
      list.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, []);

  /* ─────────────────────────────────────────────
     language transition: title width + work heights
     ───────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (langPhase !== "enter") return;

    const pane = paneRef.current;
    if (!pane) return;

    // increment generation to invalidate stale cleanups
    const gen = ++langGen.current;
    const cleanupRafs: number[] = [];

    /* ── sec-title width ── */
    const title = pane.querySelector<HTMLElement>(".sec-title");
    if (title && prevNatW.current > 0) {
      // Measure new natural width (text already changed)
      const naturalW = title.offsetWidth;

      if (naturalW !== prevNatW.current) {
        // Lock to old width instantly
        title.style.transition = "none";
        title.style.width = prevNatW.current + "px";
        title.offsetHeight;
        title.style.transition = "";

        // Animate to new width
        const rafId = requestAnimationFrame(() => {
          if (langGen.current !== gen) return;
          title.style.width = naturalW + "px";
        });
        cleanupRafs.push(rafId);
      }
      prevNatW.current = naturalW;
    }

    /* ── about panel height ── */
    if (active === "about") {
      const panel = pane.querySelector<HTMLElement>(".about-panel");
      if (panel && prevPanelH.current > 0) {
        const naturalH = panel.offsetHeight;
        if (naturalH !== prevPanelH.current) {
          panel.style.transition = "none";
          panel.style.height = prevPanelH.current + "px";
          panel.offsetHeight;
          panel.style.transition = "";
          const rafId = requestAnimationFrame(() => {
            if (langGen.current !== gen) return;
            panel.style.height = naturalH + "px";
          });
          cleanupRafs.push(rafId);
        }
        prevPanelH.current = naturalH;
      }
    }

    /* ── work card heights ── */
    if (active === "works") {
      const cards = pane.querySelectorAll<HTMLElement>(".work-card");
      cards.forEach((card, i) => {
        const h3 = card.querySelector<HTMLElement>("h3");
        const links = card.querySelector<HTMLElement>(".work-links");

        const oldCardH = prevCardH.current[i] ?? 0;
        const oldH3H = prevH3H.current[i] ?? 0;
        const oldLinksH = prevLinksH.current[i] ?? 0;

        // Measure new natural heights (text already changed)
        const naturalCardH = card.offsetHeight;
        const naturalH3H = h3?.offsetHeight ?? 0;
        const naturalLinksH = links?.offsetHeight ?? 0;

        // Card height
        if (oldCardH > 0 && naturalCardH !== oldCardH) {
          card.style.transition = "none";
          card.style.height = oldCardH + "px";
          card.offsetHeight;
          card.style.transition = "";
          const rafId = requestAnimationFrame(() => {
            if (langGen.current !== gen) return;
            card.style.height = naturalCardH + "px";
          });
          cleanupRafs.push(rafId);
        }
        prevCardH.current[i] = naturalCardH;

        // h3 height
        if (h3 && oldH3H > 0 && naturalH3H !== oldH3H) {
          h3.style.transition = "none";
          h3.style.height = oldH3H + "px";
          h3.offsetHeight;
          h3.style.transition = "";
          const rafId = requestAnimationFrame(() => {
            if (langGen.current !== gen) return;
            h3.style.height = naturalH3H + "px";
          });
          cleanupRafs.push(rafId);
        }
        if (h3) prevH3H.current[i] = naturalH3H;

        // links height
        if (links && oldLinksH > 0 && naturalLinksH !== oldLinksH) {
          links.style.transition = "none";
          links.style.height = oldLinksH + "px";
          links.offsetHeight;
          links.style.transition = "";
          const rafId = requestAnimationFrame(() => {
            if (langGen.current !== gen) return;
            links.style.height = naturalLinksH + "px";
          });
          cleanupRafs.push(rafId);
        }
        if (links) prevLinksH.current[i] = naturalLinksH;
      });
    }

    // cleanup after transition finishes
    const timer = window.setTimeout(() => {
      if (langGen.current !== gen) return;
      // Clear all inline heights/widths without transition
      const title = pane.querySelector<HTMLElement>(".sec-title");
      if (title) {
        title.style.transition = "none";
        title.style.removeProperty("width");
        title.offsetHeight;
        title.style.transition = "";
      }
      if (active === "works") {
        pane.querySelectorAll<HTMLElement>(".work-card").forEach((card) => {
          const h3 = card.querySelector<HTMLElement>("h3");
          const links = card.querySelector<HTMLElement>(".work-links");
          card.style.transition = "none";
          card.style.removeProperty("height");
          card.offsetHeight;
          card.style.transition = "";
          if (h3) {
            h3.style.transition = "none";
            h3.style.removeProperty("height");
            h3.offsetHeight;
            h3.style.transition = "";
          }
          if (links) {
            links.style.transition = "none";
            links.style.removeProperty("height");
            links.offsetHeight;
            links.style.transition = "";
          }
        });
      }
      if (active === "about") {
        const panel = pane.querySelector<HTMLElement>(".about-panel");
        if (panel) {
          panel.style.transition = "none";
          panel.style.removeProperty("height");
          panel.offsetHeight;
          panel.style.transition = "";
        }
      }
    }, T_LANG_ENTER);

    return () => {
      clearTimeout(timer);
      cleanupRafs.forEach(cancelAnimationFrame);
    };
  }, [langPhase, active]);

  /* ─────────────────────────────────────────────
     handleLang: clear stale styles, measure sizes
     ───────────────────────────────────────────── */
  const navigate = useCallback(
    (id: SectionId) => {
      if (phase !== "idle" || langPhase !== "idle" || id === active) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(id);
        return;
      }
      setDir(sectionIds.indexOf(id) > sectionIds.indexOf(active) ? "cw" : "ccw");
      setPhase("exit");
      setIndicator(id);
      timers.current.push(
        setTimeout(() => {
          setActive(id);
          setIndicator(null);
          setPhase("enter");
          timers.current.push(setTimeout(() => setPhase("idle"), T_ENTER));
        }, T_EXIT)
      );
    },
    [phase, langPhase, active]
  );

  const handleLang = useCallback(
    (newLang: Lang) => {
      if (newLang === displayLang || langPhase !== "idle" || phase !== "idle") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLang(newLang);
        setDisplayLang(newLang);
        return;
      }

      const pane = paneRef.current;

      // ── sec-title: clear stale inline width, measure natural ──
      if (pane) {
        const title = pane.querySelector<HTMLElement>(".sec-title");
        if (title) {
          if (title.style.width) {
            title.style.transition = "none";
            title.style.removeProperty("width");
            title.offsetHeight;
            title.style.transition = "";
          }
          prevNatW.current = title.offsetWidth;
        }
      }

      // ── work cards: clear stale inline heights, measure natural ──
      if (active === "works" && pane) {
        const cards = pane.querySelectorAll<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          const h3 = card.querySelector<HTMLElement>("h3");
          const links = card.querySelector<HTMLElement>(".work-links");

          // Clear stale inline heights
          [card, h3, links].forEach((el) => {
            if (el?.style.height) {
              el.style.transition = "none";
              el.style.removeProperty("height");
              el.offsetHeight;
              el.style.transition = "";
            }
          });

          prevCardH.current[i] = card.offsetHeight;
          prevH3H.current[i] = h3?.offsetHeight ?? 0;
          prevLinksH.current[i] = links?.offsetHeight ?? 0;
        });

      }

      // ── about panel: clear stale inline height, measure natural ──
      if (active === "about" && pane) {
        const panel = pane.querySelector<HTMLElement>(".about-panel");
        if (panel) {
          if (panel.style.height) {
            panel.style.transition = "none";
            panel.style.removeProperty("height");
            panel.offsetHeight;
            panel.style.transition = "";
          }
          prevPanelH.current = panel.offsetHeight;
        }
      }

      setLang(newLang);
      setLangPhase("exit");
      timers.current.push(
        setTimeout(() => {
          setDisplayLang(newLang);
          setLangPhase("enter");
          timers.current.push(setTimeout(() => setLangPhase("idle"), T_LANG_ENTER));
        }, T_LANG_EXIT)
      );
    },
    [displayLang, langPhase, phase, active]
  );

  const tContent = initial[displayLang];
  const paneClass = phase === "idle" ? "pane" : `pane ${phase}-${dir}`;
  const langClass = langPhase !== "idle" ? `lang-${langPhase}` : "";

  return (
    <>
      <main className="layout">
        <div className={`lang-fade-all ${langClass}`}>
          <Nav t={tContent} active={active} onNavigate={navigate} indicator={indicator} />
          <div className="content">
            <div className={paneClass} ref={paneRef}>
              {active === "home" && <Hero t={tContent} />}
              {active === "about" && <About t={tContent} />}
              {active === "services" && <Services t={tContent} />}
              {active === "stack" && <Stack t={tContent} />}
              {active === "experience" && <Experience t={tContent} />}
              {active === "education" && <Education t={tContent} />}
              {active === "works" && <Works t={tContent} />}
              {active === "contact" && <Contact t={tContent} />}
            </div>
          </div>
        </div>
      </main>

      <div className={`lang-toggle lang-${lang}`} role="group" aria-label="Language">
        <button
          className={lang === "en" ? "on" : ""}
          onClick={() => handleLang("en")}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <button
          className={lang === "id" ? "on" : ""}
          onClick={() => handleLang("id")}
          aria-pressed={lang === "id"}
        >
          ID
        </button>
      </div>
    </>
  );
}
