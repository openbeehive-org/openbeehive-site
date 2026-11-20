<script lang="ts">
  // System / Light / Dark switch, a compact select so it fits in the page
  // header on phones. The pages are prerendered with "system"; the saved
  // choice is only known in the browser, so it is read after mounting.
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import {
    THEME_CHOICES,
    parseChoice,
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

  function pick(event: Event) {
    choice = parseChoice((event.currentTarget as HTMLSelectElement).value);
    setChoice(choice);
  }
</script>

<select class="pick" aria-label={$_('theme.label')} value={choice} onchange={pick}>
  {#each THEME_CHOICES as c (c)}
    <option value={c}>{$_(`theme.${c}`)}</option>
  {/each}
</select>

<style>
  .pick {
    min-height: 44px;
    padding: 0 10px;
    border: 1px solid var(--border-strong);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }
</style>
