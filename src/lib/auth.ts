import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const dialect = new LibsqlDialect({
  url: import.meta.env.ASTRO_DB_REMOTE_URL || "",
  authToken: import.meta.env.ASTRO_DB_APP_TOKEN || ""
});

export const auth = betterAuth({
  baseURL: import.meta.env.BETTER_AUTH_URL,
  secret: import.meta.env.BETTER_AUTH_SECRET,
  database: {
    dialect,
    type: "sqlite"
  },
  emailAndPassword: {
    enabled: true
  }
});
