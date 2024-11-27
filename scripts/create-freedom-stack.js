#!/usr/bin/env node

import { cli } from "cleye";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { version } = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));

async function createProject(projectName, flags) {
  console.log(`\nCreating Freedom Stack project "${projectName}"...`);
  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

  const authProvider = flags.auth;
  console.log(`\n🔒 Using ${authProvider === "clerk" ? "Clerk" : "Better Auth"} as your auth provider...\n`);

  // Create project directory
  fs.mkdirSync(projectDir, { recursive: true });

  // Copy template files
  const templateDir = path.join(__dirname, "..");
  const filesToCopy = [
    "src",
    "public",
    "db",
    "scripts",
    "astro.config.mjs",
    "tailwind.config.mjs",
    "tsconfig.json",
    ".prettierrc",
    ".nvmrc"
  ];

  filesToCopy.forEach((file) => {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(projectDir, file);
    if (fs.existsSync(sourcePath)) {
      fs.cpSync(sourcePath, targetPath, { recursive: true });
    } else {
      console.warn(`Warning: Could not find ${file} in template`);
    }
  });

  // Read and modify package.json
  const packageJson = JSON.parse(fs.readFileSync(path.join(templateDir, "package.json"), "utf8"));

  // Modify package.json for new project
  const newPackageJson = {
    ...packageJson,
    name: projectName,
    version: "0.1.0",
    description: `${projectName} - Built with Freedom Stack`,
    repository: undefined,
    bin: undefined,
    files: undefined,
    keywords: undefined,
    author: "",
    dependencies: {
      ...packageJson.dependencies,
      // Remove auth packages from dependencies
      "better-auth": undefined,
      "@clerk/astro": undefined,
      "@clerk/clerk-sdk-node": undefined
    },
    devDependencies: {
      ...packageJson.devDependencies,
      // Keep type packages for both auth providers
      "@clerk/types": "^3.0.0",
      "@types/better-auth": "^1.0.0"
    }
  };

  // Add selected auth provider runtime dependencies
  if (authProvider === "clerk") {
    newPackageJson.dependencies["@clerk/astro"] = "^1.5.0";
    newPackageJson.dependencies["@clerk/clerk-sdk-node"] = "^5.0.69";
  } else {
    newPackageJson.dependencies["better-auth"] = "^1.0.0";
  }

  // Clean up undefined values
  Object.keys(newPackageJson.dependencies).forEach((key) => {
    if (newPackageJson.dependencies[key] === undefined) {
      delete newPackageJson.dependencies[key];
    }
  });

  // Write modified package.json
  fs.writeFileSync(path.join(projectDir, "package.json"), JSON.stringify(newPackageJson, null, 2));

  // Create .env from .env.example with appropriate variables
  const envExamplePath = path.join(templateDir, ".env.example");
  const envPath = path.join(projectDir, ".env");
  let envContent = fs.readFileSync(envExamplePath, "utf8");

  if (authProvider === "clerk") {
    // Remove Better Auth variables and add Clerk variables
    envContent =
      envContent.replace(/BETTER_AUTH_SECRET=".*"\n/, "").replace(/BETTER_AUTH_URL=".*"\n/, "") +
      '\nCLERK_SECRET_KEY=""\nCLERK_PUBLISHABLE_KEY=""';
  } else {
    // Generate and set BETTER_AUTH_SECRET
    const authSecret = randomUUID();
    envContent = envContent.replace('BETTER_AUTH_SECRET=""', `BETTER_AUTH_SECRET="${authSecret}"`);
  }

  fs.writeFileSync(envPath, envContent);

  // Also create .env.example in the new project
  fs.writeFileSync(path.join(projectDir, ".env.example"), envContent);

  // Initialize git
  process.chdir(projectDir);
  execSync("git init");

  // Create .gitignore if it doesn't exist
  const gitignorePath = path.join(projectDir, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(
      gitignorePath,
      `# build output
dist/
.output/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.*
!.env.example

# macOS-specific files
.DS_Store

# Astro
.astro/

# Netlify
.netlify/
`
    );
  }

  // Install dependencies
  console.log("Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Set up auth files
  console.log("\nSetting up auth files...");
  execSync("npm run _auth:setup", { stdio: "inherit" });

  // If using Clerk, switch to Clerk
  if (authProvider === "clerk") {
    console.log("\nSwitching to Clerk auth...");
    execSync("npm run _auth:use-clerk", { stdio: "inherit" });
  }

  console.log(`
🚀 Freedom Stack project created successfully with ${authProvider === "clerk" ? "Clerk" : "Better Auth"}!

To get started:
  cd ${projectName}
  npm run db:setup    # Set up your Turso database
  ${
    authProvider === "clerk"
      ? `
  # Set up Clerk:
  1. Sign up at https://clerk.com
  2. Create a new application
  3. Add these environment variables to your .env file:
     CLERK_SECRET_KEY=your_secret_key
     CLERK_PUBLISHABLE_KEY=your_publishable_key
  `
      : ""
  }
  npm run dev        # Start the development server

Visit http://localhost:4321 to see your app.
  `);
}

const argv = cli({
  name: "create-freedom-stack",
  version,
  flags: {
    auth: {
      type: String,
      description: `Auth provider to use ("better" or "clerk")`,
      choices: ["better", "clerk"],
      default: "better",
      alias: "a"
    }
  },
  help: {
    description: "Create a new Freedom Stack project",
    examples: ["npx create-freedom-stack my-app", "npx create-freedom-stack my-app --auth clerk"]
  },
  parameters: ["<project name>"]
});

await createProject(argv._.projectName, argv.flags);
