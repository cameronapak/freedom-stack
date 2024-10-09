import { db, Posts } from "astro:db";

const content = `
## This is the first post of my new Astro blog.

Never gonna give you up, never gonna let you down.
Never gonna run around and desert you.
Never gonna make you cry, never gonna say goodbye.
Never gonna tell a lie and hurt you.
Never gonna hold you back, never gonna lose your grip.
Never gonna give you up, never gonna let you down.
Never gonna run around and desert you.
Never gonna make you cry, never gonna say goodbye.
Never gonna tell a lie and hurt you.
`.trim();

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Posts).values([
    {
      id: 1,
      title: "My First Blog Post",
      pubDate: new Date("2022-07-01"),
      description: "This is the first post of my new Astro blog.",
      author: "Astro Learner",
      imageUrl: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg",
      imageAlt: "The Astro logo with the word One.",
      tags: JSON.stringify(["astro", "blogging", "learning in public"]),
      slug: "my-first-blog-post",
      content
    }
  ]);
}
