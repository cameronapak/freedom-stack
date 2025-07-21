#!/usr/bin/env node

import { cli } from "cleye";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import ora from "ora";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createProject(projectName) {
  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

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
    author: ""
  };

  // Write modified package.json
  fs.writeFileSync(path.join(projectDir, "package.json"), JSON.stringify(newPackageJson, null, 2));

  // Create .env from .env.example with generated BETTER_AUTH_SECRET
  const envExamplePath = path.join(templateDir, ".env.example");
  const envPath = path.join(projectDir, ".env");

  // Check if .env.example exists
  if (!fs.existsSync(envExamplePath)) {
    console.warn("Warning: .env.example not found in template");
    return;
  }

  // Create .env if it doesn't exist
  if (!fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envExamplePath, "utf8");

    // Generate and set BETTER_AUTH_SECRET
    const authSecret = randomUUID();
    envContent = envContent.replace('BETTER_AUTH_SECRET=""', `BETTER_AUTH_SECRET="${authSecret}"`);

    fs.writeFileSync(envPath, envContent);
    console.log("Created .env file with default configuration");
  }

  // Copy .env.example to new project
  fs.copyFileSync(envExamplePath, path.join(projectDir, ".env.example"));

  // Initialize git
  process.chdir(projectDir);
  execSync("git init");

  // Create .gitignore if it doesn't exist
  const gitignorePath = path.join(projectDir, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(
      gitignorePath,
      `
# build output
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

  console.log("\n🕊️ Running create-freedom-stack...\n\n");

  // Install dependencies
  const spinner = ora("Installing dependencies...").start();
  try {
    execSync("npm install", { stdio: ["pipe", "pipe", "pipe"] });
    spinner.succeed("Dependencies installed successfully!");
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    console.error(error.message);
    process.exit(1);
  }

  console.log(`
🚀 Freedom Stack project created successfully!

To get started:
  1. cd ${projectName}
  2. npm run db:setup     # Set up your Turso database
  3. npm run dev          # Start the development server

Visit http://localhost:4321 to see your app.
  `);
}

const argv = cli({
  name: "create-freedom-stack",
  version: "0.1.0",
  description: "Create a new Freedom Stack project with best practices and modern tooling",
  flags: {},
  parameters: ["<projectName>"],
  help: {
    description: "Create a new Freedom Stack project",
    examples: ["npx create-freedom-stack my-app"]
  }
});

const { projectName } = argv._;
createProject(projectName);
