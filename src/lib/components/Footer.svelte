<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { APP_URL, DOCS_URL, GITHUB_URL } from '#lib/config.js';
  import Icon, { HEX } from '#lib/components/Icon.svelte';
  // Prerendered with the build year; hydration updates it to the visitor's year.
  const year = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="inner">
    <div class="brand">
      <span class="mark"><Icon d={HEX} /></span>
      <div>
        <strong>{$_('app.name')}</strong>
        <small>{$_('footer.tagline')}</small>
      </div>
    </div>
    <nav class="links" aria-label={$_('footer.label')}>
      <a href="/about">{$_('footer.about')}</a>
      <a href="/imprint">{$_('footer.imprint')}</a>
      <a href="/privacy">{$_('footer.privacy')}</a>
      <a href={DOCS_URL}>{$_('nav.docs')}</a>
      <a href={GITHUB_URL} rel="noopener" target="_blank">{$_('nav.github')}</a>
      <a href={APP_URL}>{$_('landing.cta_start')}</a>
    </nav>
  </div>
  <div class="legal">
    <span>© {year} {$_('app.name')} · {$_('footer.license')}</span>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid var(--border);
    background: var(--surface);
    padding: 28px 22px 24px;
  }
  .inner {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 11px;
  }
  .brand .mark {
    display: inline-flex;
    font-size: 1.6rem;
    color: var(--brand);
  }
  .brand strong {
    font-family: 'Fraunces', serif;
    display: block;
  }
  .brand small {
    color: var(--text-soft);
    font-size: 0.8rem;
  }
  .links {
    display: flex;
    gap: 0 12px;
    flex-wrap: wrap;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--text-soft);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .links a:hover {
    color: var(--accent-text);
  }
  .legal {
    max-width: 1080px;
    margin: 18px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    color: var(--text-soft);
    font-size: 0.8rem;
  }
</style>
