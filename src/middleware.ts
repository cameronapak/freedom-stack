import { createAuthMiddleware } from "@/integrations/better-auth";

export const onRequest = createAuthMiddleware({
  protectedRoutes: ["/dashboard"],
  onAuthFailure: () => {
    console.log("Authentication failed");
  }
});
