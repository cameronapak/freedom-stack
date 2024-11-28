import type { AstroIntegration } from "astro";
import type { BetterAuthConfig } from "./types.ts";

export default function betterAuthIntegration(config: BetterAuthConfig): AstroIntegration {
  return {
    name: "better-auth",
    hooks: {
      "astro:config:setup": ({ updateConfig, injectRoute, injectScript }) => {
        // Inject virtual module imports at runtime
        injectScript(
          "page-ssr",
          `
          import "astro:db";
          import "astro:actions";
          import "astro:schema";
          import "astro:middleware";
          `
        );

        // Inject the auth API route
        injectRoute({
          pattern: "/api/auth/[...all]",
          entrypoint: "./src/integrations/better-auth/api-route.ts"
        });

        // Add Vite config for better-auth
        updateConfig({
          vite: {
            optimizeDeps: {
              include: ["better-auth", "better-auth/client"]
            }
          }
        });
      }
    }
  };
}

// Re-export core functionality
export * from "./core.ts";
export * from "./middleware.ts";
export * from "./types.ts";
export * from "./actions.ts";
