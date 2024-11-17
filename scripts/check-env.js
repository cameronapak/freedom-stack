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
  console.error("\x1b[31m%s\x1b[0m", "Error: .env file not found!");
  process.exit(1);
}

// Check if all required variables are set
const missingVars = requiredVars.filter((varName) => !envVars[varName]);

if (missingVars.length > 0) {
  console.error("\x1b[31m%s\x1b[0m", "Error: Missing required environment variables:");
  missingVars.forEach((varName) => {
    console.error("\x1b[33m%s\x1b[0m", `- ${varName}`);
  });
  console.error("\nPlease set these variables in your .env file before running the dev server.");
  process.exit(1);
}
