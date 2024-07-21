import { defineDb, defineTable, column } from 'astro:db';

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
    slug: column.text(),
    content: column.text()
  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    hashed_password: column.text(),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({
      references: () => User.columns.id,
    }),
  },
});

export default defineDb({
  tables: {
    Posts,
    Session,
    User,
  },
});