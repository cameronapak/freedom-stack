import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";
import react from "@astrojs/react";
import { addBknd } from "./src/integrations/bknd";
import { loadEnv } from "vite";

const { ASTRO_DB_REMOTE_URL, ASTRO_DB_APP_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    tailwind(),
    alpinejs({
      entrypoint: "/src/entrypoint"
    }),
    react({
      experimentalReactChildren: true
    }),
    addBknd({
      connection: {
        type: "libsql",
        config: {
          url: ASTRO_DB_REMOTE_URL,
          authToken: ASTRO_DB_APP_TOKEN
        }
      }
    })
  ],
  vite: {
    optimizeDeps: {
      exclude: ["astro:db"]
    }
  },
  output: "server",
  adapter: netlify(),
  experimental: {
    serverIslands: true
  }
});
