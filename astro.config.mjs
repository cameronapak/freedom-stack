import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import { randomString } from "bknd/utils";

import { schema } from "./src/lib/bknd";
import { addBknd } from "./src/integrations/bknd";

const bkndConfig = {
  adminRoute: "/admin",
  connection: {
    type: "libsql",
    config: {
      // location of your local Astro DB
      // make sure to use a remote URL in production
      url: "file:.astro/content.db"
    }
  },
  initialConfig: {
    auth: {
      enabled: true,
      jwt: {
        secret: randomString(64)
      }
    },
    data: schema.toJSON()
  },
  options: {
    seed: async (ctx) => {
      await ctx.em.mutator("posts").insertMany([
        { title: "First post", slug: "first-post", content: "...", publishDate: new Date() },
        { title: "Second post", slug: "second-post", content: "...", publishDate: new Date() }
      ]);
    }
  }
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), addBknd(bkndConfig)],
  output: "server",
  adapter: netlify()
});
