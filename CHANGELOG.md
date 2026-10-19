# Changelog

All notable changes to the Openbeehive website are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
