<script lang="ts">
  import { _, locale } from 'svelte-i18n';
  import { changeLanguage, SUPPORTED, LANG_LABELS } from '#lib/i18n/index.js';
  import { APP_URL, DEMO_URL, DOCS_URL, GITHUB_URL, SITE_URL } from '#lib/config.js';
  import Footer from '#lib/components/Footer.svelte';
  import Seo from '#lib/components/Seo.svelte';
  import Icon, { ARROW_OUT, HEX } from '#lib/components/Icon.svelte';

  // Structured data for search engines and AI crawlers (English-only is fine).
  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Openbeehive',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: APP_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      license: 'https://www.gnu.org/licenses/agpl-3.0.html',
      sameAs: [GITHUB_URL],
      description:
        'Offline-first, open-source beekeeping records: apiaries, hives, queens, inspections, treatments and harvests, hosted or self-hosted.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Openbeehive',
      url: SITE_URL,
      publisher: {
        '@type': 'Organization',
        name: 'Openbeehive',
        url: SITE_URL,
        sameAs: [GITHUB_URL]
      }
    }
  ]);

  const features = [
    { t: 'landing.feature_records_title', d: 'landing.feature_records_text' },
    { t: 'landing.feature_breeding_title', d: 'landing.feature_breeding_text' },
    { t: 'landing.feature_inventory_title', d: 'landing.feature_inventory_text' },
    { t: 'landing.feature_team_title', d: 'landing.feature_team_text' },
    { t: 'landing.feature_selfhost_title', d: 'landing.feature_selfhost_text' },
    { t: 'landing.feature_api_title', d: 'landing.feature_api_text' }
  ];

  // Phone mock-up tab bar: home, list, grid, menu, more.
  const TAB_ICONS = [
    HEX,
    'M4 5h16v14H4zM4 10h16M4 15h16',
    'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    'M4 7h16M4 12h16M4 17h16',
    'M6 12h.01M12 12h.01M18 12h.01'
  ];
</script>

<Seo
  title="Openbeehive: free, open-source beekeeping records"
  description="Free, open-source beekeeping records. Offline-first hive management: inspections, queens, treatments and harvests, for hobby and professional beekeepers."
  path="/"
/>

<svelte:head>
  <!-- Tag assembled from parts: a literal <script> here would end the component script for Svelte and ESLint. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD serialised from constants above, no user input -->
  {@html '<' + 'script type="application/ld+json">' + jsonLd + '</' + 'script>'}
</svelte:head>

<header class="bar">
  <a class="brand" href="/">
    <span class="mark"><Icon d={HEX} /></span>
    <div>
      <strong>{$_('app.name')}</strong>
      <small>{$_('app.tagline')}</small>
    </div>
  </a>
  <nav>
    <a class="navlink" href="#features">{$_('nav.features')}</a>
    <a class="navlink" href="#why">{$_('nav.why')}</a>
    <a class="navlink" href="#selfhost">{$_('nav.selfhost')}</a>
    <a class="navlink" href={DOCS_URL}>{$_('nav.docs')}</a>
    <a class="navlink" href={GITHUB_URL} rel="noopener" target="_blank">{$_('nav.github')}</a>
    <div class="lang" role="group" aria-label="Language">
      {#each SUPPORTED as l (l)}
        <button
          class:on={$locale?.startsWith(l)}
          onclick={() => changeLanguage(l)}
          title={LANG_LABELS[l]}
          aria-label={LANG_LABELS[l]}>{l.toUpperCase()}</button
        >
      {/each}
    </div>
    <a class="btn-login" href="{APP_URL}/login">{$_('nav.login')}</a>
  </nav>
</header>

<main>
  <section class="hero">
    <div class="hex-field" aria-hidden="true"></div>
    <span class="badge"
      ><img src="/favicon.svg" alt="" width="16" height="16" />{$_('landing.badge')}</span
    >
    <h1>{$_('landing.hero_title')}</h1>
    <p>{$_('landing.hero_sub')}</p>
    <div class="cta">
      <a class="btn primary" href="{APP_URL}/login">{$_('landing.cta_start')}</a>
      <a class="btn ghost" href={DEMO_URL}>{$_('landing.cta_demo')}</a>
      <a class="btn ghost" href={DOCS_URL}>{$_('landing.cta_docs')}</a>
    </div>
  </section>

  <!-- App showcase: stylized phone mock with sample records -->
  <section class="showcase">
    <div class="showcase-copy">
      <h2>{$_('landing.showcase_title')}</h2>
      <p>{$_('landing.showcase_text')}</p>
    </div>

    <div class="phone" aria-hidden="true">
      <div class="phone-screen">
        <div class="m-head">
          <span class="m-mark"><Icon d={HEX} /></span>
          <strong>{$_('nav.dashboard')}</strong>
        </div>
        <div class="m-stats">
          <div class="m-stat"><b>3</b><small>{$_('nav.apiaries')}</small></div>
          <div class="m-stat"><b>24</b><small>{$_('nav.hives')}</small></div>
          <div class="m-stat"><b>21</b><small>{$_('landing.mock_queens')}</small></div>
        </div>
        <div class="m-card">
          <div class="m-row">
            <span class="dot moss"></span> Hive 7 · {$_('landing.mock_queen_seen')}
          </div>
          <div class="m-row">
            <span class="dot honey"></span> Hive 12 · {$_('landing.mock_queen_cells')}
          </div>
          <div class="m-row">
            <span class="dot moss"></span> Orchard · {$_('landing.mock_honey')} 14 kg
          </div>
        </div>
        <div class="m-tabbar">
          {#each TAB_ICONS as d, i (d)}
            <span class:on={i === 0}><Icon {d} /></span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="features">
    {#each features as f, i (f.t)}
      <article class="card" style="--i:{i}">
        <span class="num">{String(i + 1).padStart(2, '0')}</span>
        <h3>{$_(f.t)}</h3>
        <p>{$_(f.d)}</p>
      </article>
    {/each}
  </section>

  <!-- Why: the motivation -->
  <section id="why" class="why">
    <h2>{$_('landing.why_title')}</h2>
    <p class="lead">{$_('landing.why_lead')}</p>
    <div class="why-cols">
      <p>{$_('landing.why_p1')}</p>
      <p>{$_('landing.why_p2')}</p>
    </div>
  </section>

  <!-- Open source band -->
  <section class="opensource">
    <div class="os-inner">
      <div>
        <h2>{$_('landing.opensource_title')}</h2>
        <p>{$_('landing.opensource_text')}</p>
      </div>
      <a class="btn ghost light" href={GITHUB_URL} rel="noopener" target="_blank"
        >{$_('landing.opensource_cta')} <Icon d={ARROW_OUT} /></a
      >
    </div>
  </section>

  <!-- Self-hosting -->
  <section id="selfhost" class="selfhost">
    <h2>{$_('landing.selfhost_title')}</h2>
    <p>{$_('landing.selfhost_text')}</p>
    <code>docker compose up -d &nbsp;·&nbsp; DEPLOYMENT_PROFILE=selfhost</code>
    <p class="docs-link"><a href={DOCS_URL}>{$_('nav.docs')} <Icon d={ARROW_OUT} /></a></p>
  </section>

  <!-- Final CTA -->
  <section class="cta-final">
    <h2>{$_('landing.cta_final_title')}</h2>
    <p>{$_('landing.cta_final_text')}</p>
    <div class="cta">
      <a class="btn primary" href="{APP_URL}/login">{$_('landing.cta_start')}</a>
      <a class="btn ghost" href={DEMO_URL}>{$_('landing.cta_demo')}</a>
    </div>
    <p class="disclaimer">{$_('landing.disclaimer')}</p>
  </section>
</main>

<Footer />

<style>
  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 6vw;
    position: sticky;
    top: 0;
    backdrop-filter: blur(8px);
    background: var(--bg);
    background: color-mix(in srgb, var(--bg) 82%, transparent);
    border-bottom: 1px solid var(--border);
    z-index: 10;
    flex-wrap: wrap;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--text);
  }
  .mark {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    color: var(--cream2);
    background: linear-gradient(150deg, var(--honey-l), var(--honey-d));
    font-size: 20px;
  }
  .brand strong {
    font-family: 'Fraunces', serif;
    font-size: 1.2rem;
    display: block;
    line-height: 1;
  }
  .brand small {
    color: var(--text-soft);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .navlink {
    color: var(--text-soft);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
  }
  .navlink:hover {
    color: var(--accent-text);
  }
  .lang {
    display: flex;
    gap: 3px;
  }
  .lang button {
    background: none;
    border: 1px solid var(--border-strong);
    border-radius: 7px;
    padding: 4px 6px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.72rem;
    color: var(--text-soft);
  }
  .lang button.on {
    background: var(--accent);
    color: var(--on-accent);
    border-color: var(--accent);
  }
  .btn-login {
    background: var(--text);
    color: var(--bg);
    padding: 9px 16px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
  }

  .hero {
    text-align: center;
    padding: 80px 6vw 60px;
    position: relative;
    overflow: hidden;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-soft);
    font-weight: 700;
    font-size: 0.8rem;
    padding: 6px 14px;
    border-radius: 999px;
  }
  .badge img {
    border-radius: 4px;
    margin-bottom: 22px;
  }
  .hero h1 {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 600;
    max-width: 14ch;
    margin: 0 auto;
    line-height: 1.05;
  }
  .hero p {
    color: var(--text-soft);
    font-size: 1.15rem;
    max-width: 52ch;
    margin: 18px auto 0;
    line-height: 1.55;
  }
  .cta {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
  }
  .btn {
    padding: 13px 24px;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
  }
  .btn.primary {
    background: var(--accent);
    color: var(--on-accent);
    box-shadow: 0 6px 18px color-mix(in srgb, var(--brand) 32%, transparent);
  }
  .btn.ghost {
    border: 1px solid var(--border-strong);
    color: var(--text);
  }
  .btn.ghost.light {
    color: var(--on-band);
    white-space: nowrap;
  }
  .btn.ghost.light:focus-visible {
    outline-color: var(--on-band);
  }
  /* Honeycomb outline behind the hero: the SVG is the mask, the colour comes from the theme. */
  .hex-field {
    --hex: url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 16.7v33.3L28 66.6 0 50V16.7z' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E");
    position: absolute;
    inset: 0;
    opacity: 0.06;
    pointer-events: none;
    background: var(--brand);
    -webkit-mask-image: var(--hex);
    mask-image: var(--hex);
  }

  /* Showcase */
  .showcase {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 6vw 30px;
  }
  .showcase-copy h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
  }
  .showcase-copy p {
    color: var(--text-soft);
    line-height: 1.6;
    margin: 12px 0 18px;
    max-width: 46ch;
  }
  .phone {
    display: flex;
    justify-content: center;
  }
  .phone-screen {
    width: 248px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 28px;
    padding: 16px 14px;
    box-shadow: 0 24px 60px var(--shadow);
  }
  .m-head {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Fraunces', serif;
    font-weight: 700;
    padding: 4px 4px 12px;
  }
  .m-mark {
    display: inline-flex;
    color: var(--brand);
    font-size: 1.2rem;
  }
  .m-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
  .m-stat {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 6px;
    text-align: center;
  }
  .m-stat b {
    display: block;
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    color: var(--accent-text);
  }
  .m-stat small {
    color: var(--text-soft);
    font-size: 0.66rem;
  }
  .m-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 6px 4px;
  }
  .m-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 8px;
    font-size: 0.78rem;
    color: var(--text);
    border-bottom: 1px solid var(--border);
  }
  .m-row:last-child {
    border-bottom: none;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot.moss {
    background: var(--ok);
  }
  .dot.honey {
    background: var(--brand);
  }
  .m-tabbar {
    display: flex;
    justify-content: space-between;
    padding: 14px 16px 4px;
    color: var(--text-soft);
    opacity: 0.6;
  }
  .m-tabbar span {
    display: inline-flex;
    font-size: 1.1rem;
  }
  .m-tabbar .on {
    color: var(--brand);
    opacity: 1;
  }

  .features {
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    max-width: 1100px;
    margin: 0 auto;
    padding: 30px 6vw 50px;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 26px;
    animation: rise 0.5s ease both;
    animation-delay: calc(var(--i) * 0.07s);
  }
  .card .num {
    font-family: 'Fraunces', serif;
    color: var(--accent-text);
    font-size: 1.1rem;
    font-weight: 700;
  }
  .card h3 {
    font-size: 1.3rem;
    margin: 8px 0 8px;
  }
  .card p {
    color: var(--text-soft);
    line-height: 1.55;
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .why {
    max-width: 880px;
    margin: 0 auto;
    padding: 40px 6vw;
    text-align: center;
  }
  .why h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  }
  .why .lead {
    color: var(--accent-text);
    font-size: 1.2rem;
    font-weight: 600;
    margin: 12px auto 26px;
    max-width: 40ch;
  }
  .why-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 26px;
    text-align: left;
  }
  .why-cols p {
    color: var(--text-soft);
    line-height: 1.7;
  }

  .opensource {
    background: var(--band-bg);
    color: var(--on-band);
    margin: 30px 0;
  }
  .os-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    flex-wrap: wrap;
  }
  .os-inner h2 {
    font-size: 1.7rem;
    color: var(--on-band);
  }
  .os-inner p {
    color: var(--on-band-soft);
    line-height: 1.6;
    margin-top: 8px;
    max-width: 52ch;
  }

  .selfhost {
    text-align: center;
    padding: 40px 6vw;
    max-width: 760px;
    margin: 0 auto;
  }
  .selfhost h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
  }
  .selfhost p {
    color: var(--text-soft);
    max-width: 54ch;
    margin: 12px auto 18px;
    line-height: 1.6;
  }
  .selfhost code {
    background: var(--band-bg);
    color: var(--on-band);
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    display: inline-block;
  }
  .docs-link {
    margin-top: 16px;
  }
  .docs-link a {
    color: var(--accent-text);
    font-weight: 700;
    text-decoration: none;
  }

  .cta-final {
    text-align: center;
    padding: 50px 6vw 70px;
    border-top: 1px solid var(--border);
  }
  .cta-final h2 {
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  }
  .cta-final > p {
    color: var(--text-soft);
    max-width: 48ch;
    margin: 14px auto 26px;
    line-height: 1.6;
  }
  .cta-final .disclaimer {
    font-size: 0.82rem;
    color: var(--text-soft);
    max-width: 58ch;
    margin: 28px auto 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
  }

  @media (max-width: 760px) {
    .showcase {
      grid-template-columns: 1fr;
    }
    .why-cols {
      grid-template-columns: 1fr;
    }
    .phone {
      order: -1;
    }
  }
</style>
