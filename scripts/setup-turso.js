#!/usr/bin/env node

import { cli } from "cleye";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function checkTursoAuth() {
  try {
    const output = execSync("turso db list", { encoding: "utf8" });
    return !output.includes("please login with turso auth login");
  } catch (error) {
    return false;
  }
}

async function setupTurso(argv) {
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
    if (!checkTursoAuth()) {
      console.log("\n❌ You need to authenticate with Turso first.");
      console.log("\nRun these commands in order:");
      console.log("1. turso auth login");
      console.log("2. npm run db:setup");
      process.exit(1);
    }

    // Use database name from CLI args or prompt
    const dbName =
      argv.flags.name ||
      (await question("\nEnter a name for your database (default: freedom-stack-db): ")) ||
      "freedom-stack-db";

    // Create database
    console.log(`\n📚 Creating database: ${dbName}...`);
    try {
      execSync(`turso db create ${dbName}`, { stdio: "inherit" });
    } catch (error) {
      if (error.message.includes("not logged in")) {
        console.log("\n❌ Turso authentication required.");
        console.log("\nRun these commands in order:");
        console.log("1. turso auth login");
        console.log("2. npm run db:setup");
        process.exit(1);
      }
      throw error;
    }

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

cli(
  {
    name: "setup-turso",
    version: "0.1.0",
    description: "Set up a Turso database for your Freedom Stack project",
    flags: {
      name: {
        type: String,
        description: "Name of the database to create",
        alias: "n"
      },
      force: {
        type: Boolean,
        description: "Override existing database if it exists",
        alias: "f",
        default: false
      }
    },
    help: {
      examples: ["npm run db:setup", "npm run db:setup --name my-database", "npm run db:setup -n my-database --force"]
    }
  },
  async (argv) => {
    await setupTurso(argv);
  }
);
