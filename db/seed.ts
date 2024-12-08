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

const shrekContent = `
<h1>A Story of Layers</h1>

<p>
Just like onions, this blog post has layers. Shrek taught us that true beauty lies within,
and that the best stories often come from the most unexpected places - like a swamp.
</p>
<p></p>
<p>
Some people judge a book by its cover, but as our favorite ogre would say, "Better out than in!"
This post celebrates the wisdom, humor, and heart that made Shrek a beloved character for generations.
</p>
<p></p>
<p>
Remember: Ogres are like onions. They have layers. Onions have layers.
</p>
`.trim();

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Posts).values([
    {
      id: 1,
      title: "My First Blog Post",
      pubDate: new Date("2022-07-01"),
      description: "This is the first post of my new Astro blog.",
      author: "email@example.com",
      imageUrl: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg",
      imageAlt: "The Astro logo with the word One.",
      tags: JSON.stringify(["astro", "blogging", "learning in public"]),
      slug: "my-first-blog-post",
      content
    },
    {
      id: 2,
      title: "Shrek: Lessons from an Ogre",
      pubDate: new Date("2022-07-15"),
      description: "Exploring the wisdom and layers of everyone's favorite ogre.",
      author: "cameronandrewpak@gmail.com",
      imageUrl: "https://example.com/shrek-image.jpg", // Replace with actual Shrek image URL
      imageAlt: "Shrek standing proudly in his swamp",
      tags: JSON.stringify(["shrek", "movies", "life lessons", "animation"]),
      slug: "shrek-lessons-from-an-ogre",
      content: shrekContent
    }
  ]);
}
