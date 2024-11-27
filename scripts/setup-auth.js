#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupAuth() {
  console.log("🔧 Setting up auth files...");

  // Copy Better Auth files by default
  const templateDir = path.join(process.cwd(), "templates/auth/better");
  const targetLibDir = path.join(process.cwd(), "src/lib");

  // Create target directories if they don't exist
  fs.mkdirSync(targetLibDir, { recursive: true });

  // Copy auth.ts and auth-client.ts
  console.log("\n📋 Copying auth files...");
  fs.copyFileSync(path.join(templateDir, "auth.ts"), path.join(targetLibDir, "auth.ts"));
  fs.copyFileSync(path.join(templateDir, "auth-client.ts"), path.join(targetLibDir, "auth-client.ts"));

  // Copy middleware.ts
  fs.copyFileSync(path.join(templateDir, "middleware.ts"), path.join(process.cwd(), "src/middleware.ts"));

  // Copy pages
  console.log("\n📄 Copying auth pages...");
  const templatePagesDir = path.join(templateDir, "pages");
  const targetPagesDir = path.join(process.cwd(), "src/pages");

  // Copy sign-in and sign-up pages
  fs.copyFileSync(path.join(templatePagesDir, "sign-in.astro"), path.join(targetPagesDir, "sign-in.astro"));
  fs.copyFileSync(path.join(templatePagesDir, "sign-up.astro"), path.join(targetPagesDir, "sign-up.astro"));

  console.log(`
✅ Successfully set up Better Auth!

The following files have been created:
- Auth implementation in src/lib/auth.ts
- Auth client in src/lib/auth-client.ts
- Middleware in src/middleware.ts
- Sign-in page in src/pages/sign-in.astro
- Sign-up page in src/pages/sign-up.astro

To switch auth providers, use:
npm run auth:use-clerk   # Switch to Clerk
npm run auth:use-better  # Switch to Better Auth
`);
}

setupAuth().catch(console.error);
