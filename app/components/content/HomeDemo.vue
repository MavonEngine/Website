<script setup lang="ts">
// The demo panel under the hero. BASE Jump runs on its own host (airsports.<domain>).
withDefaults(defineProps<{
  label?: string
  title?: string
  multiplayer?: string
  singlePlayer?: string
  alt?: string
}>(), {
  label: 'LIVE DEMO',
  title: 'Play it in your browser — no install.',
  multiplayer: 'BASE Jump · multiplayer',
  singlePlayer: 'Paper Train · single-player',
  alt: 'BASE Jump, a multiplayer MavonEngine demo running in the browser'
})

const { airsportsUrl } = useRuntimeConfig().public
</script>

<template>
  <section class="pt-6 pb-24">
    <div class="wrap">
      <div class="glass hud rounded-2xl p-2.5 shadow-[0_50px_140px_-50px_rgba(116,199,236,0.4)]">
        <div class="relative rounded-[10px] overflow-hidden">
          <img
            src="/baseScreenshot.jpg"
            :alt="alt"
            width="2258"
            height="1444"
            loading="lazy"
            class="block w-full h-auto aspect-[2258/1444] object-cover"
          >
          <div
            aria-hidden="true"
            class="absolute inset-0 pointer-events-none max-sm:hidden bg-[linear-gradient(180deg,rgba(17,17,27,0)_55%,rgba(17,17,27,0.92)_100%)]"
          />
          <div class="absolute inset-x-0 bottom-0 p-6 max-sm:static max-sm:px-2 max-sm:pb-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div class="mono text-xs text-[#89b4fa] tracking-[0.1em]">
                <span class="live">●</span> {{ label }}
              </div>
              <div class="display font-semibold text-[22px] sm:text-[28px] text-[#cdd6f4] mt-1.5">
                {{ title }}
              </div>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <a
                class="btn btn-p"
                :href="airsportsUrl"
              >{{ multiplayer }}</a>
              <NuxtLink
                class="btn btn-o"
                to="/demo/paper-train"
              >{{ singlePlayer }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
