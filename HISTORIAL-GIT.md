# Historial de git — portafolio-omar-palomares-velasco

Generado: 2026-11-24 · historial completo desde el clon hasta `feae68b`.

## Por qué existe este archivo

El directorio `.git` no se incluye en los paquetes de distribución. Este documento es el registro legible del historial; `HISTORIAL-GIT.bundle` restaura el repositorio completo.

## Restaurar el repositorio completo

```bash
git clone HISTORIAL-GIT.bundle portafolio-restaurado
cd portafolio-restaurado
git log --oneline --graph
```

## Línea de tiempo

- Commits totales: 3

- Primer commit: 2025-02-16 23:32:27 -0600 — `320578e` (final)

- Último commit: 2026-11-24 22:34:48 +0000 — `feae68b` (auditoría final: OG image + meta, manifest completo, nombre/versión del paquete)

- Cambios posteriores a `feae68b`: ver el bundle.

## `320578e` · 2025-02-16 23:32:27 -0600

**final**

Omar Palomares Velasco <palomaresomar691@gmail.com>

**Cambios:** ` 54 files changed, 23872 insertions(+)`

Archivos tocados:

```
.gitignore                                  |    23 +
 .hintrc                                     |    23 +
 README.md                                   |    46 +
 components.json                             |    22 +
 package-lock.json                           | 20809 ++++++++++++++++++++++++++
 package.json                                |    78 +
 postcss.config.js                           |     6 +
 public/assets/grid.svg                      |     4 +
 public/cv/cv.pdf                            |   Bin 0 -> 438105 bytes
 public/images/Screenshot_1.png              |   Bin 0 -> 40555 bytes
 public/images/proyect1.png                  |   Bin 0 -> 51947 bytes
 public/images/proyect2.png                  |   Bin 0 -> 89402 bytes
…
```

## `7060356` · 2026-11-24 08:54:17 +0000

**v5.3: consolidación v5.1 + curaduría (a11y, móvil compacto, repo saneado)**

Omar Palomares Velasco <palomaresomar691@gmail.com>

```
- Base v5.1: fuentes self-hosted (Space Grotesk/JetBrains Mono), fixes print/320px, manifest oscuro
- Curación editorial: prefijo "$" solo en kickers de terminal literal (Portix PLAYGROUND, EN DESARROLLO);
  object-position 50% 15% en .case-shot con object-fit: cover
- Móvil ≤480px compactado: alto ES/375 de ~7,362 a ~6,463 px; clambs y targets conservados
- Accesibilidad: theme-dots con caja real de 26px; nombres accesibles alineados al texto visible;
  span.sr-only en el toggle ES/EN. Lighthouse (build estático): A11y 100 · BP 100 · SEO 100 · Perf 89-92
- CVs ES/EN rediseñados a una página Carta (Chromium print-to-PDF) desde cv/*.html
- Repo saneado: ~40 dependencias sin uso eliminadas (emailjs, framer-motion, swiper, radix, shadcn…),
  componentes/configs muertas fuera, .gitignore endurecido (sin build/, .env, auditoría)
- Docs: README reescrito por completo; HISTORIAL-GIT.md + .bundle para el historial
```

**Cambios:** ` 81 files changed, 9747 insertions(+), 15038 deletions(-)`

Archivos tocados:

```
.gitignore                                         |    24 +-
 LEEME.txt                                          |    44 +
 README.md                                          |   190 +-
 components.json                                    |    22 -
 cv/cv-en.html                                      |   215 +
 cv/cv-es.html                                      |   215 +
 cv/cv-omar-palomares-velasco-en.pdf                |   Bin 0 -> 292649 bytes
 cv/cv-omar-palomares-velasco-es.pdf                |   Bin 0 -> 299773 bytes
 cv/fonts/jetbrains-mono-latin-wght-normal.woff2    |   Bin 0 -> 40404 bytes
 cv/fonts/space-grotesk-latin-wght-normal.woff2     |   Bin 0 -> 22288 bytes
 docs/design-research.md                            |   194 +
 package-lock.json                                  | 19361 +++++++------------
…
```

## `feae68b` · 2026-11-24 22:34:48 +0000

**auditoría final: OG image + meta, manifest completo, nombre/versión del paquete**

Omar Palomares Velasco <palomaresomar691@gmail.com>

```
- og.png 1200x630 generada (captura real del hero) + og:image/site_name/locale,
  twitter:card summary_large_image, meta author; comentario para URL absoluta al desplegar
- manifest.json: iconos 192/512 declarados, description añadida
- package.json: nombre real, versión 5.3.0, UNLICENSED (derechos reservados)
```

**Cambios:** ` 5 files changed, 150 insertions(+), 6 deletions(-)`

Archivos tocados:

```
HISTORIAL-GIT.md     | 114 +++++++++++++++++++++++++++++++++++++++++++++++++++
 package.json         |  11 +++--
 public/images/og.png | Bin 0 -> 155852 bytes
 public/index.html    |  14 +++++++
 public/manifest.json |  17 +++++++-
```

