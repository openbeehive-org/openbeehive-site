<script lang="ts">
  // System / Light / Dark switch. The pages are prerendered with "system"; the
  // saved choice is only known in the browser, so it is read after mounting.
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import {
    THEME_CHOICES,
    readChoice,
    setChoice,
    watchSystem,
    type ThemeChoice
  } from '#lib/theme.js';

  let choice = $state<ThemeChoice>('system');

  onMount(() => {
    choice = readChoice();
    return watchSystem(() => choice);
  });

  function pick(next: ThemeChoice) {
    choice = next;
    setChoice(next);
  }
</script>

<div class="theme" role="group" aria-label={$_('theme.label')}>
  {#each THEME_CHOICES as c (c)}
    <button type="button" aria-pressed={choice === c} onclick={() => pick(c)}
      >{$_(`theme.${c}`)}</button
    >
  {/each}
</div>

<style>
  .theme {
    display: inline-flex;
    border: 1px solid var(--border-strong);
    border-radius: 9px;
    overflow: hidden;
  }
  button {
    background: none;
    border: none;
    border-left: 1px solid var(--border-strong);
    padding: 6px 12px;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--text-soft);
  }
  button:first-child {
    border-left: none;
  }
  button:hover {
    color: var(--text);
  }
  button[aria-pressed='true'] {
    background: var(--accent);
    color: var(--on-accent);
  }
  /* The group clips its children, so the focus ring is drawn inside the button. */
  button:focus-visible {
    outline-offset: -4px;
    outline-color: var(--text);
  }
  button[aria-pressed='true']:focus-visible {
    outline-color: var(--on-accent);
  }
</style>
