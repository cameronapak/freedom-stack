import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { BetterAuthConfig } from "./types";

let auth: ReturnType<typeof betterAuth>;

export async function createAuth(config: BetterAuthConfig) {
  if (auth) {
    return auth;
  }

  const { database, ...restConfig } = config;

  // Dynamically import astro:db at runtime
  const { Account, db, Session, User, Verification } = await import("astro:db");

  auth = betterAuth({
    ...restConfig,
    database: drizzleAdapter(db, {
      schema: database?.schema ?? {
        user: User,
        account: Account,
        session: Session,
        verification: Verification
      },
      provider: database?.provider ?? "sqlite"
    })
  });

  return auth;
}

export function getAuth() {
  if (!auth) {
    throw new Error("Auth is not initialized. Make sure to call createAuth() before using auth functions.");
  }
  return auth;
}
