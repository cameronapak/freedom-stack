# Freedom Stack, by faith.tools

A freeing full-stack web stack.

[![Netlify Status](https://api.netlify.com/api/v1/badges/78803fc4-5d36-4efb-82cd-2daeb5684fb6/deploy-status)](https://app.netlify.com/sites/freedom-stack/deploys)

![freedom stack](public/og-image.png)

[See Demo](https://freedom.faith.tools)

## Comes With

- CSS-based component library (daisyUI)
- Blog
- Database (Astro DB)
- Auth (Lucia)
- Simple Web Hosting (Netlify)

## Stack

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
  that is fast, lightweight, and ridiculously easy-to-use. (Can use Turso, if
  desired.)
- [Drizzle ORM](https://orm.drizzle.team/) - A modern SQL database toolkit.
- [Lucia](https://lucia-auth.com/) - A modern authentication library for Astro.

I owe a huge thank you to Thomas McInnis for his
[tutorial on Astro and Lucia](https://thomasmcinnis.com/posts/lucia-auth-astro-db/).

### Hosting

I have included the Netlify adapter in the starter kit. You can swap it out for
others, such as Vercel.

## How To Use

To create your own instance of this codebase, click the "Use this template"
button on the [repo's home page](https://github.com/cameronapak/freedom-stack).

## Vision

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

### Contributions

I'll consider a contribution, but please
[open an issue](https://github.com/cameronapak/astwoah-stack/issues) if you'd
like to contribute.
