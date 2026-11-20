<script lang="ts">
  let { children } = $props();
</script>

{@render children()}

<style>
  /* Self-hosted fonts (static/fonts): no requests leave this domain. */
  @font-face {
    font-family: 'Fraunces';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/fraunces-v38-latin_latin-ext-500.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Fraunces';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/fraunces-v38-latin_latin-ext-600.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Fraunces';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/fraunces-v38-latin_latin-ext-700.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Hanken Grotesk';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/hanken-grotesk-v12-latin_latin-ext-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Hanken Grotesk';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/hanken-grotesk-v12-latin_latin-ext-500.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Hanken Grotesk';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/hanken-grotesk-v12-latin_latin-ext-600.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Hanken Grotesk';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/hanken-grotesk-v12-latin_latin-ext-700.woff2') format('woff2');
  }

  /* Brand palette, shared with the app. */
  :global(:root) {
    --cream: #fbf6ea;
    --cream2: #fffdf7;
    --ink: #2c2316;
    --ink-soft: #6b5e48;
    --honey: #c77f22;
    --honey-d: #a4641a;
    --honey-l: #e9a744;
    --moss: #5c6b4a;
    --line: #e5dcc6;
  }

  /* Semantic tokens. Pages and components use only these; the dark theme is
     the one block below that redefines them. Contrast: text pairs are at least
     4.5:1, control borders and focus rings at least 3:1. */
  :global(:root) {
    color-scheme: light;
    --bg: var(--cream);
    --surface: var(--cream2);
    --text: var(--ink);
    --text-soft: var(--ink-soft);
    --border: var(--line); /* separators and card outlines */
    --border-strong: #8f8270; /* borders of buttons and other controls */
    --accent: var(--honey-d); /* filled buttons, with --on-accent */
    --on-accent: #ffffff;
    --accent-text: #8a5210; /* accent-coloured text and links on --bg / --surface */
    --brand: var(--honey); /* hexagon mark and decorative dots */
    --ok: var(--moss);
    --band-bg: var(--ink); /* inverted band and code block */
    --on-band: var(--cream2);
    --on-band-soft: #c4c0b8;
    --shadow: rgba(44, 35, 22, 0.16);
  }
  :global(:root[data-theme='dark']) {
    color-scheme: dark;
    --bg: #1b160e;
    --surface: #261f14;
    --text: #f5ecda;
    --text-soft: #c9bca3;
    --border: #3d3222;
    --accent: var(--honey-l);
    --on-accent: var(--ink);
    --accent-text: var(--honey-l);
    --ok: #a3b58c;
    --band-bg: #32281a;
    --on-band: #f5ecda;
    --on-band-soft: #c9bca3;
    --shadow: rgba(0, 0, 0, 0.5);
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :global(body) {
    font-family: 'Hanken Grotesk', system-ui, sans-serif;
    color: var(--text);
    background: var(--bg);
    background-image:
      radial-gradient(
        circle at 100% 0%,
        color-mix(in srgb, var(--honey-l) 12%, transparent),
        transparent 45%
      ),
      radial-gradient(
        circle at 0% 100%,
        color-mix(in srgb, var(--moss) 8%, transparent),
        transparent 40%
      );
    min-height: 100vh;
  }
  :global(h1),
  :global(h2),
  :global(h3) {
    font-family: 'Fraunces', serif;
    letter-spacing: -0.01em;
  }
  :global(:focus-visible) {
    outline: 2px solid var(--accent-text);
    outline-offset: 2px;
  }
</style>
