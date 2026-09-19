# SPEC 01 — Home: feed de OpenDayCare

> **Estado:** Aprobado
> **Depende de:** Ninguna
> **Fecha:** 2026-09-18
> **Objetivo:** Recrear la pantalla de feed del mockup como home `/` con componentes reutilizables y datos mock, replicando el estilo del HTML de referencia sin autenticación ni base de datos.

## Alcance

**Incluye:**

- Reemplazar el contenido de `app/page.tsx` para renderizar el feed en `/`.
- Layout responsive: sidebar fijo (248px) en desktop y toggle hamburger en mobile (<1024px).
- Componentes reutilizables en `components/`: `Sidebar.tsx`, `PostCard.tsx`, `Avatar.tsx`, `FeedComposer.tsx` e `icons.tsx`.
- Datos ficticios tipados en `data/mock.ts` (usuario actual, posts, items de navegación, estilos por tipo de post).
- Fuentes Fredoka y Nunito con `next/font/google`.
- Paleta del mockup como variables CSS registradas en el theme de Tailwind v4.
- Iconos SVG inline — sin librerías nuevas.
- Links de navegación apuntando a rutas aún no implementadas (`/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`).
- Metadatos: título/descripción "OpenDayCare" y `lang="es"` en `app/layout.tsx`.

**Excluido (specs futuras):**

- Autenticación y sesión (el botón de cerrar sesión no tiene lógica real).
- Base de datos o persistencia.
- Las demás pantallas (ninos, avisos, mi-cuenta, crear-publicacion, detalle-publicacion, foto).
- Lógica real de likes, comentarios y edición (decorativo por ahora).
- Subida o render de fotos reales (el post de actividad usa el placeholder con borde punteado).

## Modelo de datos

`data/mock.ts`:

```ts
export type PostKind = "achievement" | "activity" | "announcement";

export const KIND_STYLES: Record<
  PostKind,
  { label: string; badgeBg: string; dot: string }
> = {
  achievement:  { label: "LOGRO",     badgeBg: "#CFEBD8", dot: "#3E9B6C" },
  activity:     { label: "ACTIVIDAD", badgeBg: "#C7E7F1", dot: "#2E89A6" },
  announcement: { label: "ANUNCIO",   badgeBg: "#CCD8F4", dot: "#4E72C8" },
};

export interface AvatarData {
  kind: "initials" | "icon";
  initials?: string;        // e.g. "M"
  icon?: "megaphone";       // announcements use an icon instead of initials
  bg: string;               // e.g. "#A9D9E8"
  color: string;            // e.g. "#1F7A93"
}

export interface Post {
  id: string;
  author: string;           // "Mateo" | "Anuncio general"
  avatar: AvatarData;
  meta: string;             // "14:20 · publicado por vos"
  kind: PostKind;
  audience: string;         // "Para: familia de Mateo"
  content: string;
  photo?: { title: string }; // e.g. "Foto · pintando con témperas"
  likes: number;
  comments: number;
}

export const currentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  initials: "C",
  avatarBg: "#F2937A",
};

export const posts: Post[] = [ /* achievement (3/1), activity (5/2), announcement (8/0) */ ];

export const navItems = [
  { href: "/", label: "Feed", icon: "home", active: true },
  { href: "/ninos", label: "Niños", icon: "children" },
  { href: "/avisos", label: "Avisos", icon: "bell" },
  { href: "/mi-cuenta", label: "Mi cuenta", icon: "user" },
];
```

## Plan de implementación

1. `app/layout.tsx`: cargar Fredoka + Nunito con `next/font/google`, `lang="es"` y metadata "OpenDayCare". Verificar sintaxis en la doc local (`node_modules/next/dist/docs/`), que tiene breaking changes.
2. `globals.css`: definir la paleta como variables CSS y mapearlas en `@theme` de Tailwind v4; `body` con `#F6ECDF` y Nunito.
3. `data/mock.ts`: tipos, constantes `KIND_STYLES`, `currentUser`, `posts`, `navItems`.
4. `components/icons.tsx`: SVGs inline (casa, niños, campana, usuario, logout, logo, más, corazón, comentario, cámara, megáfono).
5. `components/Avatar.tsx`: renderiza iniciales o ícono con los colores dados.
6. `components/Sidebar.tsx` (client): usa `navItems` y `usePathname()` para resaltar activo; botón "Nueva publicación" → `/crear-publicacion`; perfil inferior con `currentUser`; `useState` para toggle hamburger en mobile.
7. `components/PostCard.tsx`: header (Avatar + autor + meta), badge por `kind`, audience, contenido, `photo` placeholder opcional, pie con likes/comentarios/editar → `/crear-publicacion`.
8. `components/FeedComposer.tsx`: caja "Compartí un momento…" → `/crear-publicacion`.
9. `app/page.tsx`: header ("Buenas, Caro" + "12 niños · martes 17 jun"), composer, separador "Publicado hoy", lista de `posts` mapeada a `PostCard`.
10. Responsive: sidebar oculto por defecto en mobile, hamburger lo despliega; en desktop fijo 248px.

## Criterios de aceptación

- [ ] `/` se ve visualmente idéntico al mockup (tipografía, colores, espaciados, badges).
- [ ] `npx tsc --noEmit` y `npm run build` pasan sin errores.
- [ ] Desktop (≥1024px): sidebar fijo de 248px con "Feed" destacado.
- [ ] Mobile (<1024px): aparece botón hamburger que alterna la visibilidad del sidebar.
- [ ] "Nueva publicación" y la caja "Compartí un momento…" enlazan a `/crear-publicacion`.
- [ ] Links del sidebar apuntan a `/ninos`, `/avisos` y `/mi-cuenta`.
- [ ] Cada post muestra su badge con colores correctos (LOGRO/ACTIVIDAD/ANUNCIO).
- [ ] Likes/comentarios coinciden con el mockup: 3/1, 5/2, 8/0.
- [ ] "Editar" enlaza a `/crear-publicacion`.
- [ ] Sin errores de consola al cargar `/`.
- [ ] `lang="es"` y título de pestaña "OpenDayCare".

## Decisiones

- **Sí:** componentes reutilizables — el sidebar y PostCard se reutilizarán en las pantallas futuras.
- **Sí:** `data/mock.ts` tipada — fácil de sustituir por la API cuando exista la DB.
- **Sí:** valores de tipos e identificadores de código en inglés (`PostKind = "achievement" | "activity" | "announcement"`) — los labels de UI se muestran en español fieles al mockup (LOGRO/ACTIVIDAD/ANUNCIO). Respeta las reglas de código de `AGENTS.md`.
- **Sí:** paleta como variables CSS en el theme de Tailwind v4 — centraliza colores y respeta la v4 (sin `tailwind.config`).
- **Sí:** `next/font/google` para Fredoka + Nunito — optimizado y sin peticiones externas.
- **Sí:** SVGs inline — fiel al mockup y cero dependencias.
- **Sí:** rutas de navegación en español (`/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`) — fieles a los mockups; cuentan como copy de URL pública, no como identificadores de código.
- **No:** autenticación, persistencia, otras pantallas y lógica de likes — cada una va en su spec.
- **No:** cargar fotos reales — el mockup usa un placeholder, se mantiene así.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Sintaxis `next/font` o `@theme` de Tailwind v4 difiere de lo conocido | Consultar docs locales (`node_modules/next/dist/docs/`) y Context7 antes de implementar |
| Ícono activo del sidebar dependiendo de la ruta | `usePathname()` en Sidebar; hoy solo `/` existe, da "Feed" activo |

## Lo que **no** entra en este spec

- Autenticación, base de datos y las demás pantallas (ninos, avisos, mi-cuenta, crear-publicacion, detalle, foto).
- Lógica de likes/comentarios/edición.
- Cada uno de esos, si llega, va en su propio spec.
