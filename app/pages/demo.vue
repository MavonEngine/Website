<script setup lang="ts">
definePageMeta({ layout: false })

onMounted(async () => {
  await import('../../../template-multiplayer/client/src/main')
})
</script>
