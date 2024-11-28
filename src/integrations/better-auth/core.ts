import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Account, db, Session, User, Verification } from "astro:db";
import type { BetterAuthConfig } from "./types";

let auth: ReturnType<typeof betterAuth>;

export function createAuth(config: BetterAuthConfig) {
  if (auth) return auth;

  const { database, ...restConfig } = config;

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
