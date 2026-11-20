import { describe, expect, it } from 'vitest';
import * as config from './config';
import { APP_LOGIN_URL, APP_URL, CONTACT_EMAIL, DOCS_URL, GITHUB_URL, SITE_URL } from './config';

describe('config', () => {
  it.each([SITE_URL, APP_URL, DOCS_URL, GITHUB_URL])(
    '%s is an https origin without trailing slash',
    (url) => {
      expect(new URL(url).protocol).toBe('https:');
      expect(url.endsWith('/')).toBe(false);
    }
  );

  it('serves the demo from the sign-in page of the app host', () => {
    expect(APP_LOGIN_URL).toBe(`${APP_URL}/login`);
    expect(new URL(APP_LOGIN_URL).host).toBe(new URL(APP_URL).host);
  });

  it('links to no separate demo host', () => {
    for (const value of Object.values(config)) {
      expect(value).not.toMatch(/\bdemo\./);
    }
  });

  it('gives a contact address on the site domain', () => {
    expect(CONTACT_EMAIL).toMatch(/^[a-z]+@openbeehive\.org$/);
    expect(CONTACT_EMAIL.endsWith(`@${new URL(SITE_URL).host}`)).toBe(true);
  });
});
