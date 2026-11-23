<script setup lang="ts">
withDefaults(defineProps<{ modifier?: string, keyName?: string, hint?: string }>(), { modifier: 'Ctrl', keyName: 'S', hint: '' })
</script>

<template>
  <div class="mono flex flex-wrap items-center gap-2.5 text-[13px] text-[#a6adc8]">
    <kbd class="kbd">{{ modifier }}</kbd>
    <span>+</span>
    <kbd class="kbd kbd-accent">{{ keyName }}</kbd>
    <span class="ml-2">→ {{ hint }}</span>
  </div>
</template>
