<script setup lang="ts">
withDefaults(defineProps<{ eyebrow?: string }>(), { eyebrow: '' })
</script>

<template>
  <section class="pt-18 pb-30">
    <div class="wrap">
      <div class="glass hud rounded-[20px] text-center py-[clamp(40px,6vw,80px)] px-[clamp(24px,5vw,72px)] bg-[radial-gradient(ellipse_70%_90%_at_50%_0%,rgba(137,180,250,0.18),transparent_70%),rgba(24,24,37,0.7)]! shadow-[0_60px_160px_-60px_rgba(137,180,250,0.5)]">
        <div
          v-if="eyebrow"
          class="eyebrow mb-5"
        >
          {{ eyebrow }}
        </div>
        <h2 class="mx-auto mb-5 mt-0 max-w-[760px] display font-bold text-[clamp(38px,5.2vw,68px)] leading-none tracking-[-0.035em] text-[#cdd6f4]">
          <slot
            name="title"
            mdc-unwrap="p"
          />
        </h2>
        <p class="mx-auto mb-8 mt-0 max-w-[760px] mono text-sm leading-[1.9] text-[#a6adc8] [&_strong]:font-normal [&_strong]:text-[#cdd6f4]">
          <slot
            name="description"
            mdc-unwrap="p"
          />
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <slot
            name="links"
            mdc-unwrap="p"
          />
        </div>
      </div>
    </div>
  </section>
</template>
