<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `index-${locale.value}`,
  () => {
    if (locale.value === 'de') {
      return queryCollection('landing_de').first()
    }
    return queryCollection('landing').path('/').first()
  }
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
  ogImage: 'https://mavonengine.com/community/assets/site-image-kipwrzwn.png',
  twitterImage: 'https://mavonengine.com/community/assets/site-image-kipwrzwn.png'
})

// FAQ structured data, taken from the page's own home-faq-item blocks so it always matches what's shown
type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

function textOf(node: MinimarkNode): string {
  if (typeof node === 'string') return node
  const [, , ...children] = node
  return children.map(textOf).join('')
}

function faqItems(nodes: MinimarkNode[], out: { name: string, text: string }[] = []) {
  for (const node of nodes) {
    if (typeof node === 'string') continue
    const [tag, props, ...children] = node
    if (tag === 'home-faq-item' && typeof props.label === 'string') {
      out.push({ name: props.label, text: children.map(textOf).join(' ').replace(/\s+/g, ' ').trim() })
    } else {
      faqItems(children, out)
    }
  }
  return out
}

const faqSchema = {
  '@type': 'FAQPage',
  'mainEntity': faqItems((page.value.body as { value?: MinimarkNode[] }).value ?? []).map(q => ({
    '@type': 'Question',
    'name': q.name,
    'acceptedAnswer': { '@type': 'Answer', 'text': q.text }
  }))
}

useSchemaOrg([
  faqSchema,
  defineSoftwareApp({
    name: 'MavonEngine',
    operatingSystem: 'Web',
    applicationCategory: 'GameApplication',
    description: 'Full-stack Three.js game engine for single-player and multiplayer browser games — with server-authoritative physics, real-time networking, and a unified server-client architecture.',
    url: 'https://mavonengine.com',
    offers: {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    keywords: 'threejs game engine, three.js, multiplayer browser games, webgl game engine, rapier physics'
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
