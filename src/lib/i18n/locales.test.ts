import { describe, expect, it } from 'vitest';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import itMessages from './locales/it.json';

// Every locale must carry exactly the keys of the English fallback, all non-empty.
function keyPaths(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}

function leaves(obj: unknown): unknown[] {
  if (typeof obj !== 'object' || obj === null) return [obj];
  return Object.values(obj).flatMap(leaves);
}

const expected = keyPaths(en).sort();

describe('locales', () => {
  it.each([
    ['de', de],
    ['fr', fr],
    ['es', es],
    ['it', itMessages]
  ])('%s has the same keys as en', (_, messages) => {
    expect(keyPaths(messages).sort()).toEqual(expected);
  });

  it.each([
    ['en', en],
    ['de', de],
    ['fr', fr],
    ['es', es],
    ['it', itMessages]
  ])('%s has no empty strings', (_, messages) => {
    for (const leaf of leaves(messages)) {
      expect(typeof leaf).toBe('string');
      expect((leaf as string).trim()).not.toBe('');
    }
  });
});
