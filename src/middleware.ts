import { createAuthMiddleware } from "@/integrations/better-auth";

export const onRequest = await createAuthMiddleware({
  protectedRoutes: ["/dashboard"],
  onAuthFailure: () => {
    console.log("Authentication failed");
  }
});
