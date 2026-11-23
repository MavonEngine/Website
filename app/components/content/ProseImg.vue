<script setup lang="ts">
// Nuxt UI's ProseImg renders through NuxtImg, which sends the image to IPX. Files under /static/ aren't part of
// this app: Caddy serves them from the repo's static/ dir, so IPX can't find them (404s that fail the prerender).
// Those go out as they are, everything else is optimised as before.
import UProseImg from '@nuxt/ui/components/prose/Img.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ src: string }>()
const attrs = useAttrs()
</script>

<template>
  <UProseImg
    v-bind="attrs"
    :src="props.src"
    :provider="props.src.startsWith('/static/') ? 'none' : undefined"
  />
</template>
