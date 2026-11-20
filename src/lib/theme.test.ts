import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  applyChoice,
  parseChoice,
  readChoice,
  resolveTheme,
  setChoice,
  THEME_CHOICES,
  THEME_STORAGE_KEY,
  watchSystem
} from './theme';

// A browser reduced to what the theme code touches.
function fakeBrowser(saved: string | null, prefersDark: boolean, storageBlocked = false) {
  const storage = new Map<string, string>();
  if (saved !== null) storage.set(THEME_STORAGE_KEY, saved);
  const blocked = () => {
    throw new Error('storage is blocked');
  };
  const listeners = new Set<() => void>();
  const media = {
    matches: prefersDark,
    addEventListener: (_: string, fn: () => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: () => void) => listeners.delete(fn)
  };
  const document = { documentElement: { dataset: {} as Record<string, string> } };
  const globals = {
    localStorage: {
      getItem: storageBlocked ? blocked : (k: string) => storage.get(k) ?? null,
      setItem: storageBlocked ? blocked : (k: string, v: string) => storage.set(k, v)
    },
    matchMedia: (query: string) => {
      expect(query).toBe('(prefers-color-scheme: dark)');
      return media;
    },
    document
  };
  const systemChanges = (dark: boolean) => {
    media.matches = dark;
    for (const fn of listeners) fn();
  };
  return { globals, storage, document, listeners, systemChanges };
}

function stubBrowser(saved: string | null, prefersDark: boolean, storageBlocked = false) {
  const browser = fakeBrowser(saved, prefersDark, storageBlocked);
  for (const [name, value] of Object.entries(browser.globals)) vi.stubGlobal(name, value);
  return browser;
}

const applied = (browser: ReturnType<typeof fakeBrowser>) =>
  browser.document.documentElement.dataset.theme;

describe('theme', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('offers system, light and dark', () => {
    expect([...THEME_CHOICES]).toEqual(['system', 'light', 'dark']);
  });

  it.each([
    ['system', 'system'],
    ['light', 'light'],
    ['dark', 'dark'],
    [null, 'system'],
    ['', 'system'],
    ['sepia', 'system'],
    [42, 'system']
  ])('reads a stored %j as %s', (stored, choice) => {
    expect(parseChoice(stored)).toBe(choice);
  });

  it.each([
    ['system', false, 'light'],
    ['system', true, 'dark'],
    ['light', false, 'light'],
    ['light', true, 'light'],
    ['dark', false, 'dark'],
    ['dark', true, 'dark']
  ] as const)('resolves %s with system dark=%s to %s', (choice, prefersDark, theme) => {
    expect(resolveTheme(choice, prefersDark)).toBe(theme);
  });

  it('reads the saved choice', () => {
    stubBrowser('dark', false);
    expect(readChoice()).toBe('dark');
  });

  it('follows the system when nothing is saved or storage is blocked', () => {
    stubBrowser(null, true);
    expect(readChoice()).toBe('system');
    stubBrowser('dark', false, true);
    expect(readChoice()).toBe('system');
  });

  it('applies the resolved theme to the document', () => {
    const browser = stubBrowser(null, true);
    expect(applyChoice('system')).toBe('dark');
    expect(applied(browser)).toBe('dark');
    expect(applyChoice('light')).toBe('light');
    expect(applied(browser)).toBe('light');
  });

  it('saves a choice per device and applies it', () => {
    const browser = stubBrowser(null, false);
    expect(setChoice('dark')).toBe('dark');
    expect(browser.storage.get(THEME_STORAGE_KEY)).toBe('dark');
    expect(applied(browser)).toBe('dark');
    expect(setChoice('system')).toBe('light');
    expect(readChoice()).toBe('system');
  });

  it('still applies a choice when storage is blocked', () => {
    const browser = stubBrowser(null, false, true);
    expect(setChoice('dark')).toBe('dark');
    expect(applied(browser)).toBe('dark');
  });

  it('follows system changes until it stops watching', () => {
    const browser = stubBrowser(null, false);
    let choice: (typeof THEME_CHOICES)[number] = 'system';
    const stop = watchSystem(() => choice);
    browser.systemChanges(true);
    expect(applied(browser)).toBe('dark');
    choice = 'light';
    browser.systemChanges(true);
    expect(applied(browser)).toBe('light');
    stop();
    expect(browser.listeners.size).toBe(0);
  });
});

// The script in app.html runs before the stylesheet paints anything. It is
// written out by hand there, so it is checked against the module here.
describe('first-paint script in app.html', () => {
  const html = readFileSync(new URL('../app.html', import.meta.url), 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? '');
  const script = scripts[0] ?? '';

  it('is the only inline script and sits in the head', () => {
    expect(scripts).toHaveLength(1);
    expect(html.indexOf('<script>')).toBeLessThan(html.indexOf('</head>'));
    expect(script).toContain(`'${THEME_STORAGE_KEY}'`);
  });

  const stored = [null, 'system', 'light', 'dark', 'sepia'];
  const cases = stored.flatMap((saved) => [false, true].map((dark) => [saved, dark] as const));

  it.each(cases)('agrees with the module for stored %j, system dark=%s', (saved, prefersDark) => {
    const browser = fakeBrowser(saved, prefersDark);
    runInNewContext(script, browser.globals);
    expect(applied(browser)).toBe(resolveTheme(parseChoice(saved), prefersDark));
  });

  it.each([false, true])('follows the system (dark=%s) when storage is blocked', (prefersDark) => {
    const browser = fakeBrowser('dark', prefersDark, true);
    runInNewContext(script, browser.globals);
    expect(applied(browser)).toBe(prefersDark ? 'dark' : 'light');
  });
});
