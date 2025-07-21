// https://www.better-auth.com/docs/integrations/astro
import { createAuthClient } from "better-auth/client";

export const client = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL
});
