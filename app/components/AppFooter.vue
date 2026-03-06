<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default mt-auto">
    <UContainer>
      <div class="py-12 flex flex-col md:flex-row gap-8 md:gap-0">
        <!-- Brand -->
        <div class="flex-1">
          <NuxtLink :to="localePath('/')">
            <AppLogo class="h-5 w-auto mb-3" />
          </NuxtLink>
          <p class="text-sm text-muted max-w-xs leading-relaxed">
            {{ t('footer.description') }}
          </p>
        </div>

        <!-- Link columns -->
        <div class="flex gap-12 text-sm">
          <div>
            <div class="text-xs font-medium uppercase tracking-wider text-muted mb-3">
              {{ t('footer.engine') }}
            </div>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  :to="localePath('/') + '#features'"
                  class="text-muted hover:text-default transition-colors"
                >
                  {{ t('footer.features') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="localePath('/') + '#usecases'"
                  class="text-muted hover:text-default transition-colors"
                >
                  {{ t('footer.usecases') }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <div class="text-xs font-medium uppercase tracking-wider text-muted mb-3">
              {{ t('footer.community') }}
            </div>
            <ul class="space-y-2">
              <li>
                <a
                  href="/community"
                  class="text-muted hover:text-default transition-colors"
                >
                  {{ t('footer.forum') }}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mavonengine/mavonengine"
                  target="_blank"
                  class="text-muted hover:text-default transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="py-5 border-t border-default flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
        <span>© {{ year }} MavonEngine.</span>
        <span>{{ t('footer.madeWith') }}</span>
        <NuxtLink
          v-if="locale === 'de'"
          :to="localePath('/impressum')"
          class="hover:text-default transition-colors"
        >
          Impressum
        </NuxtLink>
      </div>
    </UContainer>
  </footer>
</template>
