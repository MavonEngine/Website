<script setup lang="ts">
definePageMeta({ layout: false })

onMounted(async () => {
  await import('../../../template-multiplayer/client/src/main')
})

onUnmounted(() => {
  const game = (window as any).Game
  if (game) {
    game.canvas?.remove()
    game.uiRoot?.remove()
  }
})
</script>
