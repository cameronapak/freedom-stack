import type { APIRoute } from "astro";
import { db, desc, Posts } from "astro:db";

const PATHS_TO_EXCLUDE = ["/api", "/dashboard", "/sitemap.xml"];

export const GET: APIRoute = async ({ url }) => {
  // Get all published posts
  const allPosts = await db.select().from(Posts).orderBy(desc(Posts.pubDate));

  // Get all static routes from the pages directory
  const pages = import.meta.glob("/src/pages/**/!(*.ts|*.js|*.mdx)");
  const staticPaths = Object.keys(pages)
    .map((path) =>
      path
        .replace("/src/pages", "")
        .replace(/\.astro$/, "")
        .replace(/\/index$/, "/")
    )
    .filter(
      (path) =>
        path !== "/" && // Exclude home page (already included)
        !path.includes("[") && // Exclude dynamic routes
        !PATHS_TO_EXCLUDE.some((excludePath) => path.startsWith(excludePath)) // Use PATHS_TO_EXCLUDE
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${url.origin}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${staticPaths
        .map(
          (path) => `
        <url>
          <loc>${url.origin}${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
      ${allPosts
        .map(
          (post) => `
        <url>
          <loc>${url.origin}/posts/${post.slug}</loc>
          <lastmod>${post.pubDate.toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
      "Content-Length": sitemap.length.toString()
    }
  });
};
