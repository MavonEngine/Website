<script setup lang="ts">
withDefaults(defineProps<{
  badge?: string
  command?: string
  tags?: string[]
}>(), { badge: '', command: '', tags: () => [] })
</script>

<template>
  <section class="pt-24 pb-18">
    <div class="wrap hero-grid">
      <div class="flex flex-col gap-7">
        <div
          v-if="badge"
          class="mono inline-flex self-start items-center gap-2.5 py-1.5 pr-3.5 pl-2.5 rounded-full border border-[rgba(137,180,250,0.3)] bg-[rgba(137,180,250,0.07)] text-xs text-[#b4befe] tracking-[0.04em]"
        >
          <span class="live size-2 rounded-full bg-[#a6e3a1] shadow-[0_0_10px_#a6e3a1]" />
          {{ badge }}
        </div>
        <h1 class="m-0 display font-bold text-[clamp(44px,6.2vw,84px)] leading-[0.98] tracking-[-0.035em] text-[#cdd6f4]">
          <slot
            name="title"
            mdc-unwrap="p"
          />
        </h1>
        <p class="m-0 text-lg leading-[1.65] text-[#a6adc8] max-w-[560px]">
          <slot
            name="description"
            mdc-unwrap="p"
          />
        </p>
        <div class="flex flex-wrap gap-3">
          <slot
            name="links"
            mdc-unwrap="p"
          />
        </div>
        <div
          v-if="command"
          class="mono flex items-center gap-3 py-3 px-4 rounded-[10px] bg-[rgba(17,17,27,0.7)] border border-dashed border-[rgba(137,180,250,0.25)] text-sm text-[#cdd6f4] self-start max-w-full box-border overflow-x-auto"
        >
          <span class="text-[#a6e3a1]">$</span>
          <span class="whitespace-nowrap">{{ command }}</span>
          <span class="cursor w-2 h-[18px] bg-[#89b4fa] flex-none" />
        </div>
        <div
          v-if="tags.length"
          class="mono flex flex-wrap gap-2 text-xs text-[#9399b2]"
        >
          <span
            v-for="tag in tags"
            :key="tag"
            class="py-1 px-2.5 border border-[rgba(205,214,244,0.1)] rounded-md"
          >{{ tag }}</span>
        </div>
      </div>

      <slot />
    </div>
  </section>
</template>
