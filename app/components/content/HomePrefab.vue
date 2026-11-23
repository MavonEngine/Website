<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  tag?: string
  video: string
  videoTitle?: string
  tone?: 'green' | 'sapphire'
}>(), { tag: '', videoTitle: undefined, tone: 'green' })

// The backdrop is the design's placeholder, shown until the video loads (and if it fails to)
const tones = {
  green: {
    color: '#a6e3a1',
    border: 'rgba(166,227,161,0.35)',
    backdrop: 'linear-gradient(180deg, rgba(17,17,27,0) 0%, rgba(166,227,161,0.10) 100%), repeating-linear-gradient(100deg, rgba(166,227,161,0.10) 0 2px, transparent 2px 9px)'
  },
  sapphire: {
    color: '#74c7ec',
    border: 'rgba(116,199,236,0.35)',
    backdrop: 'linear-gradient(180deg, rgba(17,17,27,0) 0%, rgba(116,199,236,0.14) 100%), repeating-radial-gradient(ellipse at 50% 120%, rgba(116,199,236,0.12) 0 2px, transparent 2px 14px)'
  }
}
const tone = computed(() => tones[props.tone])

const videoEl = ref<HTMLVideoElement | null>(null)
const failed = ref(false)
onMounted(() => {
  // the load can fail before hydration attaches @error
  if (videoEl.value?.error) {
    failed.value = true
    return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  videoEl.value?.play().catch(() => {})
})
</script>

<template>
  <article class="glass card hud rounded-[14px] overflow-hidden">
    <div
      class="aspect-video"
      :style="{ background: tone.backdrop }"
    >
      <video
        v-if="!failed"
        ref="videoEl"
        :src="video"
        :title="videoTitle"
        loop
        muted
        playsinline
        controls
        preload="metadata"
        class="block size-full object-cover"
        @error="failed = true"
      />
    </div>
    <div class="py-[22px] px-6 flex flex-col gap-2">
      <div class="flex items-center gap-2.5">
        <h3 class="m-0 display text-[22px] font-semibold text-[#cdd6f4]">
          {{ title }}
        </h3>
        <span
          v-if="tag"
          class="mono text-[11px] py-0.5 px-2 rounded-[5px] border"
          :style="{ color: tone.color, borderColor: tone.border }"
        >{{ tag }}</span>
      </div>
      <p class="m-0 text-[15px] leading-[1.6] text-[#a6adc8]">
        <slot mdc-unwrap="p" />
      </p>
    </div>
  </article>
</template>
