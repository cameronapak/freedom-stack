import { em, entity, text, date, number } from "bknd/data";

export const schema = em(
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

export type Schema = typeof schema;

type Database = (typeof schema)["DB"];
declare module "bknd/core" {
  interface DB extends Database {}
}
