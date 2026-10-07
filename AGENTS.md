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

## Supabase

- Backend/BD: Supabase (proyecto remoto, `project_ref = jgkydsurtawvoikdlveh`). Todavía no hay dependencia de `supabase-js` ni carpeta `supabase/` en el repo.
- `.env` contiene `SUPABASE_DB_PASSWORD` (está en `.gitignore`: no se commitea).
- Referencia de esquema de BD: la carpeta `../07-DB-Schema` (expuesta como `references.docs` en `opencode.json`), con tablas, columnas y relaciones planeadas. **No está implementada; es solo referencia.**
- Regla: cargar las skills de Supabase (ver sección Skills) antes de tocar la BD o escribir código contra Supabase. Tras cualquier cambio, verificar con una consulta de prueba o `npx tsc --noEmit`.

## Skills

Skills instaladas en `.agents/skills/` (reflejadas también en `.claude/skills/` y `agent/skills/`), con lock e historial en `skills-lock.json`.

### Spec-driven (fuente: `klerith/fernando-skills`)

- `/spec <descripción>` — diseña un spec y lo guarda en `specs/NN-slug.md` (nunca escribe código).
- `/spec-impl <NN-slug>` — implementa un spec aprobado en una rama `spec-NN-slug`, con pausas para revisar diffs.
- Convenir use para features grandes, antes de escribir código.
- `specs/` aún no existe; el primer spec será `01-`. La creación de ramas la controla `AutoCreateBranch` en `specs/.spec-config.yml` (default: `true`).

### Supabase (fuente: `supabase/agent-skills`)

- **`supabase`** — cargar en cualquier tarea que toque Supabase: DB, Auth, Edge Functions, Realtime, Storage, RLS, `supabase-js`/`@supabase/ssr` en Next.js, CLI/MCP, migraciones, logs. Verifica el changelog y docs actuales antes de implementar (no confiar en datos de entrenamiento), exige verificar el trabajo con una prueba, e incluye checklist de seguridad (auth, RLS, `app_metadata` vs `user_metadata`, exposición de tablas a la Data API).
- **`supabase-postgres-best-practices`** — cargar **antes** de escribir o cambiar cualquier cosa que viva en Postgres: tablas/columnas y tipos, diseño de esquema, migraciones, políticas RLS, índices, triggers, funciones, colas y jobs (pg_cron, pgmq), pgvector, y al diagnosticar queries lentas, CPU alta, timeouts o planes EXPLAIN. Reglas priorizadas por impacto (query → conexiones → seguridad → esquema → locking → …).

## Agentes

Subagentes de opencode definidos en `.opencode/agent/`.

- **`verify-spec`** — verificador de criterios de aceptación del flujo spec-driven (complemento de `/spec` y `/spec-impl`). Lee un spec en `specs/`, verifica cada criterio de su checklist (visual con Playwright contra los mockups de `references/pantallas/`, comportamiento, código estático, `npx tsc --noEmit` + `npm run build` y uso de Next.js contra Context7 y `node_modules/next/dist/docs/`), marca las casillas que pasan, reporta las que fallan y guarda toda la evidencia en `.playwright-mcp/`. **Nunca hace commit ni toca código.**
  - Cómo invocarlo: `@verify-spec @specs/<NN-slug>.md` (acepta también `NN` o `slug`, o ninguna entrada para listar los specs).

## MCP

- **Playwright**: Todo lo generado por Playwright (screenshots, snapshots, logs de consola, etc.) debe guardarse y manejarse dentro de la carpeta `.playwright-mcp`.
- **Context7**: Usar el servidor Context7 para obtener la documentación actualizada de cada lenguaje y framework que se utilice en el proyecto (React, Next.js, TypeScript, Tailwind, etc.), asegurando siempre el uso de las APIs y convenciones vigentes.
- **Supabase**: MCP remoto configurado a nivel global (no en `opencode.json` del repo), apuntando al proyecto `jgkydsurtawvoikdlveh`. Proporciona herramientas para SQL, migraciones, logs, asesores de seguridad/rendimiento, Edge Functions, ramas de desarrollo, generación de tipos TypeScript y búsqueda en docs. Combinar con las skills de Supabase para editores de esquema/RLS/Postgres.