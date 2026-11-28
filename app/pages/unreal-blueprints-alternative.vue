<script setup lang="ts">
// English only, so no /de/ route
defineI18nRoute(false)

const { data: page } = await useAsyncData(
  'page-unreal-blueprints-alternative',
  () => queryCollection('pages').path('/pages/unreal-blueprints-alternative').first()
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useHead({
  bodyAttrs: { class: 'home-body' }
})

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://mavonengine.com/static/logic-graph-editor.png',
  twitterImage: 'https://mavonengine.com/static/logic-graph-editor.png'
})

useSchemaOrg([
  defineWebPage(),
  defineSoftwareApp({
    name: 'MavonEngine',
    operatingSystem: 'Web',
    applicationCategory: 'GameApplication',
    description: 'Open source TypeScript game engine for browser games, with node-based visual scripting (logic graphs) that runs on the client and the server.',
    url: 'https://mavonengine.com',
    offers: {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    keywords: 'unreal blueprints alternative, visual scripting, node graph, browser game engine, threejs game engine'
  })
])
</script>

<template>
  <div>
    <ClientOnly>
      <AppScrollBackground />
    </ClientOnly>
    <div class="home">
      <ContentRenderer
        v-if="page"
        :value="page"
        :prose="false"
      />
    </div>
  </div>
</template>

<style>
.home .campaign-shot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(137, 180, 250, 0.18);
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
}
</style>
