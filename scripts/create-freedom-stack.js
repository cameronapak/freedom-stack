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
    "scripts",
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
  console.error("  npx freedom-stack my-app");
  process.exit(1);
}

createProject(projectName);
