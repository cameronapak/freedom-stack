import type { BetterAuthOptions } from "better-auth";
import type { User, Session } from "astro:db";

export interface BetterAuthConfig extends Omit<BetterAuthOptions, "database"> {
  /**
   * Optional configuration for database adapter
   * If not provided, will use default Astro DB schema
   */
  database?: {
    schema?: {
      user?: any;
      account?: any;
      session?: any;
      verification?: any;
    };
    provider?: "sqlite" | "pg" | "mysql";
  };
}

declare module "astro" {
  interface Locals {
    user: import("better-auth").User | null;
    session: import("better-auth").Session | null;
  }
}

export type { User, Session };
