/// <reference types="astro/client" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />

import * as htmx from "htmx.org";
import type { User as BetterAuthUser, Session as BetterAuthSession } from "better-auth";
import type { User as ClerkUser } from "@clerk/backend";

declare global {
  interface Window {
    Alpine: import("alpinejs").Alpine;
    htmx: typeof htmx;
  }

  namespace App {
    interface Locals {
      user: BetterAuthUser | ClerkUser | null;
      session: BetterAuthSession | null;
    }
  }
}

// Environment variables interface
interface ImportMetaEnv {
  /** Database configuration */
  readonly ASTRO_DB_REMOTE_URL: string;
  readonly ASTRO_DB_APP_TOKEN: string;

  /** Better Auth configuration */
  readonly BETTER_AUTH_URL: string;
  readonly BETTER_AUTH_SECRET: string;

  /** Clerk configuration (optional) */
  readonly CLERK_SECRET_KEY?: string;
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
