import type { AstroIntegration } from "astro";
import { App, getDefaultConfig, type CreateAppConfig, type ModuleConfigs } from "bknd";
import { setInitialConfig } from "./state";

interface BkndIntegrationOptions extends CreateAppConfig {
  adminRoute?: string;
  debug?: boolean;
}

/**
 * Creates an Astro integration for BKND
 * @param options - Configuration options for BKND integration
 * @returns AstroIntegration
 */
export function addBknd(options: BkndIntegrationOptions): AstroIntegration {
  const { adminRoute = "/admin", debug = false, ...appConfig } = options;

  const config = getDefaultConfig();
  const initialConfig: { version: number } & ModuleConfigs = {
    version: 7,
    ...config,
    auth: {
      ...config.auth,
      enabled: true
    },
    server: {
      ...config.server,
      admin: {
        ...config.server.admin,
        basepath: "/admin"
      }
    }
  };

  // Set the initial config before returning the integration
  setInitialConfig(initialConfig);

  return {
    name: "bknd-integration",
    hooks: {
      "astro:server:setup": async ({ logger }) => {
        try {
          if (debug) {
            logger.info(`BKND: Initializing with config: ${JSON.stringify(initialConfig, null, 2)}`);
          }

          const app = App.create({
            ...appConfig,
            initialConfig
          });

          await app
            .build({
              sync: true,
              save: true
            })
            .catch((error) => {
              logger.error("BKND: Failed to build app");
              throw error;
            });

          if (debug) {
            logger.info("BKND: Successfully initialized");
          }

          logger.info(`Equipped with BKND.io 🚀`);
        } catch (error) {
          logger.error("BKND: Integration setup failed");
          if (error instanceof Error) {
            logger.error(error.message);
          }
          throw error;
        }
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

          injectRoute({
            pattern: "/api/[...api]",
            entrypoint: "./src/integrations/bknd/api.ts",
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
