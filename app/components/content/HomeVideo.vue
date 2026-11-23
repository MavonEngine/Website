<script setup lang="ts">
// A looping, muted video in a HUD panel. Under reduced motion it doesn't autoplay; the controls stay.
withDefaults(defineProps<{
  src: string
  title?: string
  aspect?: string
}>(), { title: undefined, aspect: '16 / 10' })

const video = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  video.value?.play().catch(() => {})
})
</script>

<template>
  <div
    class="glass hud rounded-[14px] overflow-hidden"
    :style="{ aspectRatio: aspect }"
  >
    <video
      ref="video"
      :src="src"
      :title="title"
      loop
      muted
      playsinline
      controls
      preload="metadata"
      class="block size-full object-cover"
    />
  </div>
</template>
