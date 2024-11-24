/// <reference types="astro/client" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />

import * as htmx from "htmx.org";

declare global {
  interface Window {
    Alpine: import("alpinejs").Alpine;
    htmx: typeof htmx;
  }

  namespace App {
    interface Locals {
      user: import("better-auth").User | null;
      session: import("better-auth").Session | null;
    }
  }
}

// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript
interface ImportMetaEnv {
  /** https://docs.astro.build/en/guides/astro-db/#libsql */
  readonly ASTRO_DB_REMOTE_URL: string;
  /** https://docs.astro.build/en/guides/astro-db/#libsql */
  readonly ASTRO_DB_APP_TOKEN: string;
  /** https://better-auth.com/ */
  readonly BETTER_AUTH_URL: string;
  /** https://better-auth.com/ */
  readonly BETTER_AUTH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
