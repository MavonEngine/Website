<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const docsPath = computed(() => locale.value === 'de' ? '/de/erste-schritte' : '/getting-started')
</script>

<template>
  <header class="mavon-header">
    <div class="mavon-header-inner">
      <NuxtLink
        :to="localePath('/')"
        class="mavon-logo"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#89b4fa"
          stroke-width="1.5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span class="mavon-logo-text">MavonEngine</span>
      </NuxtLink>

      <nav class="mavon-nav">
        <NuxtLink
          :to="localePath('/') + '#features'"
          class="mavon-nav-link"
        >{{ t('nav.features') }}</NuxtLink>
        <NuxtLink
          :to="localePath('/') + '#usecases'"
          class="mavon-nav-link"
        >{{ t('nav.usecases') }}</NuxtLink>
        <NuxtLink
          :to="docsPath"
          class="mavon-nav-link"
        >{{ t('nav.docs') }}</NuxtLink>
        <a
          href="/community"
          class="mavon-nav-link"
        >{{ t('nav.community') }}</a>
      </nav>

      <div class="mavon-header-right">
        <div class="mavon-lang-switcher">
          <NuxtLink
            :to="switchLocalePath('en')"
            :class="['mavon-lang-btn', { 'mavon-lang-active': locale === 'en' }]"
          >EN</NuxtLink>
          <NuxtLink
            :to="switchLocalePath('de')"
            :class="['mavon-lang-btn', { 'mavon-lang-active': locale === 'de' }]"
          >DE</NuxtLink>
        </div>
        <div class="flex items-center">
          <GitHubStarButton />
        </div>
        <NuxtLink
          :to="docsPath"
          class="mavon-cta"
        >{{ t('nav.getStarted') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
