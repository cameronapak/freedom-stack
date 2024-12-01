import { serve } from "bknd/adapter/astro";

export const prerender = false;

export const ALL = serve({
  connection: {
    type: "libsql",
    config: {
      url: import.meta.env.ASTRO_DB_REMOTE_URL,
      authToken: import.meta.env.ASTRO_DB_APP_TOKEN
    }
  }
});
