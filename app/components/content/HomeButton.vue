<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  variant?: 'primary' | 'outline'
  icon?: string
  target?: string
}>(), { variant: 'primary', icon: undefined, target: undefined })
</script>

<template>
  <NuxtLink
    :to="to"
    :target="target"
    :class="['btn', variant === 'outline' ? 'btn-o' : 'btn-p']"
  >
    <slot mdc-unwrap="p" />
    <UIcon
      v-if="icon"
      :name="icon"
      class="size-[18px] shrink-0"
    />
  </NuxtLink>
</template>
