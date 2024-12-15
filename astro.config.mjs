import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";
import betterAuth from "./src/integrations/better-auth";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    betterAuth({
      baseURL: import.meta.env.BETTER_AUTH_URL,
      secret: import.meta.env.BETTER_AUTH_SECRET,
      account: {
        accountLinking: {
          enabled: true
        }
      },
      emailAndPassword: {
        enabled: true
      },
      session: {
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60 // Cache duration in seconds
        }
      }
    }),
    tailwind(),
    alpinejs({
      entrypoint: "/src/entrypoint"
    })
  ],
  output: "server",
  adapter: netlify()
});
