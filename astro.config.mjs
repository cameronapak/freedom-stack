import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import { em, entity, text, number, date } from "bknd/data";
import { randomString } from "bknd/utils";

import { addBknd } from "./src/integrations/bknd";

const schema = em(
  {
    posts: entity("posts", {
      // "id" is automatically added
      title: text().required(),
      slug: text().required(),
      publishDate: date().required(),
      content: text(),
      views: number()
    }),
    comments: entity("comments", {
      content: text()
    })

    // relations and indices are defined separately.
    // the first argument are the helper functions, the second the entities.
  },
  ({ relation, index }, { posts, comments }) => {
    relation(comments).manyToOne(posts);
    // relation as well as index can be chained!
    index(posts).on(["title"]).on(["slug"], true);
  }
);

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
