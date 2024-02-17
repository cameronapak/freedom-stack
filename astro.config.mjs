import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import htmx from "astro-htmx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), alpinejs(), htmx()]
});
