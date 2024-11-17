import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env.example to get required variables
const envExample = readFileSync(join(__dirname, "../.env.example"), "utf8");
const requiredVars = envExample
  .split("\n")
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split("=")[0]);

// Read .env file
let envVars = {};
try {
  const envFile = readFileSync(join(__dirname, "../.env"), "utf8");
  envVars = Object.fromEntries(
    envFile
      .split("\n")
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => line.split("=").map((part) => part.trim()))
  );
} catch (error) {
  console.error("\x1b[33m%s\x1b[0m", "No .env file found. Creating one from .env.example...");
  try {
    const { execSync } = require("child_process");
    execSync("cp .env.example .env");
    console.log("\x1b[32m%s\x1b[0m", "Created .env file from .env.example");
    const exampleEnv = readFileSync(join(__dirname, "../.env.example"), "utf8");
    envVars = Object.fromEntries(
      exampleEnv
        .split("\n")
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => line.split("=").map((part) => part.trim()))
    );
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error: Failed to create .env file!");
    process.exit(1);
  }
  process.exit(1);
}

// Check if all required variables are set
const missingVars = requiredVars.filter((varName) => !envVars[varName]);

if (missingVars.length > 0) {
  console.error("\x1b[31m%s\x1b[0m", "Error: You have some missing required environment variables:");

  // Read .env.example again to get comments
  const envExampleLines = envExample.split("\n");
  const varComments = new Map();

  let currentComment = "";
  envExampleLines.forEach((line) => {
    if (line.startsWith("#")) {
      currentComment = line.substring(1).trim();
    } else if (line && !line.startsWith("#")) {
      const varName = line.split("=")[0];
      varComments.set(varName, currentComment);
    }
  });

  missingVars.forEach((varName) => {
    console.error("\x1b[33m%s\x1b[0m", `- ${varName}`);
    const comment = varComments.get(varName);
    if (comment) {
      console.error("\x1b[36m%s\x1b[0m", `  → ${comment}`);
    }
  });

  console.error("\n\x1b[37m%s\x1b[0m", "Please set these variables in your .env file before running the dev server.");
  process.exit(1);
}
