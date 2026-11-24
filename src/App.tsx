import React, { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "./data/projects";
import { Language, Project, ThemeVariant } from "./types";
import "./app.css";

const EMAIL = "omarpalvel@gmail.com";
const GITHUB_URL = "https://github.com/omarPVP123131";
const LINKEDIN_URL = "https://www.linkedin.com/in/omar-palomares-velasco-b9ab04416/";
const THEME_COLORS: Record<ThemeVariant, string> = {
  phosphor: "#0b0f0d",
  amber: "#141008",
  cyan: "#081114",
  graphite: "#111113",
};
const THEME_ORDER: ThemeVariant[] = ["phosphor", "amber", "cyan", "graphite"];
const isThemeVariant = (value: string | null): value is ThemeVariant =>
  value === "phosphor" || value === "amber" || value === "cyan" || value === "graphite";
const isGif = (src?: string) => !!src && src.toLowerCase().endsWith(".gif");
const CV_PATH: Record<Language, string> = {
  es: "/cv-omar-palomares-velasco-es.pdf",
  en: "/cv-omar-palomares-velasco-en.pdf",
};

/** Fecha de nacimiento: 21 de mayo de 2007. La edad se calcula en render. */
const BIRTH_DATE = new Date(2007, 4, 21);
const computeAge = (now: Date = new Date()): number => {
  let age = now.getFullYear() - BIRTH_DATE.getFullYear();
  const monthDiff = now.getMonth() - BIRTH_DATE.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < BIRTH_DATE.getDate())) age -= 1;
  return age;
};

type Copy = {
  nav: { work: string; approach: string; contact: string };
  cvShort: string;
  availability: string;
  heroRole: string;
  heroHeadline: [string, string];
  heroAccent: string;
  heroBody: string;
  downloadCv: string;
  workCta: string;
  heroMeta: { label: string; value: string }[];
  heroPanelKicker: string;
  heroPanelCaption: string;
  heroPanelLink: string;
  heroPanelSpecs: string[];
  workKicker: string;
  workTitle: string;
  workAside: string;
  nowKicker: string;
  nowTitle: string;
  nowItems: { title: string; detail: string; href: string }[];
  workshopKicker: string;
  workshopTitle: string;
  workshopAside: string;
  source: string;
  approachKicker: string;
  approachTitle: string;
  approachBody: string;
  focus: { label: string; detail: string }[];
  eduKicker: string;
  eduItems: string[];
  contactKicker: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
  copyEmail: string;
  copiedEmail: string;
  footerNote: string;
  themeLabel: string;
  themeNames: Record<ThemeVariant, string>;
  expandCapture: string;
  closeViewer: string;
  lightboxHint: string;
};

const copy: Record<Language, Copy> = {
  es: {
    nav: { work: "Trabajo", approach: "Enfoque", contact: "Contacto" },
    cvShort: "CV",
    availability: "Disponible · Remoto · Valle de Chalco, MX",
    heroRole: "DESARROLLADOR DE SISTEMAS Y SOFTWARE",
    heroHeadline: ["Omar Palomares", "Velasco."],
    heroAccent: "Software serio, del arranque a la interfaz.",
    heroBody:
      "Ingeniería en Computación (UAEM — Valle de Chalco). Construyo en Rust: un sistema operativo, un lenguaje con compilador propio y software de escritorio para problemas reales.",
    downloadCv: "Descargar CV",
    workCta: "Ver proyectos",
    heroMeta: [
      { label: "UBICACIÓN", value: "Valle de Chalco, MX · Remoto" },
      { label: "ENFOQUE", value: "Sistemas · Lenguajes · Producto" },
      { label: "STACK", value: "Rust · C · WASM · Python" },
    ],
    heroPanelKicker: "PROYECTO ESTRELLA",
    heroPanelCaption: "Portix OS arrancando su escritorio real.",
    heroPanelLink: "Repositorio",
    heroPanelSpecs: ["x86_64", "no_std", "VFS", "GUI"],
    workKicker: "TRABAJO SELECCIONADO",
    workTitle: "Lo que he construido.",
    workAside: "Cada proyecto enlaza a su código. Las capturas son reales.",
    nowKicker: "AHORA",
    nowTitle: "En este momento.",
    nowItems: [
      { title: "Portix OS", detail: "x86_64: memoria, VFS, drivers y escritorio gráfico — capa por capa.", href: "https://github.com/omarPVP123131/Portix-OS" },
      { title: "Lumen", detail: "VM, borrow checker y un compilador diseñado para autocompilarse.", href: "https://github.com/omarPVP123131/Lumen" },
      { title: "POS Rust", detail: "Punto de venta para abarrotes: egui, SQLite y atajos F1–F12.", href: "https://github.com/omarPVP123131/Pos-Rust" },
    ],
    workshopKicker: "EN DESARROLLO",
    workshopTitle: "También en el taller.",
    workshopAside: "Estos tres van por detrás del trabajo destacado. Todo sigue en desarrollo.",
    source: "Repositorio",
    approachKicker: "ENFOQUE",
    approachTitle: "Pienso como sistema. Construyo como producto.",
    approachBody:
      "Me interesan los problemas que cruzan capas: cómo arranca un kernel, cómo se ejecuta un lenguaje o cómo un modelo físico se convierte en una herramienta que alguien abre y usa. Dejo código y documentación que se entienden — y ninguna afirmación que no pueda sostenerse.",
    focus: [
      { label: "Sistemas", detail: "Arranque, memoria, VFS, kernels — de x86_64 hacia arriba." },
      { label: "Lenguajes", detail: "VM, compiladores y WASM — del lexer al ejecutable." },
      { label: "Producto", detail: "Escritorio real: ciencia, retail e interfaces que se usan." },
    ],
    eduKicker: "FORMACIÓN",
    eduItems: [
      "{age} años · Ingeniería en Computación — UAEM Valle de Chalco · 2026–actualidad",
      "Formación dual TESCHA–CECyTEM · Soporte y Mantenimiento de Equipos de Cómputo",
      "Secundaria — CECyTEM Valle de Chalco · egreso 2021",
    ],
    contactKicker: "CONTACTO",
    contactTitle: "¿Buscas a alguien que construya?",
    contactBody:
      "Abierto a posiciones remotas, prácticas profesionales y colaboraciones donde sistemas y producto se encuentren.",
    contactCta: "Hablemos",
    copyEmail: "Copiar correo",
    copiedEmail: "Copiado ✓",
    footerNote: "Código y documentación que se entienden.",
    themeLabel: "Variante visual",
    themeNames: { phosphor: "Fósforo", amber: "Ámbar", cyan: "Cian", graphite: "Grafito" },
    expandCapture: "Ampliar captura",
    closeViewer: "Cerrar visor",
    lightboxHint: "Captura real · Escape para cerrar",
  },
  en: {
    nav: { work: "Work", approach: "Approach", contact: "Contact" },
    cvShort: "CV",
    availability: "Open to work · Remote · Valle de Chalco, MX",
    heroRole: "SYSTEMS & SOFTWARE DEVELOPER",
    heroHeadline: ["Omar Palomares", "Velasco."],
    heroAccent: "Serious software, from boot to interface.",
    heroBody:
      "Computer Engineering student (UAEM — Valle de Chalco). I build in Rust: an operating system, a language with its own compiler, and desktop software for real problems.",
    downloadCv: "Download résumé",
    workCta: "See the work",
    heroMeta: [
      { label: "LOCATION", value: "Valle de Chalco, MX · Remote" },
      { label: "FOCUS", value: "Systems · Languages · Product" },
      { label: "STACK", value: "Rust · C · WASM · Python" },
    ],
    heroPanelKicker: "FLAGSHIP PROJECT",
    heroPanelCaption: "Portix OS booting its actual desktop.",
    heroPanelLink: "Repository",
    heroPanelSpecs: ["x86_64", "no_std", "VFS", "GUI"],
    workKicker: "SELECTED WORK",
    workTitle: "What I’ve built.",
    workAside: "Every project links to its code. Every capture is real.",
    nowKicker: "RIGHT NOW",
    nowTitle: "What I’m doing now.",
    nowItems: [
      { title: "Portix OS", detail: "x86_64: memory, VFS, drivers, and a graphical desktop — layer by layer.", href: "https://github.com/omarPVP123131/Portix-OS" },
      { title: "Lumen", detail: "VM, borrow checker, and a compiler built to self-host.", href: "https://github.com/omarPVP123131/Lumen" },
      { title: "POS Rust", detail: "Grocery point-of-sale: egui, SQLite, and F1–F12 shortcuts.", href: "https://github.com/omarPVP123131/Pos-Rust" },
    ],
    workshopKicker: "IN PROGRESS",
    workshopTitle: "Also in the workshop.",
    workshopAside: "These three trail the featured work. All still in development.",
    source: "Repository",
    approachKicker: "APPROACH",
    approachTitle: "I think in systems. I ship like a product.",
    approachBody:
      "I’m drawn to problems that cross layers: how a kernel boots, how a language runs, or how a physical model becomes a tool someone opens and uses. I leave behind code and docs people can follow — and no claim I can’t back up.",
    focus: [
      { label: "Systems", detail: "Boot, memory, VFS, kernels — from x86_64 upward." },
      { label: "Languages", detail: "VMs, compilers, and WASM — from lexer to executable." },
      { label: "Product", detail: "Real desktop software: science, retail, and usable UIs." },
    ],
    eduKicker: "EDUCATION",
    eduItems: [
      "{age} · Computer Engineering — UAEM Valle de Chalco · 2026–present",
      "Dual training TESCHA–CECyTEM · Computer Equipment Support & Maintenance",
      "Middle school — CECyTEM Valle de Chalco · graduated 2021",
    ],
    contactKicker: "CONTACT",
    contactTitle: "Looking for someone who builds?",
    contactBody:
      "Open to remote roles, internships, and collaborations where systems meet product.",
    contactCta: "Let’s talk",
    copyEmail: "Copy email",
    copiedEmail: "Copied ✓",
    footerNote: "Code and docs people can follow.",
    themeLabel: "Visual variant",
    themeNames: { phosphor: "Phosphor", amber: "Amber", cyan: "Cyan", graphite: "Graphite" },
    expandCapture: "Expand capture",
    closeViewer: "Close viewer",
    lightboxHint: "Real capture · Escape to close",
  },
};

function ArrowIcon({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon" fill="none">
      {diagonal ? <path d="M5 15 15 5M6 5h9v9" /> : <path d="M3 10h13m-5-5 5 5-5 5" />}
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon" fill="none">
      <path d="M10 3v11m0 0 4.5-4.5M10 14 5.5 9.5" />
      <path d="M4 17h12" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="expand-icon" fill="none">
      <path d="M8 4H4v4M12 4h4v4M8 16H4v-4M12 16h4v-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="close-icon" fill="none">
      <path d="M6 6l8 8M14 6l-8 8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="copy-icon" fill="none">
      <rect x="7" y="7" width="9" height="9" rx="1.5" />
      <path d="M4 13V5a1 1 0 0 1 1-1h8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="copy-icon" fill="none">
      <path d="M4.5 10.5 8.5 14.5 15.5 6.5" />
    </svg>
  );
}

function ProjectImage({
  project,
  className,
  alt,
  eager = false,
}: {
  project: Project;
  className?: string;
  alt: string;
  eager?: boolean;
}) {
  if (!project.screenshot) return null;
  const animated = isGif(project.screenshot);
  return (
    <picture>
      {animated && project.posterWebp && (
        <source media="(prefers-reduced-motion: reduce)" srcSet={project.posterWebp} type="image/webp" />
      )}
      {animated && project.poster && (
        <source media="(prefers-reduced-motion: reduce)" srcSet={project.poster} />
      )}
      {!animated && project.screenshotWebp && <source srcSet={project.screenshotWebp} type="image/webp" />}
      <img
        className={className}
        src={project.screenshot}
        alt={alt}
        width={project.width}
        height={project.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}

function MediaButton({
  project,
  language,
  onOpen,
}: {
  project: Project;
  language: Language;
  onOpen: (project: Project) => void;
}) {
  const t = copy[language];
  return (
    <button
      type="button"
      className="media-expand"
      onClick={() => onOpen(project)}
      aria-label={`${t.expandCapture}: ${project.title}`}
      title={t.expandCapture}
    >
      <ExpandIcon />
    </button>
  );
}

function ProjectCard({
  project,
  language,
  index,
  onOpen,
  eager = false,
}: {
  project: Project;
  language: Language;
  index: number;
  onOpen: (project: Project) => void;
  eager?: boolean;
}) {
  const t = copy[language];
  const flip = index % 2 === 1;
  return (
    <article className={`case${flip ? " case-flip" : ""}`}>
      <div className="case-media">
        <ProjectImage
          project={project}
          className="case-shot"
          alt={project.screenshotAlt?.[language] || ""}
          eager={eager}
        />
        <MediaButton project={project} language={language} onOpen={onOpen} />
      </div>
      <div className="case-body">
        <div className="case-meta">
          <span className="case-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="case-category">{project.category[language]}</span>
          {project.status && (
            <span className={`status status-${project.status.tone}`}>{project.status.label[language]}</span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p className="case-detail">{project.detail[language]}</p>
        {project.credit && (
          <p className="case-credit">
            <span aria-hidden="true">↳</span> {project.credit[language]}
          </p>
        )}
        <p className="case-tech">{project.tags.join(" · ")}</p>
        <div className="case-foot">
          <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
            {t.source}
            <ArrowIcon />
          </a>
          {project.secondaryLink && (
            <a className="text-link text-link-accent" href={project.secondaryLink.href} target="_blank" rel="noreferrer">
              {project.secondaryLink.label[language]}
              <DownloadIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-language");
      return saved === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  });
  const [theme, setTheme] = useState<ThemeVariant>(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-theme");
      return isThemeVariant(saved) ? saved : "phosphor";
    } catch {
      return "phosphor";
    }
  });
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const t = copy[language];
  const age = computeAge();
  const eduItems = t.eduItems.map((item) => item.replace("{age}", String(age)));
  const cvHref = CV_PATH[language];
  const cvName = language === "es" ? "cv-omar-palomares-velasco-es.pdf" : "cv-omar-palomares-velasco-en.pdf";
  const featuredProjects = projects.filter((p) => p.section === "featured");
  const moreProjects = projects.filter((p) => p.section === "more");

  const openLightbox = useCallback((project: Project) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightbox(project);
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "es"
        ? "Omar Palomares Velasco — Desarrollador de sistemas y software"
        : "Omar Palomares Velasco — Systems & software developer";
    const description =
      language === "es"
        ? "Ingeniería en Computación y desarrollador Rust: sistema operativo, lenguaje con compilador propio y software de escritorio real."
        : "Computer Engineering student and Rust developer: an operating system, a language with its own compiler, and real desktop software.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      /* Storage is optional. */
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const bar = progressRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [lightbox, closeLightbox]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    },
    []
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  }, []);

  const handleLightboxKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const dialog = lightboxRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
    ).filter((node) => !node.hasAttribute("disabled") && node.tabIndex !== -1);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="portfolio-shell">
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <a className="skip-link" href="#main">
        {language === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a
            href="#top"
            className="brand"
          >
            <span className="brand-mark">OP<span>.</span></span>
            <span className="brand-name">OMAR&nbsp;PALOMARES</span>
          </a>
          <nav className="site-nav" aria-label={language === "es" ? "Navegación" : "Navigation"}>
            <a href="#work">{t.nav.work}</a>
            <a href="#approach">{t.nav.approach}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="language-toggle"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              title={language === "es" ? "Cambiar a inglés" : "Switch to English"}
            >
              <span className={language === "es" ? "language-active" : ""}>ES</span>
              <i aria-hidden="true" />
              <span className={language === "en" ? "language-active" : ""}>EN</span>
              <span className="sr-only">{language === "es" ? "Cambiar a inglés" : "Switch to English"}</span>
            </button>
            <a className="cv-button" href={cvHref} download={cvName}>
              {t.cvShort}
              <DownloadIcon />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <p className="availability">
                <span className="availability-dot" aria-hidden="true" />
                {t.availability}
              </p>
              <h1 className="hero-name">
                <span>{t.heroHeadline[0]}</span>
                <span>{t.heroHeadline[1]}</span>
              </h1>
              <p className="hero-role">{t.heroRole}</p>
              <p className="hero-accent">{t.heroAccent}</p>
              <p className="hero-body">{t.heroBody}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={cvHref} download={cvName}>
                  {t.downloadCv}
                  <DownloadIcon />
                </a>
                <a className="btn btn-ghost" href="#work">
                  {t.workCta}
                  <ArrowIcon diagonal={false} />
                </a>
              </div>
              <dl className="hero-meta">
                {t.heroMeta.map((item) => (
                  <div key={item.label} className="hero-meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="hero-showcase" aria-label="Portix OS">
              <a className="showcase-frame" href="https://github.com/omarPVP123131/Portix-OS" target="_blank" rel="noreferrer">
                <span className="showcase-kicker">
                  <span>{t.heroPanelKicker}</span>
                  <span className="showcase-badge">~20k {language === "es" ? "LÍNEAS" : "LINES"}</span>
                </span>
                <picture>
                  <source srcSet="/images/project-portix-real.webp" type="image/webp" />
                  <img
                    className="showcase-img"
                    src="/images/project-portix-real.png"
                    alt={
                      language === "es"
                        ? "Escritorio real de Portix OS con terminal y explorador de archivos."
                        : "Real Portix OS desktop with terminal and file explorer."
                    }
                    width={1024}
                    height={768}
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <span className="showcase-caption">{t.heroPanelCaption}</span>
                <span className="showcase-foot">
                  <span className="showcase-specs">
                    {t.heroPanelSpecs.map((spec) => (
                      <span key={spec}>{spec}</span>
                    ))}
                  </span>
                  <span className="showcase-link">
                    {t.heroPanelLink}
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            </aside>
          </div>
        </section>

        <section id="work" className="work-section section-shell">
          <div className="section-head">
            <div>
              <p className="kicker">{t.workKicker}</p>
              <h2>{t.workTitle}</h2>
            </div>
            <p className="section-aside">{t.workAside}</p>
          </div>
          <div className="case-list">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                language={language}
                index={projects.indexOf(project)}
                onOpen={openLightbox}
                eager
              />
            ))}
          </div>

          <div className="now-band" aria-labelledby="now-title">
            <div className="now-head">
              <p className="kicker">{t.nowKicker}</p>
              <h3 id="now-title">{t.nowTitle}</h3>
            </div>
            <ol className="now-list">
              {t.nowItems.map((item, index) => (
                <li key={item.title} className="now-item">
                    <span className="now-index">0{index + 1}</span>
                  <a className="now-main" href={item.href} target="_blank" rel="noreferrer">
                    <strong>{item.title}<ArrowIcon /></strong>
                    <p>{item.detail}</p>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="workshop-block">
            <div className="section-head section-head-compact">
              <div>
                <p className="kicker kicker--cmd">{t.workshopKicker}</p>
                <h3>{t.workshopTitle}</h3>
              </div>
              <p className="section-aside">{t.workshopAside}</p>
            </div>
            <ul className="workshop-list">
              {moreProjects.map((project, index) => (
                <li key={project.slug} className="workshop-row">
                  <span className="workshop-index">{String(index + 1).padStart(2, "0")}</span>
                  <a
                    className="workshop-main"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="workshop-titleline">
                      <span className="workshop-title">{project.title}</span>
                      {project.status && (
                        <span className={`status status-${project.status.tone}`}>{project.status.label[language]}</span>
                      )}
                    </span>
                    <span className="workshop-detail">{project.detail[language]}</span>
                  </a>
                  <span className="workshop-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="approach" className="approach-section">
          <div className="approach-inner section-shell">
            <p className="kicker">{t.approachKicker}</p>
            <div className="approach-layout">
              <h2>{t.approachTitle}</h2>
              <div>
                <p className="approach-body">{t.approachBody}</p>
                <div className="focus-grid">
                  {t.focus.map((item, index) => (
                    <div className="focus-card" key={item.label}>
                      <span className="focus-index">0{index + 1}</span>
                      <strong>{item.label}</strong>
                      <span className="focus-detail">{item.detail}</span>
                    </div>
                  ))}
                </div>
                <div className="edu-block">
                  <p className="edu-kicker">{t.eduKicker}</p>
                  <ul className="edu-list">
                    {eduItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <p className="kicker">{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p className="contact-body">{t.contactBody}</p>
          <div className="contact-actions">
            <a className="btn btn-primary btn-large" href={`mailto:${EMAIL}`}>
              {t.contactCta}
              <ArrowIcon />
            </a>
            <a className="btn btn-ghost btn-large" href={cvHref} download={cvName}>
              {t.downloadCv}
              <DownloadIcon />
            </a>
            <button
              type="button"
              className={`btn btn-ghost btn-large btn-copy${emailCopied ? " is-copied" : ""}`}
              onClick={handleCopyEmail}
              aria-live="polite"
            >
              {emailCopied ? t.copiedEmail : t.copyEmail}
              {emailCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
          <ul className="contact-links">
            <li><a href={`mailto:${EMAIL}`}>omarpalvel@gmail.com</a></li>
            <li><a href={GITHUB_URL} target="_blank" rel="noreferrer">github.com/omarPVP123131</a></li>
            <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">linkedin.com/in/omar-palomares-velasco</a></li>
          </ul>
          <footer className="site-footer">
            <div className="footer-left">
              <a className="footer-brand" href="#top">OP<span>.</span></a>
              <span>© {new Date().getFullYear()} Omar Palomares Velasco</span>
              <span className="footer-note">{t.footerNote}</span>
            </div>
            <div className="footer-right">
              <div className="theme-picker theme-picker-footer" role="group" aria-label={t.themeLabel} title={t.themeLabel}>
                <span className="theme-picker-label">{t.themeLabel}</span>
                {THEME_ORDER.map((id) => {
                  const active = id === theme;
                  const label = t.themeNames[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`theme-dot theme-dot-${id}${active ? " is-active" : ""}`}
                      onClick={() => setTheme(id)}
                      aria-pressed={active}
                      aria-label={label}
                      title={label}
                    />
                  );
                })}
              </div>
              <a className="back-to-top" href="#top">
                {language === "es" ? "Arriba" : "Top"} ↑
              </a>
            </div>
          </footer>
        </section>
      </main>

      {lightbox && (
        <div
          className="lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            ref={lightboxRef}
            onKeyDown={handleLightboxKeyDown}
          >
            <div className="lightbox-bar">
              <span id="lightbox-title">{lightbox.title}</span>
              <button
                type="button"
                className="lightbox-close"
                ref={closeButtonRef}
                onClick={closeLightbox}
                aria-label={t.closeViewer}
              >
                <CloseIcon />
              </button>
            </div>
            <ProjectImage
              project={lightbox}
              className="lightbox-img"
              alt={lightbox.screenshotAlt?.[language] || lightbox.title}
              eager
            />
            <p className="lightbox-caption">{t.lightboxHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
