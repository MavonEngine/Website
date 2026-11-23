<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <details>
    <summary>
      {{ label }}
      <svg
        class="pl"
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      ><path d="M12 5v14M5 12h14" /></svg>
    </summary>
    <div class="faq-a">
      <slot />
    </div>
  </details>
</template>
