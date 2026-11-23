<script setup lang="ts">
defineProps<{ label?: string, links: { label: string, to: string }[] }>()
</script>

<template>
  <nav
    :aria-label="label"
    class="flex flex-wrap gap-2 mt-1"
  >
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="link-pill"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
