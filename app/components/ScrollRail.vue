<script setup lang="ts">
// The "SCR 000%" scroll progress rail on the left edge, on screens wider than 1000px. Its accent
// colour follows scrollPalette, like the homepage background.
import { scrollPalette, rgbaString } from '~/utils/scrollPalette'

const progress = ref(0)
let frame = 0

function read() {
  frame = 0
  const de = document.documentElement
  const max = de.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(read)
}

let observer: ResizeObserver | undefined

onMounted(() => {
  read()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  // page height changes (navigating between docs, images loading) move the percentage too
  observer = new ResizeObserver(schedule)
  observer.observe(document.body)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  observer?.disconnect()
})

const color = computed(() => scrollPalette(progress.value))
const percent = computed(() => String(Math.round(progress.value * 100)).padStart(3, '0') + '%')
const ticks = Array.from({ length: 21 }, (_, m) => ({ top: `${m * 5}%`, width: m % 5 === 0 ? 8 : 4 }))
</script>

<template>
  <div
    aria-hidden="true"
    class="fixed left-[22px] top-[22vh] h-[56vh] w-px z-[1] pointer-events-none max-[1000px]:hidden"
  >
    <span class="absolute -left-[6.5px] -top-6 font-mono font-medium text-[10px] leading-[10px] text-[rgba(166,173,200,0.75)]">SCR</span>
    <span class="absolute inset-y-0 left-0 w-px bg-[rgba(205,214,244,0.12)]" />
    <span
      v-for="tick in ticks"
      :key="tick.top"
      class="absolute left-0 h-px bg-[rgba(205,214,244,0.12)]"
      :style="{ top: tick.top, width: `${tick.width}px` }"
    />
    <span
      class="absolute top-0 -left-px w-0.5 rounded-full"
      :style="{ height: `${progress * 100}%`, background: rgbaString(color, 0.9) }"
    />
    <span
      class="absolute -left-[3.5px] size-[7px] -mt-[3.5px] rounded-full"
      :style="{ top: `${progress * 100}%`, background: rgbaString(color, 1) }"
    />
    <span
      class="absolute -left-[8.5px] top-[calc(100%+12px)] font-mono font-medium text-[10px] leading-[10px]"
      :style="{ color: rgbaString(color, 0.95) }"
    >{{ percent }}</span>
  </div>
</template>
