// src/pages/auth.astro
import { createAuthActions } from "@/integrations/better-auth";
import { setAuthCookiesFromResponse } from "@/integrations/better-auth/actions";

export const auth = await createAuthActions();

export { setAuthCookiesFromResponse };
