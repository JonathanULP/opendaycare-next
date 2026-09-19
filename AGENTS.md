<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# open-daycare

App de guardería/app con Next.js **16.3.5** (App Router, sin `src/`), React 19, TypeScript y Tailwind v4. No hay tests ni setup de CI.

## Comandos

- Dev: `npm run dev` (arranca en http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint` (= `eslint`, flat config `eslint.config.mjs`)
- Typecheck: no hay script; usar `npx tsc --noEmit`

## Arquitectura

- Rutas en `app/` (raíz del repo, no `src/`). El alias `@/*` apunta a la raíz del repo.
- Tailwind v4 vía `@import "tailwindcss"` en `app/globals.css`; sin `tailwind.config` (la v4 no lo usa).
- `.env*` está en `.gitignore`: los secretos no se commitean.

## Reglas de código

- Seguir buenas prácticas: código limpio, legible y consistente en todo el proyecto.
- Todo el código se escribe en **inglés**: nombres de variables, funciones, componentes, tipos, props, archivos y carpetas, valores de tipos de dominio (ej. `PostKind = "achievement" | "activity" | "announcement"`).
- El texto visible por el usuario final (labels, mensajes, copy) va en **español**, fiel a los mockups de `references/pantallas/`.
- Comentarios y commits en inglés.
- Nombres descriptivos: booleans con prefijo `is`/`has` (ej. `isActive`), funciones con verbos (ej. `handleToggleSidebar`).
- Componentes: PascalCase; archivos que no son componentes: camelCase.

## Diseño (referencias de UI)

- `references/pantallas/*.dc.html` son los mockups HTML de cada pantalla del producto (login, feed, ninos, avisos, crear-publicacion, vincular-padre, etc.).
- `references/screenshots/` contiene capturas de referencia.
- Consultar estas referencias antes de construir o modificar cualquier UI; son la fuente de verdad del diseño.

## Flujo de trabajo con specs

- Skills locales en `.agents/skills/` (spec-driven):
  - `/spec <descripción>` — diseña un spec y lo guarda en `specs/NN-slug.md` (nunca escribe código).
  - `/spec-impl <NN-slug>` — implementa un spec aprobado en una rama `spec-NN-slug`, con pausas para revisar diffs.
- Convenir use para features grandes, antes de escribir código.
- `specs/` aún no existe; el primer spec será `01-`. La creación de ramas la controla `AutoCreateBranch` en `specs/.spec-config.yml` (default: `true`).

## MCP

- **Playwright**: Todo lo generado por Playwright (screenshots, snapshots, logs de consola, etc.) debe guardarse y manejarse dentro de la carpeta `.playwright-mcp`.
- **Context7**: Usar el servidor Context7 para obtener la documentación actualizada de cada lenguaje y framework que se utilice en el proyecto (React, Next.js, TypeScript, Tailwind, etc.), asegurando siempre el uso de las APIs y convenciones vigentes.