# Freedom Stack

> [!WARNING]
> Freedom Stack (FS) v1 is no longer in active development...
> However, [FS v2](https://github.com/cameronapak/freedom-stack-v2) walked so [FS v3](https://github.com/cameronapak/freedom-stack-v3) could fly.

> [!IMPORTANT]
> I'd recommend checking out [Better T Stack](https://better-t-stack.amanv.dev/new) to piece together your preferred app stack.

A modern, type-safe web development stack using Astro, TypeScript, HTMX, Alpine.js, and more.

> [!TIP]
> Turso has a generous free tier for database hosting and management. And, when it's time to scale, use the code `FREEDOMSTACK` for a discount on paid plans.
> [Check out Turso](https://tur.so/freedomstack)

## Get Started 🚀

### 1. Create Your Project

You can create a new Freedom Stack project using npm:

```bash
# Create a new project
bunx create-freedom-stack my-app

# Navigate to the project directory
cd my-app

# Set up your database
bun run db:setup

# Start the development server
bun run dev
```

Your development server will be running on [`localhost:4321`](http://localhost:4321).

### 2. Environment Variables

The project will automatically create a `.env` file with a generated `BETTER_AUTH_SECRET`. You'll need to set these additional variables:

```env
# Astro DB - LibSQL (required) - Your database
ASTRO_DB_REMOTE_URL=""    # Added by bun run db:setup
ASTRO_DB_APP_TOKEN=""     # Added by bun run db:setup

# Better Auth (required)
BETTER_AUTH_SECRET=""     # Auto-generated during setup
BETTER_AUTH_URL="http://localhost:4321"

# Email Configuration (optional) - For sending emails
MAIL_HOST=""             # SMTP host (e.g., smtp.resend.com)
MAIL_PORT=""             # SMTP port (e.g., 465)
MAIL_SECURE=""          # Use TLS/SSL (true/false)
MAIL_AUTH_USER=""       # SMTP username
MAIL_AUTH_PASS=""       # SMTP password or API key
MAIL_FROM=""            # Sender email address
```

### 3. Have fun!

Create because you love creating. Make development fun again!

## What's Included

- 🚀 [Astro](https://astro.build) - The web framework for content-driven websites
- 🎨 [TailwindCSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com) - Utility-first CSS
- ⚡ [HTMX](https://htmx.org) - High power tools for HTML
- 🗄️ [Astro DB](https://docs.astro.build/en/guides/astro-db) - Built-in database with type safety
- 🔒 [Better Auth](https://better-auth.com) - Simple, secure authentication
- 🏃‍♂️ [Alpine.js](https://alpinejs.dev) - Lightweight JavaScript framework

# Freedom Stack • Full-Stack Starter Kit

[![Netlify Status](https://api.netlify.com/api/v1/badges/78803fc4-5d36-4efb-82cd-2daeb5684fb6/deploy-status)](https://app.netlify.com/sites/freedom-stack/deploys) [![Github Stars](https://img.shields.io/github/stars/cameronapak/freedom-stack?style=flat-square)](https://github.com/cameronapak/freedom-stack/stargazers)

An Astro-based full-stack starter kit that feels freeing, and is free. Make development fun again. [See the demo site](https://freedom.faith.tools).

I wanted to provide a stack that's powerful like Ruby on Rails _("The One Person Framework")_, but with the ease and "vanilla" web dev feel of Astro.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/cameronapak/freedom-stack"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

![freedom stack](public/og-image.png)

## Learning Resources 📚

### The Frontend Layer

If you want to learn more about the frontend layer, I recommend the [Astro Web Framework Crash Course by freeCodeCamp](https://www.youtube.com/watch?v=e-hTm5VmofI).

### The Interactivity Layer

If you want to learn more about Alpine.js, I recommend [Learn Alpine.js on codecourse](https://codecourse.com/courses/learn-alpine-js).

### The Database Layer

If you want to learn more about the database layer, I recommend learning from [High Performance SQLite course](https://highperformancesqlite.com/), sponsored by [Turso](https://tur.so/freedomstack/).

### The Philosophy Layer

A starter kit like this can save hours, days, or even weeks of development time. However, it's not enough just to have the baseline. You will need to have a philosophy around building a site or web app, so that you can make the most of the tooling and minimize wasting time. I recommend reading Getting Real by 37signals. [It's free to read online](https://books.37signals.com/8/getting-real). _(While the book says a few choice words, it's a great, practical resource for building great software.)_

## Here's What's Included 🔋🔋🔋

Ogres have layers. Onions have layers. Parfaits have layers. And, Freedom Stack has layers!

### UI Layer

- [Astro](https://astro.build/) - A simple web metaframework.
- [Tailwind CSS](https://tailwindcss.com/) - For styling.
- [Preline UI](https://preline.co/) - Tailwind-based HTML components.
- [Daisy UI](https://daisyui.com/) - For a Bootstrap-like UI CSS component
  library, built upon Tailwind.
- [Lucide Icons](https://lucide.dev/) - For a beautiful icon library.

### Interactivity Layer

- [TypeScript](https://www.typescriptlang.org/) - For type safety.
- [AlpineJS](https://alpinejs.dev/) - For state management and interactivity.
- [HTMX](https://htmx.org/) - For sending HTML partials/snippets over the wire.

### Backend Data Layer

- [Astro DB](https://astro.build/db) - Astro DB is a fully managed SQL database
  that is fast, lightweight, and ridiculously easy-to-use.
- [Drizzle ORM](https://orm.drizzle.team/) - Use your database without having to know or worry about SQL syntax.
- [Better Auth](https://better-auth.com/) - For authentication.

### Bonus Layer

- A well-prompted `.cursorrules` file for [Cursor's AI IDE](https://cursor.com/) to be a friendly guide helping you using this stack easier.

---

## Host Your Project ☁️

Host your site with [Netlify](https://netlify.com) in under a minute.

First, you must login to Netlify:

```bash
bun run host:login
```

Then, you can deploy your site with:

```bash
bun run host:deploy
```

> [!IMPORTANT]
> Remember to set the environment variables in Netlify so that it builds successfully.

[Learn more about hosting Astro sites on Netlify](https://docs.astro.build/en/guides/deploy/netlify/).

---

## Send Emails

## Email Configuration 📧

Freedom Stack includes a pre-configured email service using Nodemailer. This allows you to:

- Send transactional emails
- Use any SMTP provider
- Handle email templates
- Maintain type safety

### Setting up Email

1. Configure your environment variables as shown above

Send emails programmatically:

```typescript
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "recipient@example.com",
  subject: "Hello!",
  html: "<h1>Welcome!</h1>"
});
```

### Email Providers

While you can use any SMTP provider, we recommend [Resend](https://resend.com) - Modern email API with generous free tier.

> [!TIP]
> Resend offers 100 emails/day free and has excellent developer experience.

---

## Vision ❤️

I dream of a lightweight, simple web development stack that invokes a fun web
experience at the cheapest possible maintainance, backend, and server cost. As
close to free as possible.

### Core Principles

- **Approachable** — I want those new to web development to feel comfortable
  using this stack. Things like database management should feel intuitive.
  Remove barriers of traditional JavaScript frameworks, such as excessive
  boilerplate code or intense state management. Go back to the basics of web
  development. (_While this is not vanilla, the dev experience will feel very
  natural._)
- **Flow-able** — Use an HTML-first approach, where almost all of the work is
  done on the DOM layer: styling, structuring, and interactivity. An opinionated
  stack helps you avoid analysis paralysis of trying to decide what tooling to
  pick or how to put things together. Instead, spend your thinking time
  building. This simple stack helps you focus and get in the flow of code
  faster. Fast setup. Fast building. Fast shipping.
- **Pocket-friendly** — Using this stack will be financially maintainable to
  anyone, especially indie hackers and those creating startup sites / web apps.

## Showcase 🏆

- [faith.tools](https://faith.tools)
- [freedom](https://freedom.melos.church)
- [Be Still](https://ft-be-still.netlify.app)
- [kit](https://kit.faith.tools)

Have a project that uses Freedom Stack? [Open a PR](https://github.com/cameronapak/freedom-stack) to add it to the list!

## Available Scripts ⚡

| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `bun run dev`               | Start the development server                     |
| `bun run dev:host`          | Start development server accessible from network |
| `bun run build`             | Build the production site with remote database   |
| `bun run preview`           | Preview the built site locally                   |
| `bun run format`            | Format all files using Prettier                  |
| `bun run packages:update`   | Update all packages to their latest versions     |
| `bun run db:update-schemas` | Push database schema changes to remote database  |

## Contributions 🤝

Contributions welcomed. Please
[open an issue](https://github.com/cameronapak/astwoah-stack/issues) if you'd
like to contribute.

<a href="https://github.com/cameronapak/freedom-stack/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=cameronapak/freedom-stack" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

---

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Code of Conduct 📜

See the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details.

---

Freedom Stack is made with 🕊️ by [Cameron Pak](https://cameronpak.com), brought to you by [faith.tools](https://faith.tools).
