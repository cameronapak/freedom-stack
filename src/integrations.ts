import type { AstroIntegration } from "astro";

async function cpPkg(sourceDir: string, destDir: string) {
  const fs = await import("fs");
  const path = await import("path");

  const sourcePath = path.resolve(sourceDir);
  const destinationPath = path.resolve(destDir);

  // Ensure the public directory exists
  if (!fs.existsSync(path.dirname(destinationPath))) {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  }

  // Copy entire directory from node_modules to public directory
  fs.cpSync(sourcePath, destinationPath, { recursive: true });

  // Log the successful copy
  console.log(`${sourcePath} has been copied to the public folder.`);
}

// Self-host TinyMCE so that it's allowed to be on the free-tier.
export function copyTinymceToPublic(): AstroIntegration {
  return {
    name: "copy-tinymce-to-public",
    hooks: {
      "astro:config:setup": async () => {
        await cpPkg("./node_modules/tinymce/", "./public/tinymce/");
      },
      "astro:build:setup": async () => {
        await cpPkg("./node_modules/tinymce/", "./public/tinymce/");
      }
    }
  };
}
