#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import crypto from "crypto";

const authProvider = process.argv[2];

if (!authProvider || !["clerk", "better"].includes(authProvider)) {
  console.error("Please specify an auth provider: clerk or better");
  process.exit(1);
}

// Package dependencies for each provider
const dependencies = {
  clerk: {
    add: ["@clerk/astro", "@clerk/clerk-sdk-node"],
    remove: ["better-auth"]
  },
  better: {
    add: ["better-auth"],
    remove: ["@clerk/astro", "@clerk/clerk-sdk-node"]
  }
};

// Environment variables for each provider
const envVars = {
  clerk: {
    required: ["CLERK_SECRET_KEY", "PUBLIC_CLERK_PUBLISHABLE_KEY"],
    remove: ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL"]
  },
  better: {
    required: ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL"],
    remove: ["CLERK_SECRET_KEY", "PUBLIC_CLERK_PUBLISHABLE_KEY"]
  }
};

// Update the path resolution to look in the freedom-stack templates directory
const getTemplatePath = (authProvider) => {
  return path.join(__dirname, "..", "templates", "auth", authProvider, "middleware.ts");
};

// Update the middleware path to point to the app's src directory
const getMiddlewarePath = (appPath) => {
  return path.join(appPath, "src", "middleware.ts");
};

async function switchAuth() {
  console.log(`🔄 Switching to ${authProvider} auth...`);

  // 1. Update dependencies
  console.log("\n📦 Updating dependencies...");
  const { add, remove } = dependencies[authProvider];

  if (remove.length > 0) {
    try {
      execSync(`npm uninstall ${remove.join(" ")}`, { stdio: "inherit" });
    } catch (error) {
      // Ignore if packages aren't installed
    }
  }

  if (add.length > 0) {
    execSync(`npm install ${add.join(" ")}`, { stdio: "inherit" });
  }

  // 2. Update environment variables
  console.log("\n🔑 Updating environment variables...");
  const envPath = path.join(process.cwd(), ".env");
  let envContent = "";

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf8");
  }

  // Remove old env vars
  envVars[authProvider === "clerk" ? "better" : "clerk"].required.forEach((varName) => {
    const regex = new RegExp(`^${varName}=.*$\\n?`, "m");
    envContent = envContent.replace(regex, "");
  });

  // Add new env vars
  if (authProvider === "better") {
    const uuid = crypto.randomUUID();
    envContent += `\nBETTER_AUTH_SECRET=${uuid}\nBETTER_AUTH_URL=http://localhost:4321\n`;
  } else {
    envVars[authProvider].required.forEach((varName) => {
      if (!envContent.includes(varName)) {
        envContent += `\n${varName}=""`;
      }
    });
  }

  fs.writeFileSync(envPath, envContent.trim() + "\n");

  // 3. Update TypeScript types
  console.log("\n📝 Updating TypeScript types...");
  const envDtsPath = path.join(process.cwd(), "src/env.d.ts");
  let envDtsContent = fs.readFileSync(envDtsPath, "utf8");

  // Update Locals interface
  const betterAuthPackage = "better-auth";
  const clerkPackage = "@clerk/backend";

  envDtsContent = envDtsContent.replace(
    new RegExp(`${betterAuthPackage}|${clerkPackage}`, "g"),
    authProvider === "better" ? betterAuthPackage : clerkPackage
  );

  // Update ImportMetaEnv interface
  const betterAuthEnv = `readonly BETTER_AUTH_URL: string;\n  readonly BETTER_AUTH_SECRET: string;`;
  const clerkEnv = `readonly CLERK_SECRET_KEY: string;\n  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;`;

  envDtsContent = envDtsContent.replace(
    new RegExp(`${betterAuthEnv}|${clerkEnv}`),
    authProvider === "better" ? betterAuthEnv : clerkEnv
  );

  fs.writeFileSync(envDtsPath, envDtsContent);

  // 4. Copy auth files
  console.log("\n📋 Copying auth files...");
  const templateDir = path.join(process.cwd(), "templates/auth", authProvider);
  const targetLibDir = path.join(process.cwd(), "src/lib");

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetLibDir)) {
    fs.mkdirSync(targetLibDir, { recursive: true });
  }

  if (authProvider === "better") {
    // Copy auth.ts and auth-client.ts
    fs.copyFileSync(path.join(templateDir, "auth.ts"), path.join(targetLibDir, "auth.ts"));
    fs.copyFileSync(path.join(templateDir, "auth-client.ts"), path.join(targetLibDir, "auth-client.ts"));
  } else if (authProvider === "clerk") {
    // Remove auth files if they exist when switching to Clerk
    try {
      fs.unlinkSync(path.join(targetLibDir, "auth.ts"));
      fs.unlinkSync(path.join(targetLibDir, "auth-client.ts"));
    } catch (error) {
      // Ignore if files don't exist
    }
  }

  // Copy middleware.ts
  console.log("\n📋 Copying middleware file...");
  const templatePath = getTemplatePath(authProvider);
  const targetMiddlewarePath = getMiddlewarePath(process.cwd());

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Could not find middleware template for ${authProvider} at ${templatePath}`);
    process.exit(1);
  }

  try {
    await fs.promises.copyFile(templatePath, targetMiddlewarePath);
    console.log("✅ Middleware file copied successfully");
  } catch (error) {
    console.error("❌ Error copying middleware file:", error.message);
    process.exit(1);
  }

  // 5. Copy pages
  console.log("\n📄 Copying auth pages...");
  const templatePagesDir = path.join(templateDir, "pages");
  const targetPagesDir = path.join(process.cwd(), "src/pages");

  // Copy sign-in and sign-up pages
  fs.copyFileSync(path.join(templatePagesDir, "sign-in.astro"), path.join(targetPagesDir, "sign-in.astro"));
  fs.copyFileSync(path.join(templatePagesDir, "sign-up.astro"), path.join(targetPagesDir, "sign-up.astro"));

  console.log(`
✅ Successfully switched to ${authProvider} auth!

${
  authProvider === "clerk"
    ? `To complete the setup:

1. Sign up at https://clerk.com
2. Create a new application
3. Add these environment variables to your .env file:
   CLERK_SECRET_KEY=your_secret_key
   PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key`
    : `To complete the setup:

1. Add these environment variables to your .env file:
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=your_url`
}

The following files have been updated:
- Dependencies in package.json
- Environment variables in .env
- TypeScript types in src/env.d.ts
- Auth implementation in src/lib/auth.ts
- Middleware in src/middleware.ts
${authProvider === "better" ? "- Auth client in src/lib/auth-client.ts\n" : ""}- Sign-in page in src/pages/sign-in.astro
- Sign-up page in src/pages/sign-up.astro

For more information, visit:
${authProvider === "clerk" ? "https://clerk.com/docs/quickstarts/astro" : "https://better-auth.com/"}
`);
}

switchAuth().catch(console.error);
