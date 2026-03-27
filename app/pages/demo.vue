<script setup lang="ts">
import type Game from '@mavonengine/core/Game'

definePageMeta({ layout: false })

onMounted(async () => {
  await import('../../../template-multiplayer/client/src/main')
})

onUnmounted(() => {
  const game = (window as Window & { Game?: Game }).Game
  if (game) {
    game.canvas?.remove()
    game.uiRoot?.remove()
  }
})
</script>
