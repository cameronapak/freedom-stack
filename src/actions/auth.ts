// src/pages/auth.astro
import { createAuthActions } from "@/integrations/better-auth";

export const { signIn, signUp, signOut } = createAuthActions();
