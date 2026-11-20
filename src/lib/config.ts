// Canonical origin of this marketing site (no trailing slash).
export const SITE_URL = 'https://openbeehive.org';

// The app (PWA) and documentation are deployed separately on their own
// subdomains. The marketing site only links across to them; it never embeds
// them.
export const APP_URL = 'https://app.openbeehive.org';
export const DOCS_URL = 'https://docs.openbeehive.org';

// The app's sign-in page. It also carries the "Try the demo" button, so the
// demo has no host of its own.
export const APP_LOGIN_URL = `${APP_URL}/login`;

// The hosted app is invite-only; invites are requested by email.
export const CONTACT_EMAIL = 'contact@openbeehive.org';

// Source code on GitHub.
export const GITHUB_URL = 'https://github.com/openbeehive-org/openbeehive-app';
