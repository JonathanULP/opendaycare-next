# SPEC 03 — Login y activación de cuenta

> **Estado:** Aprobado
> **Depende de:** SPEC 01, SPEC 02
> **Fecha:** 2026-09-30
> **Objetivo:** Recrear las pantallas `/login` y `/activate-account` fieles a `login.dc.html` y `activar-cuenta.dc.html`, sin el selector de rol y sin lógica de formularios.

## Alcance

**Incluye:**

- Página `/login` (server component): panel izquierdo con gradiente 155deg `#F6A98E` → `#F2937A` → `#EC7E62`, badge de logo 46px, titular "El día de cada niño, compartido con su familia.", subtítulo, pie "🌿 Guardería Sala Soles" y dos círculos decorativos (420px arriba-derecha, 300px abajo-izquierda).
- Formulario de `/login` sin el bloque "INGRESO COMO" ni los botones Personal/Familia: título "Iniciar sesión", "Ingresá para ver el día de hoy.", campos EMAIL y CONTRASEÑA, "¿Olvidaste tu contraseña?", CTA "Iniciar sesión" y pie "¿Te invitó la guardería? Activá tu cuenta".
- Página `/activate-account` (server component, centrada, `max-width: 440px`): badge de logo 58px con gradiente 155deg `#F8C3A8` → `#F2937A`, "Bienvenida a OpenDayCare", texto de invitación, tarjeta del niño invitado, campos CÓDIGO DE INVITACIÓN / EMAIL / CREAR CONTRASEÑA, consentimiento con check verde, CTA "Activar mi cuenta" y pie "¿Ya tenés cuenta? Iniciar sesión".
- Ícono `check` en `components/icons.tsx` (usado por el consentimiento).
- Token `--dc-canvas-warm: #fbf4ec` en `app/globals.css` (fondo propio de las pantallas de acceso) mapeado a `bg-canvas-warm`.
- Datos de invitación en `data/mock.ts`: `Invitation` + `invitation` (código, email, niño, sala, colores de avatar).
- Layout responsive de `/login`: dos columnas en ≥1024px, panel naranja compacto arriba del formulario en mobile.
- Enlaces cruzados entre las dos pantallas y los destinos: `/` (login), `/family-feed` y `/forgot-password` (rutas muertas, sin pantallas todavía).

**Excluido (specs futuras):**

- Autenticación, sesión, cookies, tokens y base de datos.
- Validación de formularios y mensajes de error (no hay backend ni mockup de estados).
- Pantalla de recuperación de contraseña y feed de familia (`/forgot-password`, `/family-feed` quedan como rutas muertas).
- Selector de rol Personal/Familia (eliminado por decisión del usuario) y el feed de familia como destino del login.
- Metadata por página (se mantiene la del root layout).

## Modelo de datos

`data/mock.ts` (extiende el archivo existente):

```ts
export interface Invitation {
  code: string;         // "7K4P9"
  email: string;        // "lucia.fernandez@gmail.com"
  kidName: string;      // "Mateo"
  kidInitials: string;  // "M"
  room: string;         // "Sala Soles"
  avatarBg: string;     // "#A9D9E8"
  avatarColor: string;  // "#1F7A93"
}

export const invitation: Invitation = {
  code: "7K4P9",
  email: "lucia.fernandez@gmail.com",
  kidName: "Mateo",
  kidInitials: "M",
  room: "Sala Soles",
  avatarBg: "#A9D9E8",
  avatarColor: "#1F7A93",
};
```

`app/globals.css`:

```css
--dc-canvas-warm: #fbf4ec;
/* en @theme inline */
--color-canvas-warm: var(--dc-canvas-warm);
```

No hay estado de aplicación nuevo: ninguna de las dos pantallas es client component.

## Plan de implementación

1. `components/icons.tsx`: agregar `check` a `IconName` (`<polyline points="20 6 9 17 4 12" />`) e `iconPaths`. Verificar con `npx tsc --noEmit`.
2. `app/globals.css`: agregar `--dc-canvas-warm` y su mapeo en `@theme inline`.
3. `data/mock.ts`: agregar `Invitation` e `invitation` con los valores del mockup.
4. `app/login/page.tsx`: server component. Grid `lg:grid-cols-[1.05fr_1fr]`, panel con gradiente, círculos absolutos, logo (`Logo` de `icons.tsx`), titular, subtítulo, pie; columna del formulario con `max-width: 392px`. Sin `Sidebar`.
5. `app/activate-account/page.tsx`: server component. Contenedor centrado `min-h-screen` con `bg-canvas-warm`, tarjeta de invitación con `Avatar` de 44px, inputs con los estilos del mockup (código en Fredoka 18px `letter-spacing: 3px`, contraseña con borde `#F2A78E`), consentimiento con `peer` de Tailwind, CTA y pie.
6. Verificación: `npx tsc --noEmit`, `npm run lint`, `npm run build`, y comparación visual contra ambos mockups con Playwright (desktop 1440×900 y mobile 390×844) guardando las capturas en `.playwright-mcp/`.

## Criterios de aceptación

- [ ] `/login` no renderiza el bloque "INGRESO COMO" ni los botones "Personal"/"Familia".
- [ ] `/login` muestra el panel izquierdo con el gradiente 155deg `#F6A98E`/`#F2937A`/`#EC7E62`, el badge de logo de 46px, el titular, el subtítulo, el pie "🌿 Guardería Sala Soles" y los dos círculos decorativos.
- [ ] `/login` muestra el formulario con título de 30px, "Ingresá para ver el día de hoy.", labels EMAIL y CONTRASEÑA, email vacío, contraseña con placeholder "••••••••" y el enlace "¿Olvidaste tu contraseña?" a la derecha.
- [ ] "Iniciar sesión" navega a `/` y "Activá tu cuenta" a `/activate-account`.
- [ ] `/activate-account` muestra el badge de 58px, "Bienvenida a OpenDayCare", el texto de invitación y la tarjeta con "Te invitaron a seguir a" + "Mateo · Sala Soles" (Avatar 44px, `#A9D9E8`/`#1F7A93`).
- [ ] `/activate-account` muestra el código `7K4P9` en Fredoka 18px con `letter-spacing: 3px`, el email `lucia.fernandez@gmail.com` y el campo de contraseña con borde `#F2A78E`.
- [ ] El consentimiento se ve marcado por defecto (check verde `#5FB97E` sobre `#FBF1D6`) y es alternable con un clic.
- [ ] "Activar mi cuenta" navega a `/family-feed` (ruta muerta, muestra el not-found de Next) y "¿Ya tenés cuenta? Iniciar sesión" a `/login`.
- [ ] Ambas páginas usan el fondo `#FBF4EC` (distinto del `--dc-canvas` de las pantallas con sidebar) y no renderizan el `Sidebar`.
- [ ] Ninguna de las dos páginas es client component ni usa estado; no hay errores de hidratación.
- [ ] En mobile (<1024px) `/login` apila el panel naranja compacto arriba del formulario, sin scroll horizontal; `/activate-account` queda centrado y legible.
- [ ] `/`, `/kids` y `/kids/[id]` siguen funcionando y el `Sidebar` mantiene su enlace a `/login`.
- [ ] `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores.
- [ ] Sin errores de consola al navegar `/login` → `/activate-account` → `/`.

## Decisiones

- **Sí:** rutas en inglés `/login` y `/activate-account`, coherentes con SPEC 02. El copy visible sigue en español.
- **Sí:** eliminar el selector Personal/Familia (decisión del usuario). Como ya no hay elección de rol, "Iniciar sesión" va a `/` (feed staff) en vez de a `/family-feed`.
- **Sí:** formularios sin estado (decisión del usuario) — los CTA son `Link` a rutas reales, igual que los `<a href>` del mockup, no `<form>` con action.
- **Sí:** rutas muertas `/family-feed` y `/forgot-password` — no hay mockup para recuperación de contraseña, y el feed de familia es otra pantalla; misma convención que `/add-child` en SPEC 02.
- **Sí:** email de login vacío. El valor precargado del mockup (`caro@opendaycare.com`) venía del selector de rol que se elimina, así que se descarta.
- **Sí:** el consentimiento es un `<input type="checkbox" defaultChecked>` real estilado con el variante `peer` de Tailwind: se ve como el mockup (check verde) y se alterna sin estado de React.
- **Sí:** `invitation` con campos planos en `data/mock.ts`, sin referencia cruzada a `kids[0]`, siguiendo el modelo plano de SPEC 02 (los padres están inline en cada niño).
- **Sí:** token `--dc-canvas-warm` en `globals.css` en lugar de hex sueltos, sin tocar `--dc-canvas` que usan las pantallas con sidebar.
- **No:** autenticación, validación, mensajes de error ni persistencia.
- **No:** pantallas de recuperación de contraseña y feed de familia (cada una en su spec si llega).

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| El mockup de login no tiene media queries; el apilado mobile es interpretación | Comportamiento mobile definido explícitamente en el spec y verificado con captura a 390px |
| `/family-feed` y `/forgot-password` devuelven 404 | Aceptado por convención; se verifica que el not-found de Next renderiza sin romper la app |
| Precargar el email del mockup depende del selector de rol eliminado | Se deja vacío y queda registrado en Decisiones |
| Fondo `#FBF4EC` distinto del canvas de la app | Token `--dc-canvas-warm` en el theme, sin alterar el canvas global |

## Lo que **no** entra en este spec

- Autenticación real, sesión, cookies, tokens y base de datos.
- Validación de formularios, estados de error y mensajes al usuario.
- Pantalla de recuperación de contraseña (`/forgot-password`) y feed de familia (`/family-feed`).
- Selector de rol Personal/Familia.
- Metadata por página y cualquier otra pantalla pendiente.

Cada una de esas, si llega, va en su propio spec.
