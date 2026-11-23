<script setup lang="ts">
import type Game from '@mavonengine/core/Game'

definePageMeta({ layout: false })

// Stopgap until the next core release: the engine cancels mousedown on the
// canvas, which also stops the browser from focusing the page, so clicking back
// into the homepage iframe never returns keyboard input to the game. Do the
// focusing by hand: blur any focused input (e.g. chat) and focus this window.
function refocus(e: MouseEvent) {
  if (!(e.target instanceof HTMLCanvasElement))
    return
  const active = document.activeElement
  if (active instanceof HTMLElement && active !== document.body)
    active.blur()
  window.focus()
}

onMounted(async () => {
  document.addEventListener('mousedown', refocus, true)
  await import('../../../../template-multiplayer/client/src/main')
})

onUnmounted(() => {
  document.removeEventListener('mousedown', refocus, true)
  const game = (window as Window & { Game?: Game }).Game
  if (game) {
    game.canvas?.remove()
    game.uiRoot?.remove()
  }
})
</script>
