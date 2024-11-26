#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setupTurso() {
  console.log("🔧 Setting up Turso database...");

  try {
    // Check if Turso CLI is installed
    try {
      execSync("turso --version", { stdio: "ignore" });
    } catch (error) {
      console.log("📦 Installing Turso CLI...");
      if (process.platform === "darwin") {
        execSync("brew install tursodatabase/tap/turso", { stdio: "inherit" });
      } else {
        execSync("curl -sSfL https://get.turso.tech/install.sh | bash", { stdio: "inherit" });
      }
    }

    // Check if user is authenticated with Turso
    try {
      execSync("turso auth status", { stdio: "ignore" });
    } catch (error) {
      console.log("🔑 Please authenticate with Turso...");
      execSync("turso auth login", { stdio: "inherit" });
    }

    // Get database name from user
    const dbName =
      (await question("Enter a name for your database (default: freedom-stack-db): ")) || "freedom-stack-db";

    // Create database
    console.log(`\n📚 Creating database: ${dbName}...`);
    execSync(`turso db create ${dbName}`, { stdio: "inherit" });

    // Get database URL
    console.log("\n🔗 Getting database URL...");
    const dbUrl = execSync(`turso db show ${dbName} --url`, { encoding: "utf8" }).trim();

    // Create auth token
    console.log("\n🔑 Creating auth token...");
    const authToken = execSync(`turso db tokens create ${dbName}`, { encoding: "utf8" }).trim();

    // Update .env file
    const envPath = path.join(process.cwd(), ".env");
    let envContent = "";

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf8");
    }

    // Replace or add Turso environment variables
    const envVars = {
      ASTRO_DB_REMOTE_URL: dbUrl,
      ASTRO_DB_APP_TOKEN: authToken
    };

    for (const [key, value] of Object.entries(envVars)) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (envContent.match(regex)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
    }

    fs.writeFileSync(envPath, envContent.trim() + "\n");

    console.log(`
✅ Turso database setup complete!

The following environment variables have been added to your .env file:
ASTRO_DB_REMOTE_URL=${dbUrl}
ASTRO_DB_APP_TOKEN=${authToken}

You can now run:
npm run db:update-schemas   # To push your schema to the database
npm run dev                 # To start your development server
`);
  } catch (error) {
    console.error("❌ Error setting up Turso:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupTurso();
