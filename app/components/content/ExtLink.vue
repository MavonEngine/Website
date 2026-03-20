<template>
  <a :href="href"><slot /></a>
</template>

<script setup lang="ts">
defineProps<{ href: string }>()
</script>
