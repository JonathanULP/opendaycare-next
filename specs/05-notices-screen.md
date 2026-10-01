# SPEC 05 — Pantalla de avisos

> **Estado:** Implementado
> **Depende de:** SPEC 01, SPEC 02
> **Fecha:** 2026-10-01
> **Objetivo:** Recrear la pantalla de actividad en `/notices` fiel a `avisos.dc.html`, con una lista estática de cuatro tipos de aviso (comentario, padre activó cuenta, reacción y recordatorio de la maestra) sobre los mocks existentes.

## Alcance

**Incluye:**

- Página `/notices` (server component) con `Sidebar`, eyebrow "ACTIVIDAD", título "Avisos" (Fredoka 30px) y la lista de avisos, en un contenedor `max-width: 680px` (el mockup usa `max-width: 680px`; el feed usa 760px y `/kids` 880px).
- Cuatro filas de actividad con el estilo exacto del mockup: fondo `#FFFDF9`, borde `1px #ECE0D0`, radio 16px, padding `16px 18px`, 12px de separación, avatar de 40px, texto 14.5px `#4A4038` y hora 12.5px `#A89A8B` con `margin-top: 3px`.
- `data/mock.ts`: `AvatarIconName`, `NoticeKind`, `NOTICE_KINDS` (ícono, colores del círculo y `isClickable` por tipo), interfaz `Notice` y el array `notices` con los cuatro datos del mockup.
- `components/NoticeRow.tsx`: una fila; raíz `<Link href>` cuando el aviso es clicable y `<div>` cuando no.
- `components/NoticeList.tsx`: mapea `notices` a filas.
- `components/Avatar.tsx`: renderiza el ícono que declara `AvatarData` y lo pinta relleno solo cuando es `heart`.
- Las dos filas que en el mockup son `<a>` (comentario y reacción) enlazan a `/post-detail`, la misma ruta muerta que ya usa `PostCard` (components/PostCard.tsx:93).
- Responsive heredado de las pantallas existentes: `px-5` en mobile y `sm:px-10` (40px) en desktop, sin cambiar la lista.

**Excluido (specs futuras):**

- Filtros, tabs, buscador, agrupado por fecha, estado vacío y badges de no leído (no están en el mockup).
- La pantalla `/post-detail` (`detalle-publicacion.dc.html`): sigue siendo ruta muerta.
- Crear, editar o descartar avisos; recordatorios configurables.
- Persistencia de cualquier tipo.
- `/my-account` y el resto de pantallas pendientes.

## Modelo de datos

```ts
// data/mock.ts
export type AvatarIconName = Extract<IconName, "megaphone" | "check" | "heart" | "bell">;

export interface AvatarData {
  kind: "initials" | "icon";
  initials?: string;
  icon?: AvatarIconName;
  bg: string;
  color: string;
}

export type NoticeKind = "comment" | "parent-activated" | "reaction" | "reminder";

export const NOTICE_KINDS: Record<
  NoticeKind,
  { icon: AvatarIconName | null; bg: string; color: string; isClickable: boolean }
> = {
  comment:            { icon: null,    bg: "#C9B6E8", color: "#fff",    isClickable: true },
  "parent-activated": { icon: "check", bg: "#CFEBD8", color: "#3E9B6C", isClickable: false },
  reaction:           { icon: "heart", bg: "#FBD8CC", color: "#D9684A", isClickable: true },
  reminder:           { icon: "bell",  bg: "#F4DC8E", color: "#9A7B1E", isClickable: false },
};

export interface Notice {
  id: string;         // "notice-1"
  kind: NoticeKind;
  actor?: { name: string; initials: string };  // ausente solo en "reminder"
  text: string;       // "comentó en la publicación de Mateo." | "Recordá enviar el"
  highlight?: string; // "resumen del día" (solo "reminder")
  trailing?: string;  // "de la sala Soles." (solo "reminder")
  time: string;       // "Hace 12 min" | "Hoy 17:00"
  href?: string;      // "/post-detail" en las filas clicables
}

export const notices: Notice[] = [
  {
    id: "notice-1",
    kind: "comment",
    actor: { name: "Lucía Fernández", initials: "L" },
    text: "comentó en la publicación de Mateo.",
    time: "Hace 12 min",
    href: "/post-detail",
  },
  {
    id: "notice-2",
    kind: "parent-activated",
    actor: { name: "Diego Fernández", initials: "D" },
    text: "activó su cuenta y ya sigue a Mateo.",
    time: "Hace 1 h",
  },
  {
    id: "notice-3",
    kind: "reaction",
    actor: { name: "Carla Méndez", initials: "C" },
    text: "reaccionó a la publicación de Sofía.",
    time: "Hace 2 h",
    href: "/post-detail",
  },
  {
    id: "notice-4",
    kind: "reminder",
    text: "Recordá enviar el",
    highlight: "resumen del día",
    trailing: "de la sala Soles.",
    time: "Hoy 17:00",
  },
];
```

Regla de render del cuerpo, sin componente extra: si el aviso tiene `actor` se pinta `<b>{actor.name}</b> {text}`; si no, `{text} <b>{highlight}</b> {trailing}`. El avatar sale de `NOTICE_KINDS[kind].bg/color`: cuando el tipo declara `icon` se pinta ese ícono (check, corazón relleno, campana) y cuando es `null` se pinta `actor.initials` en Fredoka 600. El tipo, y no la presencia de `actor`, decide la forma del avatar: `parent-activated` y `reaction` tienen actor pero su avatar es un ícono.

No hay estado de aplicación: la pantalla es un server component como el feed.

## Plan de implementación

1. `data/mock.ts`: `AvatarIconName`, extender `AvatarData.icon`, y agregar `NoticeKind`, `NOTICE_KINDS`, `Notice` y `notices`. Sin tocar `posts`, `kids` ni `navItems`.
2. `components/Avatar.tsx`: renderizar el ícono declarado en `AvatarData` con `filled` solo para `heart`.
3. `components/NoticeRow.tsx`: avatar de 40px + cuerpo, con raíz `Link` si `notice.href` y `div` si no (clase y estilo de fila en constantes del módulo para no duplicar).
4. `components/NoticeList.tsx`: `flex flex-col gap-3` con `notices.map`.
5. `app/notices/page.tsx`: server component con `Sidebar`, `main` y el bloque `max-w-[680px]` con el eyebrow y el título.
6. Verificación: `npx tsc --noEmit`, `npm run lint`, `npm run build` y comparación visual con Playwright (1440×900 y 390×844) contra `avisos.dc.html`, capturas en `.playwright-mcp/`.

## Criterios de aceptación

- [ ] `/notices` muestra el `Sidebar` con "Avisos" activo (fondo `#FBE3D8`, texto `#D9583C`, peso 800) y "Feed" y "Niños" inactivos; el enlace existe sin tocar `navItems`.
- [ ] La cabecera muestra el eyebrow "ACTIVIDAD" (12.5px, `letter-spacing: 0.8px`, `#D9583C`) y el título "Avisos" en Fredoka 600 de 30px.
- [ ] El contenido mide como máximo 680px de ancho y las filas tienen fondo `#FFFDF9`, borde `#ECE0D0`, radio 16px, padding `16px 18px` y 12px de separación.
- [ ] Fila 1: círculo con la inicial "L" en `#C9B6E8` sobre blanco, "Lucía Fernández" en negrita, " comentó en la publicación de Mateo." y "Hace 12 min"; es un enlace a `/post-detail`.
- [ ] Fila 2: círculo `#CFEBD8` con check `#3E9B6C` (contorno, sin relleno), "Diego Fernández" en negrita, " activó su cuenta y ya sigue a Mateo." y "Hace 1 h"; no es clicable.
- [ ] Fila 3: círculo `#FBD8CC` con corazón relleno `#D9684A`, "Carla Méndez" en negrita, " reaccionó a la publicación de Sofía." y "Hace 2 h"; es un enlace a `/post-detail`.
- [ ] Fila 4: círculo `#F4DC8E` con campana `#9A7B1E`, el texto "Recordá enviar el **resumen del día** de la sala Soles." con solo "resumen del día" en negrita, y "Hoy 17:00"; no es clicable.
- [ ] El nombre en negrita usa peso bold sobre `color: var(--dc-ink-body)` y la hora `--dc-ink-muted`, sin negrita.
- [ ] Ninguna fila muestra filtros, buscador, contador ni estado vacío.
- [ ] `/notices` no es client component y no usa estado; no hay errores de hidratación.
- [ ] En 390px las filas ocupan el ancho disponible sin scroll horizontal y el drawer del `Sidebar` sigue funcionando.
- [ ] `/post-detail` sigue siendo ruta muerta: al hacer clic en la fila 1 o 3 se navega y renderiza el not-found de Next sin romper la app.
- [ ] `/`, `/kids`, `/kids/[id]`, `/login` y `/activate-account` siguen funcionando y el post con avatar `megaphone` del feed no cambia de aspecto.
- [ ] `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores, sin errores de consola.
- [ ] `app/globals.css` y `components/Sidebar.tsx` quedan sin modificar.

## Decisiones

- **Sí:** ruta `/notices`, la que ya figura en `navItems` (data/mock.ts:97), coherente con las rutas en inglés de SPEC 02/03.
- **Sí:** server component sin estado. No hay interacción en el mockup, así que no hay `NoticesScreen` client ni filtros.
- **Sí:** interfaz `Notice` plana con campos opcionales (`actor`, `highlight`, `trailing`, `href`) en vez de una unión discriminada: sigue el estilo plano de `Post` y `Kid`, y evita ramificar el tipo por cada variante.
- **Sí:** copy literal del mockup. El verbo ("comentó en la publicación de Mateo.") y el nombre del niño viven en `text`, sin derivarlos de `kids[]`; una regla de composición por tipo sería más elegante pero inventaría un modelo de destino que el mockup no muestra.
- **Sí:** el recordatorio es una fila más de `/notices` (es lo que muestra el mockup); crear o configurar recordatorios va en su propio spec.
- **Sí:** colores del círculo por tipo en `NOTICE_KINDS` y no por persona; el `actor` lleva solo `name` e `initials`. Una sola fuente de verdad por color y suficiente para los mocks actuales.
- **Sí:** sin tokens nuevos en `globals.css`. `#D9684A`, `#3E9B6C`, `#C9B6E8` y `#9A7B1E` viven en `data/mock.ts`, como `KIND_STYLES` y `ALLERGY_STYLES`.
- **Sí:** tiempos como strings literales, igual que `Post.meta`; no hay `Date` ni `Intl`.
- **Sí:** `AvatarIconName` como `Extract<IconName, "megaphone" | "check" | "heart" | "bell">` y renderizado genérico del ícono en `Avatar`, en lugar de duplicar el círculo en `NoticeRow`.
- **Sí:** solo comentario y reacción son enlaces, exactamente como el mockup, y van a `/post-detail` (ruta muerta ya usada por `PostCard`).
- **No:** filtros, estado vacío, no leídos, agrupado por fecha, persistencia y creación de avisos.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| El mockup no tiene media queries; el mobile es interpretación | Se define explícitamente el mismo padding de las pantallas existentes y se verifica con captura a 390px |
| `/post-detail` devuelve 404 | Aceptado por la convención de SPEC 02/03; se verifica que el not-found renderiza |
| Generalizar el ícono de `Avatar` puede alterar el feed | `AvatarIconName` sigue incluyendo `megaphone`; el criterio de aceptación verifica que el post 3 se ve igual |
| `filled` en el corazón pinta `fill="currentColor"`, no el `fill` del mockup | El `color` del `AvatarData` es `#D9684A`, así que el relleno coincide; se compara la captura |
| "Sala Soles" hardcodeado en el recordatorio queda viejo si se agrega otra sala | Fuera de alcance de este spec; queda anotado para un spec de salas múltiples |

## Lo que **no** entra en este spec

- Filtro por tipo, buscador, estado vacío, no leídos y agrupado por fecha.
- La pantalla `/post-detail` y el resto de pantallas pendientes (`Mi cuenta`, resumen del día, vincular padre).
- Crear, editar o descartar avisos, y recordatorios configurables.
- Persistencia y tiempo relativo calculado.

Cada una de esas, si llega, va en su propio spec.