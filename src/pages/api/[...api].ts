import type { ModuleBuildContext } from "bknd";
import { serve } from "bknd/adapter/astro";
import { em, entity, text, number } from "bknd/data";
import { randomString } from "bknd/utils";

const schema = em(
  {
    posts: entity("posts", {
      // "id" is automatically added
      title: text().required(),
      slug: text().required(),
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

export const ALL = serve({
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
    seed: async (ctx: ModuleBuildContext) => {
      await ctx.em.mutator("posts").insertMany([
        { title: "First post", slug: "first-post", content: "..." },
        { title: "Second post", slug: "second-post", content: "..." }
      ]);
    }
  }
});
