import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    alpinejs({
      entrypoint: "/src/entrypoint"
    })
  ],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});
