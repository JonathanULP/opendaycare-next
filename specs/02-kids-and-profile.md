# SPEC 02 — Kids: listado y perfil

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-09-20
> **Objetivo:** Recrear las pantallas `/kids` (listado de niños) y `/kids/[id]` (perfil de niño) fieles a `ninos.dc.html` y `perfil-nino.dc.html`, solo interfaces y componentes con datos mock — sin CRUD, vinculación real ni demás pantallas. Incluye además renombrar las rutas de SPEC 01 al inglés.

## Alcance

**Incluye:**

- Renombrar las rutas de SPEC 01 al inglés (solo strings de `href`; ninguna de esas páginas existe aún):
  - `navItems` en `data/mock.ts`: `/ninos`→`/kids`, `/avisos`→`/notices`, `/mi-cuenta`→`/my-account`.
  - `Sidebar.tsx` y `FeedComposer.tsx`: `/crear-publicacion`→`/create-post`.
  - `PostCard.tsx`: `/foto`→`/photo`, `/detalle-publicacion`→`/post-detail`, `/crear-publicacion`→`/create-post`.
  - `/login` no cambia. El copy visible sigue en español (labels, bloques, mensajes).
- Página `/kids`: header "GESTIÓN · Niños" con botón "Agregar niño", buscador funcional "Buscar niño…" que filtra por nombre (client-side), sección "SALA SOLES · 8 niños" con subtítulo "Radicales de la sala" y grilla de 2 columnas con 8 tarjetas `KidCard`.
- Componente reutilizable `KidCard.tsx` (presentacional, como `PostCard`):
  - Avatar 48px con iniciales y colores por niño, nombre, subtítulo "X años · N padres vinculados" ("sin padres vinculados" si 0).
  - Badge de alergia (`MANÍ`/`LACTOSA`) cuando el niño tiene alergias; badge `VINCULAR` cuando tiene 0 padres; chevron en el resto.
  - Enlaza a `/kids/[id]`.
- Página `/kids/[id]` (server component) con `await params` (Next 16) y `notFound()` si el id no existe:
  - Volver a `/kids` con `chevron-left`, cabecera (Avatar 84px, nombre, subtítulo "3 años · Sala Soles", botón "Editar" → `/add-child`).
  - Banner de alergias `alert-triangle` (solo si el niño tiene alergias): badge `MANÍ` + nota "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.".
  - Tarjeta de datos: filas "Fecha de nacimiento" / "Sala" (muestra `roomShort`, ej. "Soles") / "Ingreso", separadas por líneas; sin borde inferior en la última.
  - Botón "Resumen del día" (reutiliza `Logo`) → `/day-summary` (dead).
  - Tarjeta "PADRES VINCULADOS": cabecera "2 · PADRES VINCULADOS", cada padre con Avatar 40px, nombre, "Mamá/Papá · ACTIVA/PENDIENTE", badge `ACTIVA` (verde) o `PENDIENTE` (ámbar); fila "Vincular otro padre" (icono `plus` en círculo punteado) → `/link-parent` (dead).
- Indexar `kids` en `data/mock.ts`; los 8 niños del mockup (id tipo `mateo-fernandez`).
- Íconos nuevos en `icons.tsx`: `chevron-left`, `chevron-right`, `alert-triangle`, `plus` ya existe.

**Excluido (specs futuras):**

- Pantallas `agregar-nino`, `resumen-dia` y `vincular-padre` (solo rutas muertas enlazadas, como en SPEC 01).
- Autenticación, base de datos/persistencia y CRUD real de niños.
- Vínculo real de padres, edición de perfil y resumen del día.
- Otras salas (solo "Sala Soles").

## Modelo de datos

En `data/mock.ts` (extiende el archivo existente; el spec 01 ya reutilizaba `AvatarData`):

```ts
export type ParentStatus = "active" | "pending";

export type AllergyKind = "peanut" | "lactose";

export const ALLERGY_STYLES: Record<
  AllergyKind,
  { badge: string; bannerBg: string; bannerColor: string }
> = {
  peanut:  { badge: "MANÍ",    bannerBg: "#FBE3D8", bannerColor: "#D9583C" },
  lactose: { badge: "LACTOSA", bannerBg: "#F9EDCF", bannerColor: "#B5871E" },
};

export interface KidAllergies {
  kind: AllergyKind; // define badge y colores del banner (como `Post.kind`/`KIND_STYLES`)
  note: string;      // "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila."
}

export interface KidParent {
  name: string;       // "Lucía Fernández"
  role: string;       // "Mamá" | "Papá"
  status: ParentStatus;
  initials: string;   // "L"
  avatarBg: string;   // "#C9B6E8"
  avatarColor: string;// "#7B5FC0"
}

export type AllergyKind = "peanut" | "lactose";

export const ALLERGY_STYLES: Record<AllergyKind, { badge: string; note: string }> = {
  peanut: {
    badge: "MANÍ",
    note: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
  },
  lactose: {
    badge: "LACTOSA",
    note: "Intolerancia a la lactosa. Sustituir lácteos por alternativas sin lactosa.",
  },
};

export interface Kid {
  id: string;         // "mateo-fernandez"
  name: string;       // "Mateo Fernández"
  age: number;        // 3
  room: string;       // "Sala Soles" — subtítulo del header del perfil
  roomShort: string;  // "Soles" — fila "Sala" del perfil
  birthDate: string;  // "12 mar 2022" (literal, no se calcula)
  admission: string;  // "feb 2025" (literal)
  initials: string;   // "M"
  avatarBg: string;   // "#A9D9E8"
  avatarColor: string;// "#1F7A93"
  allergies?: { kind: AllergyKind; note: string };  // ej. { kind: "peanut", note: "Lleva inhalador en la mochila." }
  parents: KidParent[];
}

export const kids: Kid[] = [
  // Mateo (MANÍ, 2 padres: Lucía ACTIVA + Diego PENDIENTE),
  // Sofía (1 padre), Benjamín (2), Valentina (0 → VINCULAR),
  // Tomás (LACTOSA, 1), Emma (1), Lucas (1), Olivia (1)
];
```

Los 8 niños usan los colores/letras del mockup (`#A9D9E8/#1F7A93`, `#F4B8CC/#C44A7A`, `#B9DEC4/#3E8B62`, `#F4DC8E/#9A7B1E`, `#C9B6E8/#7B5FC0`). Solo Mateo tiene alergias y padres detallados en el mockup; el resto lleva placeholders plausibles (nombres de padres genéricos) con el count correcto.

## Plan de implementación

1. `components/icons.tsx`: agregar `chevron-left`, `chevron-right` y `alert-triangle` a `IconName` e `iconPaths`. Verificar `npx tsc --noEmit`.
2. Renombrar rutas de SPEC 01 (`data/mock.ts` navItems, `Sidebar.tsx`, `FeedComposer.tsx`, `PostCard.tsx`) a inglés; verificar `npx tsc --noEmit` y `npm run build` sin tocar el feed.
3. `data/mock.ts`: agregar `ParentStatus`, `KidParent`, `Kid` y `kids` (8).
4. `components/KidCard.tsx`: tarjeta presentacional (Avatar, nombre, subtítulo, badge o chevron, enlace).
5. `components/KidsList.tsx` (`"use client"`): buscador con estado + filtro por nombre + grilla de `KidCard`.
6. `app/kids/page.tsx` (server): `Sidebar` + header (GESTIÓN / Niños / Agregar niño → `/add-child`) + `KidsList`.
7. `app/kids/[id]/page.tsx` (server): `await params` + `notFound()`, perfil inline fiel al mockup. Verificar sintaxis Next 16 en `node_modules/next/dist/docs/`.
8. Verificación final: `npx tsc --noEmit`, `npm run build` y comparación visual contra `ninos.dc.html` y `perfil-nino.dc.html`.

## Criterios de aceptación

- [ ] `/kids` se ve visualmente idéntico a `ninos.dc.html`: header, buscador, sección "SALA SOLES · 8 niños" y grilla de 8 tarjetas.
- [ ] Escribir en "Buscar niño…" filtra las tarjetas por nombre (case-insensitive); al vaciar vuelven las 8.
- [ ] Las tarjetas muestran el badge correcto: MANÍ (Mateo), LACTOSA (Tomás), VINCULAR (Valentina), chevron en las demás.
- [ ] Cada tarjeta enlaza a `/kids/[id]` del niño correspondiente.
- [ ] `/kids/mateo-fernandez` se ve idéntico a `perfil-nino.dc.html`: volver, cabecera 84px con Editar, banner MANÍ, filas nacimiento/Sala "Soles"/Ingreso, Resumen del día, PADRES VINCULADOS con Lucía ACTIVA + Diego PENDIENTE y "Vincular otro padre".
- [ ] Los enlaces Editar, Resumen del día y Vincular otro padre apuntan a `/add-child`, `/day-summary` y `/link-parent` (rutas muertas) sin errores.
- [ ] Un id inexistente (`/kids/algo`) muestra el `not-found` sin romper la app.
- [ ] El sidebar mantiene "Niños" activo tanto en `/kids` como en `/kids/[id]`, y conserva el toggle mobile de SPEC 01 (<1024px).
- [ ] `npx tsc --noEmit` y `npm run build` pasan sin errores (home `/` incluido tras el rename).
- [ ] Sin errores de consola al navegar entre `/kids` y un perfil.

## Decisiones

- **Sí:** rutas en idioma inglés (`/kids`, `/kids/[id]`, `/notices`, `/my-account`, `/create-post`, `/add-child`...) — anula la decisión de SPEC 01 de rutas en español; solo cambian strings de href (ninguna página afectada existe). El copy visible se mantiene en español. Decisión tomada explícitamente por el usuario.
- **Sí:** buscar en cliente (`KidsList`) — un input muerto se siente roto; es barato.
- **Sí:** rutas muertas `/add-child`, `/day-summary`, `/link-parent` — coherente con SPEC 01.
- **Sí:** renombrar en este mismo spec los hrefs de SPEC 01 — evita un rash de ediciones pequeñas y un spec extra para eso.
- **Sí:** perfil inline en `app/kids/[id]/page.tsx` (no componentes de perfil separados) — no se reutiliza en ningún otro lado hoy.
- **Sí:** extender `data/mock.ts` — un solo punto de sustitución por API; igual que SPEC 01.
- **Sí:** fechas como strings literales del mockup ("12 mar 2022", "feb 2025") — no se calculan.
- **No:** CRUD, vínculo de padres, ni las pantallas agregar-nino/resumen-dia/vincular-padre — cada una va en su spec.
- **No:** resaltar alergia en la tarjeta de la lista con lógica de "si allergies, si no padres, si no chevron" más allá de lo descrito.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Next 16: `await params` y convenciones nuevas | Consultar `node_modules/next/dist/docs/` y Context7 antes de implementar |
| Id inexistente en ruta dinámica | `notFound()` en `/kids/[id]/page.tsx` |
| El rename de rutas rompe el feed de SPEC 01 | Solo toca strings de href; verificar `npm run build` y `/` al final |

## Lo que **no** entra en este spec

- Pantallas Agregar niño, Resumen del día y Vincular padre (rutas muertas).
- Autenticación, persistencia, CRUD y lógica de vínculos.
- Los logos/fuentes/paleta ya están en SPEC 01.
- Cada una de esas pantallas, si llega, va en su propio spec.
