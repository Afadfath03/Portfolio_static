export type Lang = "en" | "id";
export type SectionId = "home" | "about" | "services" | "stack" | "experience" | "education" | "works" | "contact";

export const sectionIds: SectionId[] = ["home", "about", "services", "stack", "experience", "education", "works", "contact"];

const langListeners = new Set<() => void>();
let currentLang: Lang = "en";

export function getLang(): Lang {
  return currentLang;
}

export function getDefaultLang(): Lang {
  return "en";
}

export function setLang(lang: Lang) {
  currentLang = lang;
  langListeners.forEach((listener) => listener());
}

export function subscribeLang(listener: () => void) {
  langListeners.add(listener);
  return () => {
    langListeners.delete(listener);
  };
}
