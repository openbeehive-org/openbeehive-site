# Changelog

All notable changes to the Openbeehive website are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Dark theme. The site follows the system setting; a System / Light / Dark
  switch in the page header overrides it and is remembered per device. The theme is
  set before the first paint, so a saved dark theme does not flash light.
- The landing page says that the hosted app is invite-only and that invites
  can be requested at contact@openbeehive.org (hero, final call to action and
  About page).
- Privacy policy: a "Maps and address search" section discloses that the app
  loads map tiles from OpenStreetMap and sends typed addresses and pin
  coordinates to its Nominatim search, when that happens, and that an
  operator can change or switch off both. It also mentions the language and
  theme choice kept in the browser's local storage.

### Changed

- "Try the demo" is the primary call to action and opens the sign-in page of
  `app.openbeehive.org`, which offers the demo. "Open the app" is the
  secondary action for people with an account, and "Run it yourself" links to
  the docs. `demo.openbeehive.org` is no longer linked anywhere.
- Copy matches the product: the queen card describes marking colour, number,
  origin, notes and queen history instead of breeding values and mating
  stations; the final call to action no longer promises "no account hoops";
  the self-hosting text no longer says that nothing leaves your control; the
  privacy policy no longer says that self-hosted data never leaves your own
  infrastructure.
- Shared spaces are called "workspace" (de "Arbeitsbereich", fr "espace",
  es "espacio", it "spazio") in all five languages.
- Colours come from semantic tokens (`--bg`, `--text`, `--accent`, ...) that
  the dark theme redefines in one block.

### Fixed

- Contrast in the light theme: filled buttons (white on honey was 3.2:1),
  accent-coloured text and links, and the borders of buttons and the language
  switch now meet WCAG AA (4.5:1 for text, 3:1 for control borders). The
  keyboard focus ring uses a theme colour with at least 3:1 as well.
- The self-hosting section showed `docker compose up -d` with a variable
  named `DEPLOYMENT_PROFILE`, which starts the development stack; it now
  shows `docker compose -f docker-compose.selfhost.yml up -d`.
- Header links, buttons and the language and theme choice are at least
  44 px tall. The language is a select listing each language by name (the
  "EN" buttons were announced as "English"). On phones the header scrolls
  away with the page.
- The About page no longer uses the German term "Stockkarte".
- The language select is named in the page's language ("Sprache",
  "Langue", "Idioma", "Lingua") instead of "Language" in every locale.

## [0.1.4] - 2026-11-20

### Security

- Built with `@sveltejs/adapter-static` 4.0.1 (GHSA-jf9x-2fg2-hx4w,
  CVE-2026-128121) and `@sveltejs/kit` 3.1.1 (GHSA-mw6w-2fmv-pvw3,
  CVE-2026-128117). The first concerns the Vercel route config the adapter
  can generate, the second a crash of `adapter-node`; the site is prerendered
  and served as plain files, so neither applies to openbeehive.org.

### Changed

- Dependencies are pinned to exact versions, and the site is built with
  Node 24.22.3.

## [0.1.3] - 2026-10-19

### Changed

- The hero badge, the brand marks and the phone mock-up's tab bar are drawn
  as inline SVG instead of emoji and dingbat glyphs, so they render the same
  on every platform.
- Page copy and metadata use plain ASCII punctuation; the page title is
  "Openbeehive: free, open-source beekeeping records".
- Security contact is security@openbeehive.org.
- Built with SvelteKit 3 and the latest dependencies.

## [0.1.2] - 2026-09-15

### Changed

- Locale files trimmed to the strings the site uses; the phone mock is now
  fully translated.
- Footer names the AGPL-3.0 licence instead of "All rights reserved".
- Disclaimer no longer states a version number.
- SECURITY.md rewritten for a static site.
- Landing page: a sixth feature card, "Scripts and sensors", for the
  Connect-RPC API and per-device keys (all five languages).

## [0.1.1] - 2026-07-19

### Added

- "Try the demo" call-to-action linking to the live demo at
  `demo.openbeehive.org` (hero and final CTA).

## [0.1.0] - 2026-07-17

First public release. 🐝

### Added

- Landing page showcasing Openbeehive, with a hero, feature highlights and a
  self-hosting section.
- Cross-links to the app (`app.openbeehive.org`) and docs (`docs.openbeehive.org`).
- Legal pages: About, Imprint and Privacy.
- Shared brand identity with the app (honey/cream palette, Fraunces + Hanken
  Grotesk, hexagon mark).
- Multi-language: English, German, French, Spanish, Italian.
- Fully static build via `@sveltejs/adapter-static` — deployable to any CDN.

[Unreleased]: https://github.com/openbeehive-org/openbeehive-site/compare/v0.1.1...HEAD
[0.1.2]: https://github.com/openbeehive-org/openbeehive-site/releases/tag/v0.1.2
[0.1.1]: https://github.com/openbeehive-org/openbeehive-site/releases/tag/v0.1.1
[0.1.0]: https://github.com/openbeehive-org/openbeehive-site/releases/tag/v0.1.0
