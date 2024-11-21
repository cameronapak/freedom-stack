/// <reference types="astro/client" />
/// <reference types="@clerk/astro/dist/types" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />

import * as htmx from "htmx.org";
import type { Auth, UserResource } from "@clerk/types";

declare global {
  interface Window {
    Alpine: import("alpinejs").Alpine;
    htmx: typeof htmx;
  }

  namespace App {
    interface Locals {
      auth: () => Auth;
      currentUser: () => Promise<UserResource | null>;
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
  /** https://clerk.com/docs/deployments/clerk-environment-variables#clerk-environment-variables */
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  /** https://clerk.com/docs/deployments/clerk-environment-variables#clerk-environment-variables */
  readonly CLERK_SECRET_KEY: string;
  /** https://better-auth.com/ */
  readonly BETTER_AUTH_URL: string;
  /** https://better-auth.com/ */
  readonly BETTER_AUTH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
