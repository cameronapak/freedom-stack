import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import htmx from "astro-htmx";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";

const SENTRY_DSN = import.meta.env.SENTRY_DSN;
const SENTRY_AUTH_TOKEN = import.meta.env.SENTRY_AUTH_TOKEN;
const SENTRY_PROJECT = import.meta.env.SENTRY_PROJECT;

const integrations = [
  tailwind(),
  // This entrypoint file is where Alpine plugins are registered.
  alpinejs({ entrypoint: '/src/entrypoint' }),
  htmx(),
]

// To enable Sentry monitoring, add the following environment variables.
// Learn more at https://docs.sentry.io/platforms/javascript/guides/astro/#prerequisites.
if (SENTRY_DSN && SENTRY_AUTH_TOKEN && SENTRY_PROJECT) {
  integrations.push(sentry({
    dsn: SENTRY_DSN,
    auth: SENTRY_AUTH_TOKEN,
    project: SENTRY_PROJECT
  }));
}

// https://astro.build/config
export default defineConfig({
  integrations,
  output: "server",
  adapter: netlify()
});