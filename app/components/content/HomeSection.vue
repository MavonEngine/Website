<script setup lang="ts">
// A homepage section with the "[01] // LABEL" eyebrow, a heading and an optional description.
// Content in the `aside` slot sits to the right of the heading (wrapping below it on narrow screens).
withDefaults(defineProps<{
  id?: string
  index?: string
  label?: string
  note?: string
  center?: boolean
  narrow?: boolean
  maxWidth?: number
  large?: boolean
}>(), { id: undefined, index: '', label: '', note: '', center: false, narrow: false, maxWidth: 720, large: false })
</script>

<template>
  <section
    :id="id"
    :class="['py-24', { 'scroll-mt-16': id }]"
  >
    <div
      class="wrap"
      :style="narrow ? { maxWidth: '880px' } : undefined"
    >
      <div :class="$slots.aside ? 'flex flex-wrap justify-between items-end gap-8 mb-10' : (narrow ? 'mb-8' : 'mb-12')">
        <div
          :class="{ 'text-center mx-auto': center }"
          :style="{ maxWidth: `${maxWidth}px` }"
        >
          <div
            v-if="index || label"
            class="eyebrow mb-4"
          >
            <template v-if="index">
              [{{ index }}] //
            </template>{{ label }}<span
              v-if="note"
              class="text-[#fab387]"
            > · {{ note }}</span>
          </div>
          <h2 :class="['h2', { 'mb-4': $slots.description }]">
            <slot
              name="title"
              mdc-unwrap="p"
            />
          </h2>
          <p
            v-if="$slots.description"
            :class="['lead', { 'lead-lg': large }]"
          >
            <slot
              name="description"
              mdc-unwrap="p"
            />
          </p>
        </div>
        <slot name="aside" />
      </div>
      <slot />
    </div>
  </section>
</template>
