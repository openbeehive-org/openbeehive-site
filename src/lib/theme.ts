// Colour theme. The site follows the system setting unless the visitor picks
// light or dark; the choice is kept per device in localStorage. The inline
// script in src/app.html applies the same rule before the first paint, so a
// saved dark theme never flashes light.
export const THEME_CHOICES = ['system', 'light', 'dark'] as const;
export type ThemeChoice = (typeof THEME_CHOICES)[number];
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// Anything that is not a known choice (nothing saved, a stale value) means "system".
export function parseChoice(value: unknown): ThemeChoice {
  return THEME_CHOICES.includes(value as ThemeChoice) ? (value as ThemeChoice) : 'system';
}

export function resolveTheme(choice: ThemeChoice, prefersDark: boolean): Theme {
  if (choice === 'system') return prefersDark ? 'dark' : 'light';
  return choice;
}

// Storage can be unavailable (private mode, blocked site data); the site then follows the system.
export function readChoice(): ThemeChoice {
  try {
    return parseChoice(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return 'system';
  }
}

// The stylesheet keys the dark tokens on <html data-theme="dark">.
export function applyChoice(choice: ThemeChoice): Theme {
  const theme = resolveTheme(choice, matchMedia(DARK_QUERY).matches);
  document.documentElement.dataset.theme = theme;
  return theme;
}

export function setChoice(choice: ThemeChoice): Theme {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Without storage the choice lasts for this page view only.
  }
  return applyChoice(choice);
}

// Re-applies the theme when the system setting changes, which matters while the
// choice is "system". Returns the function that stops watching.
export function watchSystem(current: () => ThemeChoice): () => void {
  const query = matchMedia(DARK_QUERY);
  const onChange = () => {
    applyChoice(current());
  };
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
