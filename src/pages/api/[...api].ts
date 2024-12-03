import { serve } from "bknd/adapter/astro";
import { type ModuleConfigs, type CreateAppConfig, getDefaultConfig } from "bknd";

const config = getDefaultConfig();
const initialConfig: { version: number } & ModuleConfigs = {
  version: 7, // just the latest version, configs get auto migrated
  // config goes here. You can either use the default config and extend it,
  // or just inspect the "__bknd" table (check for entries of "type" = "config")
  ...config,
  auth: {
    ...config.auth,
    enabled: true
  }
};

const createAppConfig: CreateAppConfig = {
  connection: {
    type: "libsql",
    config: {
      url: import.meta.env.ASTRO_DB_REMOTE_URL,
      authToken: import.meta.env.ASTRO_DB_APP_TOKEN
    }
  },
  initialConfig
};

console.log(JSON.stringify(createAppConfig, null, 2));

export const prerender = false;

export const ALL = serve(createAppConfig);
