import type { AstroIntegration } from "astro";
import { type CreateAppConfig } from "bknd";
import path from "path";
import fs from "fs";

interface BkndIntegrationOptions extends CreateAppConfig {
  adminRoute?: string;
  debug?: boolean;
}

function generateApiFileContent(config: CreateAppConfig): string {
  return `// Generated API route for bknd adapter
import { serve } from "bknd/adapter/astro";

export const prerender = false;

export const ALL = serve(
${JSON.stringify(config, null, 2)}
);
`;
}

/**
 * Creates an Astro integration for BKND
 * @param options - Configuration options for BKND integration
 * @returns AstroIntegration
 */
export function addBknd(options: BkndIntegrationOptions): AstroIntegration {
  const { adminRoute = "/admin", debug = false, connection } = options;

  return {
    name: "bknd-integration",
    hooks: {
      "astro:server:start": async ({ logger }) => {
        logger.info("Equipped with BKND.io 🚀");
      },
      "astro:config:setup": async ({ injectRoute, logger }) => {
        try {
          // Sanitize admin route
          const sanitizedRoute = adminRoute.startsWith("/") ? adminRoute.slice(1) : adminRoute;

          injectRoute({
            pattern: `${sanitizedRoute}/[...admin]`,
            entrypoint: "./src/integrations/bknd/admin.astro",
            prerender: false
          });

          // Create a temp file for api.ts here.
          // Create the directory if it doesn't exist
          const tempDir = path.join(process.cwd(), "src/integrations/bknd/temp");
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
          }
          const apiFile = path.join(tempDir, "api.ts");
          fs.writeFileSync(
            apiFile,
            generateApiFileContent({
              connection
            })
          );

          injectRoute({
            pattern: "/api/[...api]",
            entrypoint: apiFile,
            prerender: false
          });

          if (debug) {
            logger.info(`BKND: Admin route injected at /${sanitizedRoute}`);
          }
        } catch (error) {
          logger.error("BKND: Failed to inject admin routes");
          if (error instanceof Error) {
            logger.error(error.message);
          }
          throw error;
        }
      }
    }
  };
}

// Export additional types for external use
export type { BkndIntegrationOptions };
