<script setup lang="ts">
const { seo } = useAppConfig()
const { locale } = useI18n()

const { data: navEn } = await useAsyncData('navigation-en', () => queryCollectionNavigation('docs'))
const { data: navDe } = await useAsyncData('navigation-de', () => queryCollectionNavigation('docs_de'))
const navigation = computed(() => locale.value === 'de' ? (navDe.value?.[0]?.children ?? navDe.value) : navEn.value)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://cloud.umami.is' }
  ],
  htmlAttrs: {
    lang: locale
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />
  </UApp>
</template>
