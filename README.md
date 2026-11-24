# Omar Palomares Velasco — Portafolio

Portafolio personal, bilingüe (ES/EN), de **Omar Palomares Velasco** — desarrollador de software enfocado en sistemas: sistemas operativos, lenguajes de programación, compiladores y producto real, casi siempre en **Rust**. Valle de Chalco, Valle de México · remoto.

> **English:** Personal bilingual portfolio of Omar Palomares Velasco — a systems-focused software engineer in Mexico. Editorial dark identity, self-hosted type, real captures only, prudent claims. Spanish is the primary reading language; the site toggles ES/EN.

- **Repositorio:** https://github.com/omarPVP123131
- **Estado:** v5.4 (2026-11-24). Sin publicar ni empujar a ningún destino todavía — el despliegue es una decisión pendiente del autor.

---

## Índice

1. [Qué es esto](#qué-es-esto)
2. [Proyectos y criterio editorial](#proyectos-y-criterio-editorial)
3. [Stack](#stack)
4. [Inicio rápido](#inicio-rápido)
5. [Scripts](#scripts)
6. [Estructura del repositorio](#estructura-del-repositorio)
7. [Identidad visual y temas](#identidad-visual-y-temas)
8. [Accesibilidad y calidad](#accesibilidad-y-calidad)
9. [CVs (ES/EN, una página)](#cvs-esen-una-página)
10. [Despliegue](#despliegue)
11. [Privacidad](#privacidad)
12. [Historial del repositorio](#historial-del-repositorio)
13. [Limitaciones conocidas](#limitaciones-conocidas)
14. [Licencia](#licencia)

---

## Qué es esto

Un portafolio de una página (con anclas) que presenta trabajo real, decisiones de ingeniería y evidencia — no promesas:

- **Solo capturas y demos reales.** Ninguna imagen está inventada ni generada. Los GIFs son grabaciones del software funcionando.
- **Afirmaciones prudentes.** Lo que está en desarrollo se etiqueta como tal; lo que es una propuesta documentada se describe como planificación, no como software terminado.
- **Bilingüe de verdad.** Todo el contenido (proyectos, estados, pies de foto, metadatos) existe en ES y EN; el idioma se recuerda en `localStorage`.
- **Sin relleno.** Sin carruseles decorativos, sin contadores animados, sin "skills bars". La tipografía hace el trabajo.
- **Privado por defecto.** Sin analítica, sin píxeles, sin fuentes de terceros.

## Proyectos y criterio editorial

El sitio separa **trabajo seleccionado** (destacado) de **herramientas y experimentos** (laboratorio), y etiqueta el estado cuando aporta contexto honesto:

| Proyecto | Qué es | Estado |
|---|---|---|
| **Portix OS** | Sistema operativo x86_64 desde cero en Rust `no_std`: loader en ensamblador, kernel, memoria, VFS, drivers, escritorio gráfico. ~20,000 líneas. | Completo y arrancable en QEMU |
| **Lumen** | Lenguaje de programación propio con VM, borrow checker y compilador autocompilable; playground WebAssembly (árbol de Pitágoras, ~4,095 segmentos) vía puente LUMEN ↔ JS. ~20,000 líneas. | Playground público |
| **PhotoLab** | Laboratorio del efecto fotoeléctrico: motor de física en Rust→WASM, UI Tauri 2 + Svelte 5, release para Windows | Release descargable |
| **Dualidad Onda-Partícula** | Simulador 3D de doble rendija; cada fotón suma al patrón. Colaboración con Leonardo Miguel Vega Carbajal | Release v1.0.0 |
| **POS Rust** | Punto de venta de escritorio para abarrotes (egui + SQLite, atajos, corte de caja, API local/HTTP) | En uso activo; detalles por verificar directamente |
| **NetSniffer** | Analizador de tráfico IPv4 en Python (captura, filtros, TCP/UDP/ICMP) | Disponible |
| **Zaphyr** | Compilador procedural de tipado estático en Rust, salida ELF/PE | En desarrollo activo, núcleo incompleto |
| **NetScope** | Analizador PCAP/PCAPNG en Rust | Solo propuesta documentada, sin código |

Las notas de los repositorios públicos pueden estar desactualizadas; por eso las cifras (líneas de código, versiones) se cualifican y nunca se presentan como auditadas.

## Stack

- **React 18 + TypeScript** (strict) sobre **Create React App** (`react-scripts` 5).
- **CSS propio** sin frameworks ni preprocesadores: custom properties, `clamp()`, grid/flex, `@media print`, `@supports (animation-timeline: view())`.
- **Tipografías autoalojadas** (~63 KB latin total): Space Grotesk (texto/display) y JetBrains Mono (metadatos/terminal). Sin Google Fonts ni CDN.
- **Iconos propios** como componentes SVG inline.
- **Sin backend.** El formulario de contacto es `mailto:` + copiar email al portapapeles.
- **PWA ligera:** `manifest.json` oscuro, favicon SVG.
- Node 18+ recomendado.

## Inicio rápido

```bash
npm install        # o npm ci
npm start          # http://localhost:3000
```

Para servir el build estático de producción:

```bash
npm run build
npx serve -s build
```

No hay variables de entorno que configurar: el sitio es estático y no llama a ninguna API.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `build/` (minificado, con media hasheado) |
| `npm test` | Runner de tests de CRA (actualmente **sin suite de tests** — ver [Limitaciones](#limitaciones-conocidas)) |
| `npm ci` | Instalación limpia y reproducible desde `package-lock.json` |

## Estructura del repositorio

```
├── src/
│   ├── App.tsx            # La aplicación completa (i18n, temas, lightbox, secciones)
│   ├── app.css            # Todo el CSS (tokens, temas, print, responsive, v5.3)
│   ├── data/projects.ts   # Datos de proyectos (ES/EN, rutas de capturas reales)
│   ├── fonts/             # Space Grotesk + JetBrains Mono (latin, woff2)
│   ├── lib/utils.ts       # Utilidades (cx)
│   └── index.tsx, index.css, types/
├── public/
│   ├── images/            # Capturas y GIFs reales (WebP + fallback PNG/GIF)
│   ├── fonts/             # Mismas fuentes, servidas desde la raíz
│   ├── cv-omar-palomares-velasco-{es,en}.pdf
│   ├── manifest.json (tema oscuro) · favicon.svg · robots.txt
│   └── index.html         # Meta/OG/preload de fuentes
├── cv/                    # Fuentes HTML de los CVs + PDFs generados (1 página Carta)
├── docs/
│   └── design-research.md # Investigación de diseño 2026 aplicada (§ fuentes, § criterios de aceptación)
├── build/                 # Salida de producción (gitignored; se distribuye en los paquetes .zip)
├── LEEME.txt              # Guía rápida del paquete distribuible
├── HISTORIAL-GIT.md       # Historial legible del repo (incluido en los .zip)
└── HISTORIAL-GIT.bundle   # `git clone HISTORIAL-GIT.bundle` restaura el historial completo
```

## Identidad visual y temas

- **Canvas oscuro fósforo** con **un** acento lima (`#a3e635` familia). "Un acento por pantalla".
- **Tipografía como arquitectura:** display apretado (Space Grotesk 800, `letter-spacing` negativo), metadatos en JetBrains Mono en versalitas monoespaciadas, kickers con prefijo `$` **solo donde la metáfora de terminal es literal** (panel del proyecto estrella y la bitácora "EN DESARROLLO").
- **Editorial grid** con un punto de quiebre deliberado por pantalla (p.ej. bento de casos con el primero a fila completa).
- **4 temas** conmutables desde el footer (persisten): **Fósforo** (lima), **Ámbar**, **Cian**, **Grafito**. El `<meta theme-color>` y el `manifest.json` acompañan.
- **Movimiento con significado:** revelado `animation-timeline: view()` solo con `prefers-reduced-motion: no-preference`; `@media print` fuerza contenido visible; carete parpadeante en el nombre con guarda de reduced-motion.

## Accesibilidad y calidad

Medido sobre el build estático (Chromium headless, 2026-11-24):

| Categoría | Score |
|---|---|
| Performance | 89–92 (varía por corrida local; ver limitaciones) |
| **Accessibility** | **100** |
| Best Practices | **100** |
| SEO | **100** |

- CLS ≈ 0.001, TBT ≤ 40 ms.
- Targets táctiles reales ≥ 24 px (dots de tema con caja de 26 px) y ≥ 44 px en nav/acciones.
- Nombres accesibles alineados con el texto visible (WCAG 2.5.3); lightbox con rol de diálogo, cierre con Escape y restauración de foco; skip-link; `:focus-visible` visible; `prefers-reduced-motion` respetado.
- QA multi-ancho con Playwright (320/375/768/1024/1440 × ES/EN): cero desbordes horizontales, cero errores de consola; el alto total de página en 375 px bajó de ~7,360 a ~6,460 px tras la compactación v5.3.
- Contraste mínimo AA en los 4 temas (tokens `--muted-2` por tema).

## CVs (ES/EN, una página)

Los PDFs en `public/` (y `cv/`) son **una página tamaño Carta** cada uno, generados desde `cv/cv-es.html` / `cv/cv-en.html` (mismo sistema visual que el sitio):

```bash
cd cv
/usr/bin/chromium --headless=new --no-sandbox --print-to-pdf=cv-omar-palomares-velasco-es.pdf \
  --no-pdf-header-footer file://$PWD/cv-es.html
```

Los PDF **no se editan a mano**; se edita el HTML y se regenera. El EN es una traducción paralela del ES (misma estructura, mismos datos verificados: UAEM 2026—actualidad, formación dual TESCHA–CECyTEM 2022—2026, sin edad hardcodeada).

## Despliegue

Cualquier hosting estático sirve el contenido de `build/` (Vercel, Netlify, Cloudflare Pages, GitHub Pages). No hay funciones serverless, ni base de datos, ni variables de entorno. **Este despliegue aún no se ha hecho** — es una decisión del autor.

## Privacidad

- Sin analítica, cookies de tracking ni peticiones a terceros.
- La edad mostrada se calcula en cliente desde la fecha de nacimiento; no se hardcodea.
- Los CVs viven en Google Drive como archivos **privados**; su publicación queda pendiente de aprobación explícita del autor.

## Historial del repositorio

El historial completo viaja en dos artefactos (el directorio `.git` no se incluye en los paquetes):

- **`HISTORIAL-GIT.md`** — lectura humana: commit por commit, con fechas, autores y mensajes.
- **`HISTORIAL-GIT.bundle`** — para restaurar el repositorio completo tal como está: `git clone HISTORIAL-GIT.bundle portafolio-restaurado`.

Timeline: `320578e` (feb 2025, "final") → `7060356` v5.3 (nov 2026): consolidación del rediseño (tipografía self-hosted, print/320 px, manifest oscuro), curación editorial (kickers `$`, encuadre de capturas, móvil compacto), arreglo de accesibilidad (targets, nombres accesibles), CVs de una página → `feae68b` auditoría final (OG image, manifest completo, nombre/versión del paquete) → `f3edccb` historial completo. Ver `HISTORIAL-GIT.md`.

## Limitaciones conocidas

- **`npm test` no tiene suite** — la verificación es build limpio + QA visual multi-ancho + Lighthouse. Una suite de humo (render sin errores) sería bienvenida.
- **Performance 89–92 local:** el servidor estático local no comprime ni cachea; en un hosting real (brotli + cache-control de assets hasheados) sube. El peso de los GIFs de demo (varios MB) es el techo de LCP.
- **Facturación de assets:** `build/` se regenera con `npm run build`; nunca se edita a mano.
- Los detalles de implementación de **POS Rust** y el alcance real de **Zaphyr** deben leerse en sus repositorios; el portafolio los describe con la información pública disponible.
- El scaffold original traía ~40 dependencias sin uso (EmailJS, framer-motion, swiper, Radix, shadcn/tailwind…); se eliminaron en v5.3 junto con `components.json`, `tailwind.config.js`, `postcss.config.js` y el helper `cn()`. El grafo de dependencias es hoy react + react-scripts + typescript.

## Licencia

Todos los derechos reservados. Este es el portafolio personal de Omar Palomares Velasco: el código, los textos, las capturas y los logos son suyos. No se autoriza republicación, redistribución ni uso comercial sin permiso explícito. Los proyectos enlazados tienen sus propias licencias en sus repositorios.
