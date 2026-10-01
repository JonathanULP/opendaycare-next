# SPEC 04 — Modal de agregar niño

> **Estado:** Implementado
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-01
> **Objetivo:** Convertir el botón "Agregar niño" de `/kids` en un modal que valida nombre, fecha de nacimiento y sala, y agrega el niño a la lista en memoria.

## Alcance

**Incluye:**

- Botón "Agregar niño" de `/kids` como `<button>` que abre el modal (deja de ser `Link` a `/add-child`).
- `components/AddKidModal.tsx` (client): overlay + panel fiel a `agregar-nino.dc.html` (`#FBF4EC`, borde `#ECE0D0`, radio 24px, `max-width: 520px`) con header Cancelar / "Agregar niño" (Fredoka 18px) / Guardar y los campos NOMBRE COMPLETO, FECHA DE NACIMIENTO, SALA, ALERGIAS (ETIQUETAS), NOTAS MÉDICAS.
- Validación client-side: nombre, fecha y sala obligatorios; fecha no futura. Asterisco en los labels obligatorios, borde rojo `#D9583C` + mensaje por campo, `aria-invalid` y `aria-describedby`.
- Guardar agrega el `Kid` derivado al final de la grilla; el contador pasa a "9 niños"; el modal cierra y los campos quedan limpios.
- Cierre con Cancelar, tecla Esc y click en el overlay; bloqueo del scroll de fondo; foco en el campo nombre al abrir.
- `components/KidsScreen.tsx` (client) con el estado de niños y de apertura; `app/kids/page.tsx` queda como server component delgado (`Sidebar` + `KidsScreen`).
- `lib/kids.ts`: `KID_AVATAR_PALETTE`, `slugifyKidName`, `buildKidId`, `formatBirthDate`, `calculateAge`, `getKidInitials`, `parseAllergyKind`, `isFutureIsoDate`, `toIsoDate`.
- `data/mock.ts`: `Room` + `rooms` (una sola sala) y `medicalNotes?: string` en `Kid`.
- `/kids/[id]`: bloque "NOTAS MÉDICAS" solo cuando hay contenido; el banner de alergias muestra la nota solo si no está vacía.
- Ícono `chevron-down` en `components/icons.tsx` para el desplegable de SALA.

**Excluido (specs futuras):**

- Edición de niños: "Editar" sigue enlazando a `/add-child` (ruta muerta).
- Persistencia (localStorage, backend, base de datos): todo se pierde al recargar.
- Foto/avatar del niño, más salas, vincular padres desde el modal.
- Badges múltiples de alergia: solo se reconoce la primera etiqueta conocida.
- Validaciones de negocio complejas (edad mínima/máxima, formato del nombre, nombres duplicados).

## Modelo de datos

```ts
// data/mock.ts
export interface Room {
  name: string;   // "Sala Soles"
  short: string;  // "Soles"
}

export const rooms: Room[] = [{ name: "Sala Soles", short: "Soles" }];

export interface Kid {
  // ...campos existentes de SPEC 02 sin cambios
  medicalNotes?: string; // "Indicaciones, medicación, contactos…"
}
```

```ts
// lib/kids.ts — helpers puros, sin estado
export const KID_AVATAR_PALETTE: { bg: string; color: string }[] = [
  { bg: "#A9D9E8", color: "#1F7A93" },
  { bg: "#F4B8CC", color: "#C44A7A" },
  { bg: "#B9DEC4", color: "#3E8B62" },
  { bg: "#F4DC8E", color: "#9A7B1E" },
  { bg: "#C9B6E8", color: "#7B5FC0" },
];
```

Estado del formulario, interno de `AddKidModal`:

```ts
interface NewKidDraft {
  fullName: string;     // "Martina López"
  birthDate: string;    // ISO "2023-10-05" (de <input type="date">)
  roomShort: string;    // "Soles"
  allergyTags: string;  // "Maní, Lactosa"
  medicalNotes: string; // ""
}
```

Derivación al guardar (en `KidsScreen.handleSaveKid`): `id` = `buildKidId(slugifyKidName(fullName), existingIds)`; `birthDate` = `formatBirthDate(iso)` → `"05 oct 2023"`; `age` = `calculateAge(iso)`; `room`/`roomShort` desde `rooms`; `initials` = inicial del primer nombre en mayúscula; `avatarBg`/`avatarColor` = `KID_AVATAR_PALETTE[kids.length % 5]`; `allergies` = `parseAllergyKind(tags)` → `{ kind, note: "" }` o `undefined`; `medicalNotes` = trim; `parents: []`; `admission: "—"`.

`parseAllergyKind` separa por comas y compara sin acentos ni mayúsculas contra `maní/cacahuete → peanut` y `lactosa/lácteos → lactose`, devolviendo el primer match. `formatBirthDate` usa mes de 3 letras minúsculas, igual que los literales de SPEC 02.

Consecuencia asumida de no haber persistencia: el niño recién creado vive solo en el estado del navegador, así que su tarjeta enlaza a `/kids/<slug>` y esa ruta muestra el not-found. El bloque NOTAS MÉDICAS queda listo para cuando haya datos reales.

## Plan de implementación

1. `components/icons.tsx`: agregar `chevron-down` (`<path d="m6 9 6 6 6-6" />`). Verificar `npx tsc --noEmit`.
2. `data/mock.ts`: agregar `Room`, `rooms` y `medicalNotes?: string` en `Kid`. Sin tocar valores existentes.
3. `lib/kids.ts`: los nueve helpers del modelo de datos.
4. `components/AddKidModal.tsx` (client): overlay, panel del mockup, estado del formulario, validación y `onSave(draft)`.
5. `components/KidsScreen.tsx` (client): estado `kids` + `isAddKidOpen`, derivación del `Kid`, header con `<button>`, `KidsList` y `AddKidModal`.
6. `app/kids/page.tsx`: server component delgado con `Sidebar` + `<KidsScreen initialKids={kids} />`.
7. `app/kids/[id]/page.tsx`: bloque de notas médicas condicional y nota del banner de alergias condicional.
8. Verificación: `npx tsc --noEmit`, `npm run lint`, `npm run build` y comparación visual con Playwright (1440×900 y 390×844) contra `agregar-nino.dc.html`, capturas en `.playwright-mcp/`.

## Criterios de aceptación

- [x] En `/kids`, "Agregar niño" abre el modal y ya no navega a `/add-child`.
- [x] El modal reproduce el panel de `agregar-nino.dc.html`: fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, ancho máximo 520px, header con Cancelar / "Agregar niño" / Guardar y los cinco labels en mayúsculas.
- [x] Al abrirse, el foco está en el campo nombre y el fondo no se desplaza con rueda ni teclado.
- [x] "NOMBRE COMPLETO *", "FECHA DE NACIMIENTO *" y "SALA *" llevan asterisco; los otros dos labels no.
- [x] Guardar con nombre vacío muestra borde rojo y "Este campo es obligatorio"; con fecha vacía, "Seleccioná la fecha de nacimiento"; con sala vacía, "Elegí una sala".
- [x] Una fecha futura muestra "La fecha de nacimiento no puede ser futura".
- [x] El error de un campo desaparece al corregirlo.
- [x] El desplegable SALA abre la lista con "Soles" y la cierra al elegir; con la sala elegida, Guardar no marca error. (La sala viene preseleccionada, así que el error "Elegí una sala" es defensivo y no se alcanza desde la UI.)
- [x] Con los tres campos válidos, Guardar cierra el modal y agrega la tarjeta al final de la grilla; el contador pasa a "9 niños".
- [x] La tarjeta nueva muestra la edad calculada desde la fecha, "sin padres vinculados" y el badge VINCULAR.
- [x] Con "Maní" en ALERGIAS, la tarjeta muestra MANÍ; con "Maní, Lactosa" también MANÍ (primera coincidencia); con texto sin coincidencias, muestra VINCULAR.
- [x] La tarjeta nueva enlaza a `/kids/martina-lopez`: como el niño solo existe en el estado en memoria del navegador, esa ruta muestra el not-found (consecuencia directa de no haber persistencia, no un error de la app).
- [x] `/kids/[id]` muestra el bloque NOTAS MÉDICAS entre la tarjeta de datos y el resumen del día cuando el niño tiene `medicalNotes`; con los mocks actuales ninguno lo tiene, así que el bloque se verifica inyectando `medicalNotes` temporal en un niño de `data/mock.ts`.
- [x] Cancelar, Esc y click en el overlay cierran sin agregar nada a la lista; con la lista de salas abierta, el primer Esc cierra solo la lista.
- [x] Reabrir el modal muestra los campos vacíos y "Soles" preseleccionada.
- [x] Recargar restaura los 8 niños originales.
- [x] "Editar" en `/kids/[id]` sigue apuntando a `/add-child` y el resto del perfil no cambia.
- [x] Bajo 480px la fila FECHA DE NACIMIENTO / SALA pasa a una columna, sin scroll horizontal.
- [x] `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores, sin errores de consola ni de hidratación.

## Decisiones

- **Sí:** modal en lugar de navegación, pedido explícito del usuario; se conserva el look de `agregar-nino.dc.html` dentro de un overlay.
- **Sí:** estado en memoria, no localStorage — el proyecto es mock estático y la lista debe reflejar el guardado sin inventar persistencia.
- **Sí:** `components/KidsScreen.tsx` (client) como dueño del estado, porque el botón que abre el modal vive en el server component actual; `KidsList` sigue siendo client y recibe `kids` por props.
- **Sí:** `<dialog>` nativo con `showModal()` — focus trap, Esc y capa superior sin código extra; el overlay se estila con `::backdrop`.
- **Sí:** validaciones locales con mensaje por campo y asterisco en los labels.
- **Sí:** `input type="date"` nativo en lugar de texto `dd/mm/aaaa`.
- **Sí:** alergias como texto con comas (fiel al mockup) mapeadas a `AllergyKind`; sin coincidencia no hay badge.
- **Sí:** `medicalNotes` en `Kid` y visible en el perfil — el formulario lo pide y un campo guardado que nadie muestra es dato muerto.
- **Sí:** `parents: []` y `admission: "—"` en los niños nuevos, lo que produce el badge VINCULAR ya existente.
- **Sí:** helpers puros en `lib/kids.ts` (primera carpeta `lib/` del repo) para no mezclar lógica con `data/mock.ts`.
- **Sí:** click en cualquier punto fuera del panel cierra el modal, incluso con la lista de salas abierta; con la lista abierta el primer Esc cierra solo la lista.
- **No:** edición, persistencia, avatar/foto, más salas, vincular padres, badges múltiples de alergia.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| `input type="date"` muestra el formato según el locale del navegador, no `dd/mm/aaaa` | Se acepta el control nativo y el criterio de aceptación verifica el valor ISO, no el texto visible |
| El mockup no tiene overlay ni media queries | Overlay `rgba(63,54,46,.45)` y columna única bajo 480px definidos aquí y verificados con captura |
| El bloqueo de scroll debe cubrir `main` (desktop) y `body` (mobile) | Bloquear `overflow` en ambos y restaurar al cerrar |
| El slug del nombre puede colisionar con un niño existente | `buildKidId` agrega sufijo numérico (`-2`, `-3`) |
| Chrome computa `border-width: 1.5px` como `1px` | Comportamiento del navegador, idéntico al que renderiza el mockup con su `border:1.5px` inline; no se mitiga |
| "—" como fecha de ingreso en el perfil | Documentado; ese campo ya es un string literal de mock |

## Lo que **no** entra en este spec

- Edición de niños (`/add-child` sigue siendo ruta muerta).
- Persistencia de cualquier tipo.
- Foto o avatar del niño, salas adicionales, vinculación de padres desde el modal.
- Badges múltiples de alergia y validaciones de edad mínima/máxima.

Cada una de esas, si llega, va en su propio spec.
