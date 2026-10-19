import { describe, expect, it } from 'vitest';
import { APP_URL, DEMO_URL, DOCS_URL, GITHUB_URL, SITE_URL } from './config';

describe('config', () => {
  it.each([SITE_URL, APP_URL, DEMO_URL, DOCS_URL, GITHUB_URL])(
    '%s is an https origin without trailing slash',
    (url) => {
      expect(new URL(url).protocol).toBe('https:');
      expect(url.endsWith('/')).toBe(false);
    }
  );
});
