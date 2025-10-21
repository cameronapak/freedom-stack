# Setup commands

- Install deps: `bun install`
- Start dev server: `bun run dev`
- Start dev server (network accessible): `bun run dev:host`
- Run build: `bun run build`
- Preview build: `bun run preview`
- Format code: `bun run format`
- Update packages: `bun run packages:update`
- DB setup: `bun run db:setup`
- DB update: `astro db push --remote`
- Host login: `bun run host:login`
- Host deploy: `bun run host:deploy`

# Dev environment tips

- Always run `bun run check:env` before starting dev server - it validates your environment setup
- Use path aliases: `@/*` for `src/*`, `@sections/*` for `src/components/sections/*`
- For full-stack beginners: Astro components are server-rendered by default, use `client:*` directives sparingly
- Database queries use Drizzle ORM - check `db/config.ts` for schema definitions

# Architecture overview

Astro + TypeScript full-stack framework with HTMX/Alpine.js interactivity.

UI Layer: Astro components, TailwindCSS, DaisyUI, Preline UI, Lucide icons, Trix editor
Interactivity: Alpine.js (with Intersect/Persist/Collapse/Mask plugins), HTMX
Backend: Drizzle ORM on Astro DB (libSQL/Turso), Better Auth for authentication, Netlify for hosting/cache

Key directories: `src/{components,layouts,pages,actions,lib,icons}`, `db/`, `public/`

# Testing instructions

- Unit tests: Write for utility functions in `src/lib/`
- E2E tests: Use Cypress for full user flows
- Run `astro check` before committing to catch TypeScript errors

# Environment variables

Required:

- `ASTRO_DB_REMOTE_URL` - LibSQL connection URL (added by `bun run db:setup`)
- `ASTRO_DB_APP_TOKEN` - LibSQL auth token (added by `bun run db:setup`)
- `BETTER_AUTH_SECRET` - Auto-generated during setup
- `BETTER_AUTH_URL` - Set to `http://localhost:4321` for development

Optional (for email):

- `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_AUTH_USER`, `MAIL_AUTH_PASS`, `MAIL_FROM`

# Code style

- Strict TypeScript with `astro/tsconfigs/strict`
- 2-space indentation, no trailing comma, 120-character lines
- Use Astro parser for `.astro` files
- Utility-first CSS: Tailwind/DaisyUI only (never `@apply`)
- Include path/filename as first comment in all files
- Conventional commits: `type(scope): description`
