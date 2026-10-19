import { get } from 'svelte/store';
import { afterEach, describe, expect, it, vi } from 'vitest';

// The module keeps "initialized" state and reads $app/environment; reload it per test.
// svelte-i18n is reloaded too, so its stores come from the same instance the module uses.
async function load(browser: boolean, saved: string | null, navigator?: string) {
  vi.resetModules();
  vi.doMock('$app/environment', () => ({ browser }));
  vi.doMock('svelte-i18n', async (importOriginal) => {
    const original = await importOriginal<typeof import('svelte-i18n')>();
    return { ...original, getLocaleFromNavigator: () => navigator ?? null };
  });
  const storage = new Map<string, string>();
  if (saved) storage.set('lang', saved);
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => storage.set(k, v)
  });
  const lib = await import('svelte-i18n');
  const i18n = await import('./index');
  return { i18n, lib, storage };
}

describe('i18n', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.doUnmock('$app/environment');
    vi.doUnmock('svelte-i18n');
  });

  it('labels every supported language', async () => {
    const { i18n } = await load(false, null);
    expect(Object.keys(i18n.LANG_LABELS).sort()).toEqual([...i18n.SUPPORTED].sort());
  });

  it('falls back to English on the server', async () => {
    const { i18n, lib } = await load(false, null);
    i18n.setupI18n();
    await lib.waitLocale();
    expect(get(lib.locale)).toBe('en');
  });

  it('prefers the saved language in the browser', async () => {
    const { i18n, lib } = await load(true, 'it', 'de-DE');
    i18n.setupI18n();
    await lib.waitLocale();
    expect(get(lib.locale)).toBe('it');
  });

  it('uses the browser language when supported', async () => {
    const { i18n, lib } = await load(true, null, 'fr-FR');
    i18n.setupI18n();
    await lib.waitLocale();
    expect(get(lib.locale)).toBe('fr');
  });

  it('ignores an unsupported browser language', async () => {
    const { i18n, lib } = await load(true, null, 'pt-BR');
    i18n.setupI18n();
    await lib.waitLocale();
    expect(get(lib.locale)).toBe('en');
  });

  it('initialises only once', async () => {
    const { i18n, lib } = await load(true, 'de');
    i18n.setupI18n();
    await lib.waitLocale();
    await lib.locale.set('es');
    i18n.setupI18n();
    expect(get(lib.locale)).toBe('es');
  });

  it('persists a language change', async () => {
    const { i18n, lib, storage } = await load(true, null);
    i18n.setupI18n();
    await lib.waitLocale();
    i18n.changeLanguage('de');
    // locale.set loads the messages first; wait for the switch to land.
    await lib.waitLocale('de');
    expect(get(lib.locale)).toBe('de');
    expect(storage.get('lang')).toBe('de');
  });
});
