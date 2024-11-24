import { betterAuth } from "better-auth";
import { Account, db, Session, User, Verification } from "astro:db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  secret: import.meta.env.BETTER_AUTH_SECRET,
  account: {
    accountLinking: {
      enabled: true
    }
  },
  database: drizzleAdapter(db, {
    schema: {
      user: User,
      account: Account,
      session: Session,
      verification: Verification
    },
    provider: "sqlite"
  }),
  emailAndPassword: {
    enabled: true
  },
  // https://www.better-auth.com/docs/concepts/session-management#session-caching
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  }
});
