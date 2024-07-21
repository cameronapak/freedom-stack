import type { AstroIntegration } from "astro";

// Self-host TinyMCE so that it's allowed to be on the free-tier.
export function copyTinymceToPublic(): AstroIntegration {
    return {
        name: "copy-tinymce-to-public",
        hooks: {
            "astro:build:setup": async ({ updateConfig }) => {
                const fs = await import('fs');
                const path = await import('path');

                // Define the source and destination paths
                const sourcePath = path.resolve('./node_modules/tinymce/');
                const destinationPath = path.resolve('./public/tinymce/');

                // Ensure the public directory exists
                if (!fs.existsSync(path.dirname(destinationPath))) {
                    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
                }

                // Copy entire directory from node_modules to public directory
                fs.cpSync(sourcePath, destinationPath, { recursive: true });

                // Log the successful copy
                console.log('tinymce has been copied to the public folder.');
            }
        }
    }
}
