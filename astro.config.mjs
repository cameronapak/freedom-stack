import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import htmx from "astro-htmx";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs(), htmx(), sentry()],
  output: "server",
  adapter: netlify()
});