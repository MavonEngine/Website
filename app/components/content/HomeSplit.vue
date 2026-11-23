<script setup lang="ts">
// Two-column section: copy on the left, a visual (the default slot) on the right.
withDefaults(defineProps<{
  index?: string
  label?: string
  note?: string
  top?: boolean
}>(), { index: '', label: '', note: '', top: false })
</script>

<template>
  <section class="py-24">
    <div :class="['wrap split', { 'items-start!': top }]">
      <div :class="['flex flex-col gap-[18px]', { 'pt-3': top }]">
        <div class="eyebrow">
          [{{ index }}] // {{ label }}<span
            v-if="note"
            class="text-[#fab387]"
          > · {{ note }}</span>
        </div>
        <h2 class="h2">
          <slot
            name="title"
            mdc-unwrap="p"
          />
        </h2>
        <p class="lead">
          <slot
            name="description"
            mdc-unwrap="p"
          />
        </p>
        <slot name="extra" />
      </div>
      <slot />
    </div>
  </section>
</template>
