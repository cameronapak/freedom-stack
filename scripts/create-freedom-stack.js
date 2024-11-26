#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    ".env.example",
    "astro.config.mjs",
    "tailwind.config.mjs",
    "tsconfig.json",
    ".prettierrc",
    ".nvmrc"
  ];

  filesToCopy.forEach((file) => {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(projectDir, file);
    fs.cpSync(sourcePath, targetPath, { recursive: true });
  });

  // Initialize git
  process.chdir(projectDir);
  execSync("git init");

  // Install dependencies
  console.log("Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log(`
🚀 Freedom Stack project created successfully!

To get started:
  cd ${projectName}
  cp .env.example .env
  npm run dev

Visit http://localhost:4321 to see your app.
  `);
}

// Get project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error("Please specify a project name:");
  console.error("  npx create-freedom-stack my-app");
  process.exit(1);
}

createProject(projectName);
