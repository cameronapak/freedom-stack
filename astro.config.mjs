import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";
import react from "@astrojs/react";

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
    })
  ],
  vite: {
    optimizeDeps: {
      exclude: ["astro:db"],
      include: ["lodash-es"]
    },
    resolve: {
      dedupe: ["react", "react-dom"]
    },
    ssr: {
      external: ["react", "react-dom"],
      noExternal: ["bknd", "lodash-es"]
    }
  },
  output: "server",
  adapter: netlify(),
  experimental: {
    serverIslands: true
  }
});
