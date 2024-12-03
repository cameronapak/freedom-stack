import { serve } from "bknd/adapter/astro";
import type { CreateAppConfig } from "bknd";
import { getInitialConfig } from "./state";

const createAppConfig: CreateAppConfig = {
  connection: {
    type: "libsql",
    config: {
      url: import.meta.env.ASTRO_DB_REMOTE_URL,
      authToken: import.meta.env.ASTRO_DB_APP_TOKEN
    }
  },
  initialConfig: getInitialConfig()
};

export const prerender = false;

export const ALL = serve(createAppConfig);
