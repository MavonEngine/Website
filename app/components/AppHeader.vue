<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
// Docs slugs are translated (getting-started ↔ erste-schritte), which switchLocalePath doesn't know
// about, so take the other language's path from the same map the hreflang links use
const { alternatePath } = useContentI18n()
function langPath(code: 'en' | 'de') {
  const path = code === locale.value ? route.path : alternatePath.value
  return path.length > 1 ? path.replace(/\/$/, '') : path
}
const docsPath = computed(() => locale.value === 'de' ? '/de/erste-schritte' : '/getting-started')
</script>

<template>
  <header class="mavon-header">
    <div class="mavon-header-inner">
      <NuxtLink
        :to="localePath('/')"
        class="mavon-logo"
        :aria-label="t('nav.home')"
      >
        <span class="mavon-logo-badge">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#89b4fa"
            stroke-width="1.6"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </span>
        <span class="mavon-logo-text">MavonEngine</span>
      </NuxtLink>

      <nav
        class="mavon-nav"
        :aria-label="t('nav.primary')"
      >
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
        <div class="mavon-lang-switcher hide-sm">
          <NuxtLink
            :to="langPath('en')"
            :class="['mavon-lang-btn', { 'mavon-lang-active': locale === 'en' }]"
            hreflang="en"
          >EN</NuxtLink>
          <span
            class="mavon-lang-sep"
            aria-hidden="true"
          >/</span>
          <NuxtLink
            :to="langPath('de')"
            :class="['mavon-lang-btn', { 'mavon-lang-active': locale === 'de' }]"
            hreflang="de"
          >DE</NuxtLink>
        </div>
        <a
          class="mavon-star hide-sm"
          href="https://github.com/MavonEngine/Core"
          target="_blank"
          rel="noopener"
          aria-label="Star MavonEngine/Core on GitHub"
        >
          <UIcon
            name="i-simple-icons-github"
            class="size-4"
          />
          {{ t('nav.star') }}
        </a>
        <NuxtLink
          :to="docsPath"
          class="btn btn-p btn-sm"
        >{{ t('nav.getStarted') }}</NuxtLink>
      </div>
    </div>
  </header>
</template>
