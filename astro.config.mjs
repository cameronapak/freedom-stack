import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    alpinejs({
      entrypoint: "/src/entrypoint"
    })
  ],
  output: "server",
  adapter: netlify()
});
