<script module lang="ts">
  // Shared paths on the 24x24 grid: the hexagon brand mark and the external-link arrow.
  export const HEX = 'M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z';
  export const ARROW_OUT = 'M7 17L17 7M8 7h9v9';
</script>

<script lang="ts">
  // Inline stroke icon sized by the parent's font-size; decorative, so hidden from assistive tech.
  let { d }: { d: string } = $props();
</script>

<svg
  viewBox="0 0 24 24"
  width="1em"
  height="1em"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"><path {d} /></svg
>
