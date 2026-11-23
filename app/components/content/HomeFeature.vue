<script setup lang="ts">
// A feature card: with `icon` it is an engine feature, with `number` a numbered "built different" card.
withDefaults(defineProps<{
  title: string
  icon?: string
  number?: string
  wide?: boolean
}>(), { icon: undefined, number: undefined, wide: false })
</script>

<template>
  <article
    :class="['glass card rounded-[14px] flex flex-col', number ? 'p-[26px] gap-2.5' : 'p-6 gap-3', { 'span-2': wide }]"
  >
    <div
      v-if="icon"
      class="ico size-10 rounded-[10px] flex items-center justify-center text-[#89b4fa] bg-[rgba(137,180,250,0.1)] border border-[rgba(137,180,250,0.25)]"
    >
      <UIcon
        :name="icon"
        class="size-5"
      />
    </div>
    <div
      v-if="number"
      class="mono text-[13px] text-[#89b4fa]"
    >
      {{ number }}
    </div>
    <h3 :class="['m-0 display font-semibold text-[#cdd6f4]', number ? 'text-[21px]' : 'text-[19px]']">
      {{ title }}
    </h3>
    <p class="m-0 text-[14.5px] leading-[1.6] text-[#a6adc8]">
      <slot mdc-unwrap="p" />
    </p>
  </article>
</template>
