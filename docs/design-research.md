# Investigación de diseño — recomposición visual del portafolio (nov 2026)

Objetivo rector: **convencer a un reclutador en ~7 segundos** y que la página se vea
**intencional y pulcra en cualquier viewport** (320 → 1920+), ES/EN. Este documento
gobernará la recomposición. Nada de esto se implementa sin tu OK.

---

## 1. Qué hacen los mejores sitios de 2025–2026 (y qué aplica aquí)

Fuentes estudiadas: Awwwards (categoría Portfolio), roundups de jurados Awwwards
(hontran.dev), tendencias 2026 (fireart, inspirefusion, reallygooddesigns), libros de
composición (Lumen/SUNY Graphic Design), guías de jerarquía visual (2Stallions, Eleken),
responsive 2025 (webpeak, themescamp, webwila).

### 1.1 El criterio de un jurado (hontran.dev, miembro de Awwwards)
Un "award winner" bate al "nice site" en **tres ejes a la vez**:
1. **Art direction** — un solo punto de vista; aunque le quites la animación, cada frame
   estático se ve deliberado (nada de plantilla decorada).
2. **Directed motion** — coreografía, no "animación por decorar": transiciones con
   significado, revela espaciado por scroll, microinteracciones que recompensan atención.
3. **Performance** — 60 fps en Android mid-range; página < 1–3 s a pintar. La belleza a
   60fps es la disciplina.
Fallar en uno = quedar en el medio (~7.5). Aplicado a reclutamiento: **art direction y
performance mandan; el motion debe ser mínimo y con propósito** (reveal del hero,
marquee sutil, hover states). El espectáculo WebGL no es el objetivo.
Refs citadas: By-Kin (restraint + editorial), Obys y Unseen (restraint = premium),
Mat Voyce (kinética que sirve a la lectura).

### 1.2 Tendencias 2026 que SÍ aplican
- **Tipografía como arquitectura**: displays grandes, texto como interfaz. (v3 ya lo
  intenta; hay que ejecutarlo con restricción, no a gritos.)
- **Tactile brutalism**: geometría precisa, bordes 1px, esquinas 0–4px, sin sombras
  borrosas; jerarquía por contraste y líneas superpuestas. Encaja con "sistemas".
- **Dark-first**: dark como predeterminado (Linear, Raycast, Arc son referencia).
- **Bento grids**: módulos armados por peso de contenido (Apple/Linear/Vercel). Ideal
  para "también en el taller" y para estadísticas/stack.
- **Textura, no peso 3D**: grano/ruido CSS, patrones sutiles — profundidad sin costar
  rendimiento.
- **Mono + sans como dúo**: mono para metadatos (fechas, stack, labels), sans neutra
  para titulares/cuerpo. (Ya estamos en este dúo; falta pulir la escala.)

### 1.3 Tendencias que NO aplican (contraindicadas para reclutador)
WebGL/Three.js protagonista, scroll-jacking, marquee infinito como defecto, maximalista
de color, "brutalist revival" deliberadamente feo, IA-personalización. Todo eso sube
peso, riesgo y ruido sin subir conversión.

## 2. Principios de composición que gobernarán la recomposición

Extraídos de las guías de jerarquía visual y retícula (ver URLs al final):

1. **Escaneo Z** (páginas ricas en CTA, es el caso): marca/logo arriba-izq → nav →
   área de CTA principal → conclusión abajo-der. El hero debe leerse como una Z única:
   nombre → propuesta → CTA primario, siempre en ese orden.
2. **Patrón F** solo en texto denso; aquí no aplica como patrón rector (sí en listas
   largas: proyectos secundarios, foco).
3. **Retícula de 12 columnas + hang lines**: márgenes consistentes, gutters fijos,
   todo alineado a la retícula. Jerarquía por zonas: display | media | meta.
4. **Gestalt**: proximidad (agrupar título+meta+CTA; separar secciones con aire, no con
   líneas), similitud (mismo chip = mismo significado, o eliminarlos), figura-fondo
   (un solo acento por pantalla), continuidad/cierre (rutas visuales claras).
5. **Espacio negativo**: planear márgenes en la retícula; aislar puntos focales. Si hay
   duda, más aire. El overflow relaja; el crowding grita "plantilla".
6. **Regla de tercios / de impares**: componer con 3 columnas/1 héroe + 2 soporte, no
   4/2/2 iguales. El ojo prefiere desbalance intencional (1 grande + 2 chicos).
7. **Breaking the grid con moderación**: UN elemento fuera de la retícula por sección
   máximo; si nada sobresale, tampoco nada se recuerda.
8. **Tipografía**: una familia display + una mono para metadatos; pesos distintos de la
   MISMA familia antes que dos display distintas; leading ajustado (~0.95–1.05 en
   display, 1.5–1.6 en cuerpo); medida de línea 60–75 caracteres.
9. **Color**: 1 acento/CTA + neutros cálidos; contraste AA/AAA verificado (texto
   cuerpo ≥ 7:1 en dark). Los acentos nunca sobre texto largo.
10. **Sin elementos decorativos sin función**: marquee solo si informa; sin flechas/
    iconos duplicados que coman ancho de CTA.

## 3. No negociables responsivos (320px → desktop)

- **Mobile-first real**: diseñar 320→375 primero; mejorar por `min-width`. Nada de
  "desktop que se aplasta" ni contenido oculto en móvil.
- **Fluid typography con `clamp()`** en TODO el texto (display ~ clamp(2.4rem, 8vw, …)
  según función, no según capricho). Nunca mas de ~2 saltos de línea en el H1.
- **Fluid grid**: CSS Grid 12 col con `minmax()`/fraccional; `max-width` del lienzo
  único (~1240–1280px); imágenes `max-width:100%`, `aspect-ratio` declarado.
- **Breakpoints**: 360 / 480 / 768 / 1024 / 1280 / 1536 (contenuto-driven, no device-
  driven). Verificación obligatoria: 320, 375, 390, 414, 768, 820, 1024, 1280, 1440,
  1920 + landscape móvil.
- **Touch targets ≥ 44×44px** con ≥8px de separación; hover nunca es la única vía.
- **Nav móvil**: colapsar a una fila: logo · CV · menú; idioma visible siempre.
- **Cero overflow horizontal** en todas las anchuras (hoy el dot-grid y algunos chips
  rozan 1–2px — must verify).
- **Performance**: LCP < 2.5s, 60fps, sin layout shift (aspect-ratio + width/height
  siempre), GIF→poster en `prefers-reduced-motion`.

## 4. Diagnóstico v3 (auditoría visual hoy, 2026-11-23)

Capturas: `docs/audit/{390-mobile,768-tablet,1440-desktop}-{hero,full}.png`.

### Lo que funciona
- Stack tipográfico sans+mono; identidad dark con acento; captures reales (Portix,
  Lumen, PhotoLab, POS Rust) con buena presencia.
- Hero comunica nombre, rol, disponibilidad, CTA CV + CTA secundario. Z-pattern sano.
- ES/EN, 4 acentos, reduced-motion, lightbox: todo operativo (verificado antes).

### Problemas (por orden de severidad)
1. **Ruido de metadatos por tarjeta**: número + etiqueta categoría + pill estado +
   N chips + links. Cada dato grita en el mismo nivel → no hay figura/fondo.
2. **Ritmo vertical irregular**: tarjetas de caso 50/50 alternadas con alturas enormes
   (Portix/PhotoLab/POS ~600–700px cada una) → scroll de 5,000px (desktop) / 8,240px
   (móvil). Reclutador no llega al final.
3. **Casos sin jerarquía**: 8 proyectos con el mismo peso visual. El trío Portix / Lumen
   / PhotoLab debería mandar; el resto, densidad menor.
4. **Tarjetas muertas** (NetSniffer texto corrido, Zaphyr con imagen casi invisible por
   contraste, NetScope caja "plan") → huecos que parecen bugs.
5. **Tipografía display sobre-escalada en 768–1440**: H1 "Omar Palomares Velasco."
   ocupa 2–3 líneas a 10vw; en tablet fuerza saltos y rompe la Z.
6. **Nav móvil sobrecargado**: logo + 4 dots de tema + ES|EN + CV en una línea → 9
   objetivos táctiles en 320–375px, viola thumb-friendly 44px y satura la jerarquía.
7. **Dot-grid omnipresente**: textura en cada sección → ruido; debe ser un acento local
   del hero, no wallpaper.
8. **Chips de tags por comitiva** (5 tags × 8 proyectos = 40 chips): lectura en F rota,
   longitud variable rompe baseline entre tarjetas.
9. **Espaciado sin escala**: gaps heterogéneos (hero 12vh vs secciones 7rem+), márgenes
   laterales no consistentes vs la retícula.
10. **Header-CTA redundante**: "CV ↓" arriba + "Descargar CV" en hero + "Descargar CV"
    en contacto + "Ver proyectos" → se diluye el primario.
11. **Empty zones a la derecha** en secciones de texto (ENFOQUE) sin contrapeso
    visual → composición desbalanceada, "plantilla vacía".

## 5. Sistema de diseño propuesto (borrador para aprobar)

### 5.1 Retícula y lienzo
- Lienzo máx **1240px**, padding-inline fluido `clamp(16px, 4vw, 48px)`.
- Grid 12 col; gutters `clamp(12px, 2vw, 24px)`. Hang line del hero a 1/3 superior.
- Secciones con padding-block `clamp(64px, 12vh, 128px)`. Escala 8px base.

### 5.2 Tipografía (un sistema, tres niveles)
- Display sans (actual): H1 `clamp(2.75rem, 7.5vw + 1rem, 6.5rem)`, `line-height: .95`,
  `letter-spacing: -0.03em`.
- H2 de sección: `clamp(2rem, 4.5vw, 3.5rem)`, lh 1.0, tracking -0.02em.
- Cuerpo: 1.0625rem/1.6, medida máx 68ch; secundario 0.9375rem.
- Mono (JetBrains Mono): solo metadatos, 0.6875–0.75rem, tracking +0.08em, uppercase.
- Un solo color de texto por nivel (--ink, --ink-2, --mute).

### 5.3 Color
- Base: #0B0E11 / superficies #12161B · #171C22; líneas #232A33.
- Texto: #E8EBEF / secundario #A6B0BA; acento único por tema (mantener 4: lima,
  ámbar, cian, grafito) — pero **un acento por pantalla**, nunca dos brillantes
  conviviendo (hoy conviven lima CTA + lima tags + lima dots).

### 5.4 Componentes (pocos, repetidos, impolutos)
- **Hero**: disponible-badge → nombre (3 líneas máx) → rol → una frase → dos CTAs
  (primario CV, secundario Proyectos) → fila-meta de 3 datos (ubicación/stack/ENFOQUE).
  A la derecha o debajo (móvil): **una** imagen-proof (Portix) en marco 1px.
- **Trabajo**: 5 casos grandes en retícula 12 variando spans (7/5, 5/7…) con UNA línea
  de metadatos mono (categoría · estado), título, ≤2 frases, tags inline en texto
  (no chips) → chips solo para stack real (3 máx).
- **"En el taller"**: 3 cards compactas idénticas (Zaphyr, NetSniffer, NetScope) con
  tipografía como visual + barra de estado; sin imágenes vacías; altura uniforme.
- **Enfoque**: 3 columnas × icono mínimo + 1 frase (Sistemas / Lenguajes / Producto),
  nada más.
- **Contacto**: un solo CTA primario + secundarios discretos (email · GitHub ·
  LinkedIn · CV); datos en mono.
- **Marquee**: eliminar o conservar solo si lista proyectos REALES con rol (hoy es
  decoración); recomendado: eliminar.
- **Nav**: logo · Trabajo · Enfoque · Contacto | idioma | CV (1 botón, acento). Sin
  dots de tema en nav (tema en un menú discreto o footer). 44px targets.

### 5.5 Motion (reducido, dirigido)
- Hero reveal (2–3 steps, 400–600ms, ease-out-expo).
- Hover: realce de línea/marco + cursor pointer; nada de scale > 1.02.
- `prefers-reduced-motion`: sin reveal, poster estático. Nada más.

### 5.6 Assets
- Capturas reales conservadas; tratamiento único: marco 1px, esquinas 6px, caption
  mono ≤ 1 línea. Zaphyr/NetSniffer/NetScope: tarjetas tipográficas (sin capturas
  inventadas). POS Rust ya tiene imagen clara — conservar.

## 6. Criterios de aceptación para la recomposición
- [ ] 7 segundos → identidad + propuesta + CTA legibles sin scroll en 375px y 1440px.
- [ ] Cero overflow-x a 320/375/414/768/820/1024/1280/1440/1920 (verificado con
      Playwright `scrollWidth === innerWidth`).
- [ ] Todos los botones/links ≥ 44px táctiles; focus-visible visible; contraste AA/AAA.
- [ ] Página ≤ ~4,500px de alto en desktop (vs 5,055 actual) y ≤ ~6,500px en 375px
      (vs 8,239 actual); LCP ≤ 2.5s en simulación 4G.
- [ ] ES/EN equivalentes en longitud (sin romper layout con EN).
- [ ] Mismos contenidos/afirmaciones prudentes; cero claims nuevos inventados.

## 7. Fuentes
- Awwwards Portfolio honorees: awwwards.com/websites/winner_category_portfolio/
- Juror roundup (criterios art direction / motion / performance): hontran.dev/blog/best-award-winning-websites-2026
- Tendencias 2026: fireart.studio/blog/the-best-web-design-trends · inspirefusion.com/web-design-inspiration-trends-2026 · reallygooddesigns.com/web-design-trends-2026
- Jerarquía visual y escaneo F/Z: 2stallions.com/blog/effective-web-design-principles-visual-hierarchy · eleken.co/blog-posts/visual-hierarchy-in-ux
- Retícula y composición: courses.lumenlearning.com/suny-graphicdesign (cap. 3.4) · vaia.com grid-based design
- Responsive 2025/2026: webpeak.org · themescamp.com · webwila.com (mobile-first, clamp(), breakpoints, 44px)
