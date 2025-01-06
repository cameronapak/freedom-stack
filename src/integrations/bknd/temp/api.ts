// Generated API route for bknd adapter
import { serve } from "bknd/adapter/astro";
export const prerender = false;
export const ALL = serve(
{
  "connection": {
    "type": "libsql",
    "config": {
      "url": "file:.astro/content.db"
    }
  }
}
);
