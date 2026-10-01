# SPEC 06 — Modal de vincular padre

> **Estado:** Implementado
> **Depende de:** SPEC 02, SPEC 03, SPEC 04
> **Fecha:** 2026-10-01
> **Objetivo:** Convertir "Vincular otro padre" de `/kids/[id]` en un modal fiel a `vincular-padre.dc.html`, con validación real del email y un panel de confirmación tras enviar la invitación.

## Alcance

**Incluye:**

- `components/LinkParentModal.tsx` (client) que reemplaza al enlace "Vincular otro padre" de `/kids/[id]`: mantiene el aspecto actual (círculo punteado + texto) pero abre un `<dialog>` con el contenido del mockup, igual que `AddKidModal` con `agregar-nino.dc.html`.
- Panel del modal (`max-width: 480px`, fondo `#FBF4EC`, borde `1px #ECE0D0`, radio 24px, sombra `0 20px 50px -24px rgba(63,54,46,.35)`, `w-[calc(100vw-32px)]` en mobile) con `className="dc-modal"` y el `::backdrop` que ya existe en `app/globals.css:71`.
- Header del panel (`padding: 20px 26px`, borde inferior `#ECE0D0`): bloque con título "Vincular padre" (Fredoka 600 18px) y subtítulo "a {kid.name}" (13px `#A89A8B`), y botón de cierre de 34×34 (`#F0E6D8`, ícono `x` 18px `#94887B`).
- Banner informativo azul (`#E3ECFB`, radio 14px, ícono `info` `#4E72C8`, texto 13.5px `#3F5694`): "Le enviaremos un correo con un código para que activate su cuenta. Solo verá el feed de {primer nombre}."
- Campos NOMBRE DEL PADRE/MADRE y EMAIL (asterisco, placeholders "Ej. Diego Fernández" y "correo@ejemplo.com", `type="email"`, borde `1.5px #EADFD0`, fondo blanco, 15px, radio 14px) y el grupo PARENTESCO.
- Chips Mamá / Papá / Tutor/a como grupo de radios real, con "Mamá" seleccionado al abrir y el estilo del mockup (`#9FB8EC` / `#CCD8F4` / `#4E72C8` activo; `#ECE0D0` / `#FFFDF9` / `#6E6359` inactivo).
- Bloque CÓDIGO DE INVITACIÓN (`#FBF1D6`, borde punteado `1.5px #E6D08A`) con `invitation.code` (`7K4P9`) en Fredoka 600 34px `letter-spacing: 7px` y el texto "Vence en 7 días".
- Validación en línea con el patrón de SPEC 04 (asterisco, borde `#D9583C`, un mensaje por campo, `aria-invalid`, `aria-describedby`, el error desaparece al corregir) y chequeo real del email con `EMAIL_PATTERN`.
- CTA "Enviar invitación" (gradiente `#F4977E` → `#EE8164`, ícono `send`) que, con los datos válidos, reemplaza el formulario por un panel de confirmación con check verde, el email tipeado, el código y el botón "Listo" que cierra el modal.
- `components/FormField.tsx`: extracción de `Field`, `controlClass` y `borderClass` desde `AddKidModal.tsx`, que pasa a importarlos sin cambio visual.
- `components/icons.tsx`: íconos `x`, `send` e `info`.
- `lib/kids.ts`: helper `getKidFirstName`.
- `data/mock.ts`: `PARENT_RELATIONSHIPS` y `ParentRelationship`.

**Excluido (specs futuras):**

- Ruta `/link-parent` o `/kids/[id]/link-parent`: no se crea ninguna página y ninguna pantalla enlaza a `/link-parent`.
- Agregar el padre a `Kid.parents`: el perfil, su contador y `/kids` quedan igual después de enviar.
- Persistencia: la invitación se pierde al cerrar o recargar.
- Envío real de correo, estado de carga, errores de red y reintentos.
- Modificar o quitar padres, reenvío, copiar o regenerar el código, detectar un email ya vinculado.
- Abrir el modal desde el badge VINCULAR de la tarjeta en `/kids`.
- Cualquier campo de contraseña: el mockup no tiene ninguno.

## Modelo de datos

```ts
// data/mock.ts
export const PARENT_RELATIONSHIPS = ["Mamá", "Papá", "Tutor/a"] as const;

export type ParentRelationship = (typeof PARENT_RELATIONSHIPS)[number];
```

`KidParent.role` sigue siendo `string` y recibe el label literal; los 8 niños y sus 12 padres no se tocan. El código se lee de `invitation.code` (SPEC 03), sin estructura nueva.

```ts
// components/LinkParentModal.tsx
export interface NewParentDraft {
  fullName: string;                 // "Diego Fernández"
  email: string;                    // "diego.fernandez@gmail.com"
  relationship: ParentRelationship; // "Papá"
}

interface LinkParentModalProps {
  kidName: string;        // "Mateo Fernández"
  invitationCode: string; // invitation.code
}
```

```ts
// lib/kids.ts
export function getKidFirstName(fullName: string): string;  // "Mateo Fernández" → "Mateo"
```

```ts
// components/LinkParentModal.tsx — constante local del módulo
const EMAIL_PATTERN = /^[^\s@]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
```

Estado interno: `draft`, `errors: Partial<Record<keyof NewParentDraft, string>>` y `status: "idle" | "sent"`. `relationship` se inicializa con `PARENT_RELATIONSHIPS[0]`, así que nunca falla la validación.

`Field` en `components/FormField.tsx` mantiene su contrato actual (`label`, `fieldId`, `htmlFor`, `isRequired`, `error`, `className`, `children`); `controlClass` y `borderClass(hasError)` se mueven tal cual desde `AddKidModal.tsx`.

## Plan de implementación

1. `components/icons.tsx`: agregar `x`, `send` e `info` a `IconName` e `iconPaths`. Verificar con `npx tsc --noEmit`.
2. `components/FormField.tsx`: mover `Field`, `controlClass` y `borderClass` desde `AddKidModal.tsx`; dejar el modal importándolos. Comparar `/kids` contra `agregar-nino.dc.html` para confirmar que no cambia nada.
3. `lib/kids.ts`: agregar `getKidFirstName`. Verificar con `npx tsc --noEmit`.
4. `data/mock.ts`: agregar `PARENT_RELATIONSHIPS` y `ParentRelationship`, sin tocar los niños existentes.
5. `components/LinkParentModal.tsx` (client): `<button>` disparador con el aspecto actual, `<dialog>`, `showModal()`/`close()`, foco en el campo nombre al abrir, bloqueo de scroll, validación con `EMAIL_PATTERN`, chips, bloque del código, CTA y panel de confirmación con `aria-live="polite"` y foco en "Listo".
6. `app/kids/[id]/page.tsx`: reemplazar el `<Link href="/link-parent">` por `<LinkParentModal kidName={kid.name} invitationCode={invitation.code} />`. La página sigue siendo server component con `notFound()`.
7. Verificación: `npx tsc --noEmit`, `npm run lint`, `npm run build` y comparación visual con Playwright (1440×900 y 390×844) contra `vincular-padre.dc.html`, con capturas en `.playwright-mcp/`.

## Criterios de aceptación

- [ ] En `/kids/mateo-fernandez`, "Vincular otro padre" se ve igual que antes (círculo punteado de 40px `#D8CBBA`, texto `#C5503A`) y abre un modal en lugar de navegar.
- [ ] El modal mide como máximo 480px, tiene fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px y el overlay `rgba(63,54,46,.45)`.
- [ ] El header muestra "Vincular padre" (Fredoka 600 18px), el subtítulo "a Mateo Fernández" y el botón de cierre de 34×34 con el ícono `x`, que cierra el modal.
- [ ] El banner azul muestra el ícono `info` y el texto "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de Mateo."
- [ ] Los labels son NOMBRE DEL PADRE/MADRE y EMAIL con asterisco, y PARENTESCO sin asterisco; los placeholders son "Ej. Diego Fernández" y "correo@ejemplo.com".
- [ ] "Mamá" está activo al abrir y "Papá" y "Tutor/a" inactivos; al hacer clic queda activo exactamente uno, y las flechas del teclado recorren el grupo.
- [ ] El bloque de código muestra `7K4P9` en Fredoka 600 34px con `letter-spacing: 7px` y "Vence en 7 días".
- [ ] Enviar con nombre vacío muestra "Este campo es obligatorio"; con email vacío "Ingresá el email"; con `a@b`, `correo@`, `@x.com`, `correo @x.com` y `correo@x.c` muestra "Ingresá un email válido"; con `diego.fernandez@gmail.com` no hay error.
- [ ] El error de un campo desaparece al corregirlo y el parentesco nunca produce error.
- [ ] Con errores, el CTA no cambia el estado del modal.
- [ ] Con los datos válidos, el formulario se reemplaza por el panel con check verde, "Invitación enviada", el email tipeado, el código, "Vence en 7 días" y el botón "Listo"; el panel tiene `aria-live="polite"`, recibe el foco y no queda ningún input en el DOM.
- [ ] "Listo", el botón de cierre, Esc y el click en el overlay cierran el modal; al reabrirlo los campos están vacíos y "Mamá" activo.
- [ ] Al enviar, el perfil del niño no cambia: siguen siendo 2 padres vinculados (Lucía ACTIVA + Diego PENDIENTE) y `/kids` no muestra cambios.
- [ ] Ninguna pantalla enlaza a `/link-parent` ni a `/kids/[id]/link-parent`.
- [ ] El modal "Agregar niño" de `/kids` se ve idéntico a antes del refactor, igual que `/notices` y el feed.
- [ ] En 390px el panel ocupa el ancho disponible, su cuerpo scrollea y no hay scroll horizontal.
- [ ] `npx tsc --noEmit`, `npm run lint` y `npm run build` pasan sin errores, sin errores de consola ni de hidratación, y `app/globals.css` queda sin modificar.

## Decisiones

- **Sí:** modal en lugar de página nueva, pedido explícito del usuario; se conserva el look de `vincular-padre.dc.html` dentro de un `<dialog>`, igual que SPEC 04 con `agregar-nino.dc.html`.
- **No:** ruta `/link-parent` ni `/kids/[id]/link-parent`. El disparador vive dentro de `LinkParentModal`, así que `/kids/[id]` sigue siendo server component y conserva su `notFound()`.
- **Sí:** regex pragmática en el componente en vez de confiar en `type="email"` del navegador, que acepta `a@b` y no exige dominio con punto.
- **No:** campo de contraseña (el mockup no tiene ninguno); la aclaración del usuario fue un error de tipeo.
- **Sí:** panel de confirmación dentro del modal con botón "Listo"; si se cerrara sin más, el usuario no vería confirmación y el perfil queda igual.
- **Sí:** "Mamá" preseleccionado, así que el parentesco nunca genera error.
- **Sí:** reutilizar `invitation.code` como literal; el mockup no muestra acciones sobre el código.
- **Sí:** `role: string` con el label literal, sin `ParentRole`, para no editar los 12 padres de los 8 niños.
- **Sí:** extraer `Field` a `components/FormField.tsx` en lugar de duplicarlo.
- **Sí:** banner y chips con hex inline, como ya hace `/kids/[id]/page.tsx`; no se agrega ningún token nuevo a `globals.css`.
- **No:** agregar el padre al perfil, persistencia, envío real de correo, estado de carga, detección de duplicados y abrir el modal desde el badge VINCULAR.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| El refactor de `AddKidModal` rompe el modal de SPEC 04 | Se extrae sin cambios semánticos y se compara contra `agregar-nino.dc.html` en el paso 2 |
| El mockup es una página y ahora vive en un overlay | Se conserva cada valor del mockup; solo cambia el fondo exterior, que pasa a `::backdrop`, y se verifica con captura |
| El disparador necesita ser client dentro de una página server | El `<button>` y el `<dialog>` viven en `LinkParentModal`, y `app/kids/[id]/page.tsx` solo lo monta |
| El modal es más alto que el viewport en mobile | Cuerpo con `overflow-y-auto` y `max-h-[90vh]`, igual que `AddKidModal` |
| La validación de email es una heurística, no RFC 5322 | Se documenta el criterio exacto (dominio con punto y TLD de 2+ letras) en el criterio de aceptación |

## Lo que **no** entra en este spec

- La ruta `/link-parent` y cualquier página nueva.
- Agregar el padre vinculado a `Kid.parents` y reflejarlo en `/kids/[id]` y `/kids`.
- Persistencia, envío real de correo, estado de carga y errores de red.
- Modificar o quitar padres, copiar o regenerar el código, detección de duplicados.
- Abrir el modal desde el badge VINCULAR de `/kids`.

Cada una de esas, si llega, va en su propio spec.
