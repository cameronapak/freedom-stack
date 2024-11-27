#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function setupAuth() {
  console.log("🔧 Setting up auth components...");

  // Copy Better Auth components by default
  const templateDir = path.join(process.cwd(), "src/lib/auth/better");
  const targetLibDir = path.join(process.cwd(), "src/lib");
  const targetComponentsDir = path.join(process.cwd(), "src/components/auth");

  // Create target directories if they don't exist
  fs.mkdirSync(targetLibDir, { recursive: true });
  fs.mkdirSync(targetComponentsDir, { recursive: true });

  // Copy auth.ts and auth-client.ts
  fs.copyFileSync(path.join(templateDir, "auth.ts"), path.join(targetLibDir, "auth.ts"));
  fs.copyFileSync(path.join(templateDir, "auth-client.ts"), path.join(targetLibDir, "auth-client.ts"));

  // Copy middleware.ts
  fs.copyFileSync(path.join(templateDir, "middleware.ts"), path.join(process.cwd(), "src/middleware.ts"));

  // Copy components
  const templateComponentsDir = path.join(templateDir, "components");
  copyDir(templateComponentsDir, targetComponentsDir);

  console.log(`
✅ Successfully set up Better Auth components!

The following files have been created:
- Auth implementation in src/lib/auth.ts
- Auth client in src/lib/auth-client.ts
- Middleware in src/middleware.ts
- Auth components in src/components/auth/

To switch auth providers, use:
npm run auth:use-clerk   # Switch to Clerk
npm run auth:use-better  # Switch to Better Auth
`);
}

setupAuth().catch(console.error);
