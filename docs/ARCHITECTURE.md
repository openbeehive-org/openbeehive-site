# Architecture

openbeehive-site is the marketing site of
[Openbeehive](https://github.com/openbeehive-org/openbeehive-app), published at
<https://openbeehive.org>. It is a [SvelteKit](https://svelte.dev/docs/kit)
app prerendered to static HTML; nothing runs server-side.

## Components

- **`src/routes/`** — the landing page (`+page.svelte`), the legal pages under
  `(legal)/` with their shared chrome, and the 404 page. `+layout.ts` turns on
  prerendering for everything and loads the locale before the first render.
- **`src/lib/i18n/`** — svelte-i18n setup and one JSON file per language
  (en, de, fr, es, it). English is the fallback; every locale carries the same
  keys (`locales.test.ts` checks it).
- **`src/lib/config.ts`** — the URLs of the app, demo, docs and source, which
  live on their own subdomains; the site only links to them.
- **`src/lib/components/`** — footer, SEO head tags, not-found content.
- **`static/`** — favicon and other files copied verbatim.

## Build and deploy

`npm run build` renders every page into `build/`. Two pipelines use it:

- **GitHub** (`.github/workflows/check.yml`) runs `npm run check` on pushes to
  `main`, pull requests and weekly: lint, tests with coverage, dependency and
  secret audit, build, fleetlint.
- **Gitea** (`.gitea/workflows/deploy.yml`) lints and builds on every push and,
  for a `v*` tag only, hands the `build/` artifact to the shared `johnny/build`
  deploy workflow, which rsyncs it to the static web host. The deploy job never
  sees the repository source.

## Decisions

- **Static output, own hosting.** No server, no analytics, no cookies beyond
  the language choice in `localStorage`; the host only serves files, so the
  attack surface is the build toolchain, which `npm run audit` watches.
- **Prerendered in English, switched client-side.** Crawlers get a complete
  English page; the browser then applies the saved or preferred language.
- **Separate from the app.** The site has its own repository, release cadence
  and locale files so marketing changes never touch the application build.
