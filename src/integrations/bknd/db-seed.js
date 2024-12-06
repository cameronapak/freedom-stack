#!/usr/bin/env node

import { cli } from "cleye";
import { App } from "bknd";
import { entity, number, text } from "bknd/data";

const pages = entity("pages", {
  title: text().required(),
  content: text(),
  views: number()
}).toJSON();

// This should only be run once.
async function initialBkndSeed({ url, authToken }) {
  const app = App.create({
    connection: {
      type: "libsql",
      config: {
        url,
        authToken
      }
    }
  });

  await app.build({
    sync: true,
    save: true
  });
}

async function demoSeed({ url, authToken }) {
  const app = App.create({
    connection: {
      type: "libsql",
      config: {
        url,
        authToken
      }
    },
    initialConfig: {
      auth: {
        enabled: true
      },
      data: {
        entities: {
          pages
        }
      }
    }
  });

  await app.build({
    sync: true,
    save: true
  });
}

export async function seedTheDatabase({ url, authToken }) {
  await initialBkndSeed({ url, authToken });
  await demoSeed({ url, authToken });
}

cli(
  {
    name: "bknd-seed",
    description: "Seed the database with initial data",
    flags: {
      url: {
        type: String,
        description: "Name of the database to create",
        alias: "u",
        required: true
      },
      authToken: {
        type: String,
        description: "The auth token for the database",
        alias: "a",
        required: true
      }
    },
    help: {
      examples: ["npm run db:seed -u libsql://XXXX.turso.io -a eyXXXX"]
    }
  },
  async (argv) => {
    if (!argv.flags.url || !argv.flags.authToken) {
      console.error("Please provide a database URL and auth token");
      process.exit(1);
    }

    await seedTheDatabase({
      url: argv.flags.url,
      authToken: argv.flags.authToken
    });
  }
);
