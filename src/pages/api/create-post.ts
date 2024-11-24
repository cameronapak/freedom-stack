import { db, Posts } from "astro:db";
import type { APIContext } from "astro";
import { purgeCache } from "@netlify/functions";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const formData = await context.request.formData();

    const post = {
      title: formData.get("title") as string,
      pubDate: new Date(formData.get("pubDate") as string),
      description: formData.get("description") as string,
      author: formData.get("author") as string,
      imageUrl: formData.get("imageUrl") as string | null,
      imageAlt: formData.get("imageAlt") as string | null,
      tags: formData.get("tags") ? JSON.parse(formData.get("tags") as string) : null,
      slug: formData.get("slug") as string,
      content: formData.get("content") as string
    };

    // Validate required fields
    if (!post.title || !post.pubDate || !post.description || !post.author || !post.slug || !post.content) {
      return new Response("Missing required fields", { status: 400 });
    }

    await db.insert(Posts).values(post);

    if (import.meta.env.PROD) {
      try {
        await purgeCache({
          tags: ["posts"]
        });
      } catch (error) {
        console.error("Error purging cache:", error);
      }
    }

    return context.redirect("/posts");
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Error creating post", { status: 500 });
  }
}
