export type Language = "es" | "en";

export type LocalizedCopy = {
  es: string;
  en: string;
};

export type ProjectSection = "featured" | "more";
export type ProjectStatusTone = "stable" | "available" | "building" | "planning" | "unconfirmed";
export type ThemeVariant = "phosphor" | "amber" | "cyan" | "graphite";

export type Project = {
  slug: string;
  title: string;
  category: LocalizedCopy;
  detail: LocalizedCopy;
  tags: string[];
  link: string;
  section: ProjectSection;
  status?: { label: LocalizedCopy; tone: ProjectStatusTone };
  credit?: LocalizedCopy;
  screenshot?: string;
  screenshotWebp?: string;
  poster?: string;
  posterWebp?: string;
  width?: number;
  height?: number;
  screenshotAlt?: LocalizedCopy;
  secondaryLink?: { href: string; label: LocalizedCopy };
  /** Short mono caption, only used when it adds real information. */
  caption?: string;
};
