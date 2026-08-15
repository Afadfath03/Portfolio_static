import navEn from "./nav/en.json";
import navId from "./nav/id.json";
import heroEn from "./hero/en.json";
import heroId from "./hero/id.json";
import aboutEn from "./about/en.json";
import aboutId from "./about/id.json";
import stackEn from "./stack/en.json";
import stackId from "./stack/id.json";
import experienceEn from "./experience/en.json";
import experienceId from "./experience/id.json";
import educationEn from "./education/en.json";
import educationId from "./education/id.json";
import worksEn from "./works/en.json";
import worksId from "./works/id.json";
import contactEn from "./contact/en.json";
import contactId from "./contact/id.json";

const en = {
  nav: navEn,
  hero: heroEn,
  about: aboutEn,
  stack: stackEn,
  experience: experienceEn,
  education: educationEn,
  works: worksEn,
  contact: contactEn,
};

export type Dict = typeof en;

const id: Dict = {
  nav: navId,
  hero: heroId,
  about: aboutId,
  stack: stackId,
  experience: experienceId,
  education: educationId,
  works: worksId,
  contact: contactId,
};

export const content: { en: Dict; id: Dict } = { en, id };
