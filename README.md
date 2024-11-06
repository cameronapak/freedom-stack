# Freedom Stack • Full-Stack Starter Kit

An Astro-based full-stack starter kit that feels freeing, and is free. Make development fun again. [See the demo site](https://freedom.faith.tools).

I wanted to provide a stack that's powerful like Ruby on Rails _("The One Person Framework")_, but with the ease and "vanilla" web dev feel of Astro.

[![Netlify Status](https://api.netlify.com/api/v1/badges/78803fc4-5d36-4efb-82cd-2daeb5684fb6/deploy-status)](https://app.netlify.com/sites/freedom-stack/deploys) [![Github Stars](https://img.shields.io/github/stars/cameronapak/freedom-stack?style=flat-square)](https://github.com/cameronapak/freedom-stack/stargazers)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/cameronapak/freedom-stack"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

![freedom stack](public/og-image.png)

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
- [Clerk](https://clerk.com/) - For authentication.

### Bonus Layer

- A well-prompted `.cursorrules` file for [Cursor's AI IDE](https://cursor.com/) to be a friendly guide helping you using this stack easier.

## Get Started 🚀

### 1. Setup Your Codebase

To create your own instance of this codebase, click the "Use this template"
button on the [repo's home page](https://github.com/cameronapak/freedom-stack).

Then, clone your new repo to your local machine.

### 2. Setup Your Database

We use [Turso](https://turso.tech/) for the fully-managed libSQL database. [Follow these instructions to get started with Turso](https://docs.astro.build/en/guides/astro-db/#getting-started-with-turso).

_[Want to visualize your data through a GUI?](https://docs.turso.tech/local-development#connecting-a-gui)_

### 3. Setup Your Authentication Provider

Create a new [Clerk](https://clerk.com/) project.

### 4. Set Environment Variables

Let's create the `.env` file by copying the `.env.example` file.

```bash
cp .env.example .env
```

This project uses the following environment variables:

| Variable                | Description                                | Required | More Info                                                                                                 |
| ----------------------- | ------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| `ASTRO_DB_REMOTE_URL`   | The connection URL to your libSQL server   | Required | [Astro DB](https://docs.astro.build/en/guides/astro-db/)                                                  |
| `ASTRO_DB_APP_TOKEN`    | The auth token to your libSQL server       | Required | [Astro DB](https://docs.astro.build/en/guides/astro-db/)                                                  |
| `CLERK_SECRET_KEY`      | Secret key for Clerk authentication        | Required | [Clerk](https://clerk.com/docs/deployments/clerk-environment-variables#clerk-publishable-and-secret-keys) |
| `CLERK_PUBLISHABLE_KEY` | Publishable key for Clerk authentication   | Required | [Clerk](https://clerk.com/docs/deployments/clerk-environment-variables#clerk-publishable-and-secret-keys) |
| `SENTRY_DSN`            | Sentry Data Source Name for error tracking | Optional | [Sentry](https://docs.sentry.io/platforms/javascript/guides/astro/)                                       |
| `SENTRY_AUTH_TOKEN`     | Authentication token for Sentry            | Optional | [Sentry](https://docs.sentry.io/platforms/javascript/guides/astro/)                                       |
| `SENTRY_PROJECT`        | Sentry project identifier                  | Optional | [Sentry](https://docs.sentry.io/platforms/javascript/guides/astro/)                                       |

Make sure to set these variables in your environment or `.env` file before running the application.

### 5. Run the Development Server

Install the dependencies.

```bash
npm install
```

Then, run the development server.

```bash
npm run dev
```

Viola! Your development server is now running on [`localhost:4321`](http://localhost:4321).

### 6. Have fun!

Create because you love creating. Make development fun again!

---

## Host Your Project ☁️

Host your site with [Netlify](https://netlify.com) in under a minute.

First, you must login to Netlify:

```bash
npm run host:login
```

Then, you can deploy your site with:

```bash
npm run host:deploy
```

> [!IMPORTANT]
> Remember to set the environment variables in Netlify so that it builds successfully.

[Learn more about hosting Astro sites on Netlify](https://docs.astro.build/en/guides/deploy/netlify/).

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
| `npm run dev`               | Start the development server                     |
| `npm run dev:host`          | Start development server accessible from network |
| `npm run build`             | Build the production site with remote database   |
| `npm run preview`           | Preview the built site locally                   |
| `npm run format`            | Format all files using Prettier                  |
| `npm run packages:update`   | Update all packages to their latest versions     |
| `npm run db:update-schemas` | Push database schema changes to remote database  |

## Contributions 🤝

Contributions welcomed. Please
[open an issue](https://github.com/cameronapak/astwoah-stack/issues) if you'd
like to contribute.

---

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Code of Conduct 📜

See the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for details.

---

Freedom Stack is made with 🕊️ by [Cameron Pak](https://cameronpak.com), brought to you by [faith.tools](https://faith.tools).
