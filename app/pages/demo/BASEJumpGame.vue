<script setup lang="ts">
import type Game from '@mavonengine/core/Game'

definePageMeta({ layout: false })

useSeoMeta({
  ogImage: 'https://mavonengine.com/baseScreenshot.jpg',
  twitterImage: 'https://mavonengine.com/baseScreenshot.jpg'
})

onMounted(async () => {
  await import('../../../../base-jump/src/main')
})

onUnmounted(() => {
  const game = (window as Window & { Game?: Game }).Game
  if (game) {
    game.canvas?.remove()
    game.uiRoot?.remove()
  }
})
</script>
