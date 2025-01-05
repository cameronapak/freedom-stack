import { serve } from "bknd/adapter/astro";

export const prerender = false;

export const ALL = serve({
  connection: {
    type: "libsql",
    config: {
      // location of your local Astro DB
      // make sure to use a remote URL in production
      url: "file:.astro/content.db"
    }
  }
});
