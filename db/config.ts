import { defineDb, defineTable, column } from "astro:db";

const Posts = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    pubDate: column.date(),
    description: column.text(),
    author: column.text(),
    imageUrl: column.text({ optional: true }),
    imageAlt: column.text({ optional: true }),
    tags: column.json({ optional: true }),
    slug: column.text({ unique: true }),
    content: column.text()
  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    emailVerified: column.boolean(),
    image: column.text({ optional: true }),
    createdAt: column.date(),
    updatedAt: column.date()
  }
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    ipAddress: column.text({ optional: true }),
    userAgent: column.text({ optional: true }),
    userId: column.text()
  }
});

const Account = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    accountId: column.text(),
    providerId: column.text(),
    userId: column.text(),
    accessToken: column.text({ optional: true }),
    refreshToken: column.text({ optional: true }),
    idToken: column.text({ optional: true }),
    expiresAt: column.date({ optional: true }),
    password: column.text({ optional: true })
  }
});

const Verification = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    identifier: column.text(),
    value: column.text(),
    expiresAt: column.date(),
    createdAt: column.date()
  }
});

export default defineDb({
  tables: {
    Posts,
    User,
    Session,
    Account,
    Verification
  }
});
