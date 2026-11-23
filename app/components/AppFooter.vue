<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
const { airsportsUrl } = useRuntimeConfig().public
</script>

<template>
  <footer class="mavon-footer">
    <div class="mavon-footer-wrap flex flex-wrap justify-between gap-12 pt-14 pb-10">
      <div class="flex flex-col gap-3 max-w-[300px]">
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2.5"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#89b4fa"
            stroke-width="1.6"
            stroke-linejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span class="font-display font-bold text-[17px] text-[#cdd6f4]">MavonEngine</span>
        </NuxtLink>
        <p class="m-0 text-sm leading-relaxed text-[#9399b2]">
          {{ t('footer.description') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-16 text-sm">
        <nav
          :aria-label="t('footer.engine')"
          class="flex flex-col gap-3"
        >
          <div class="mavon-footer-label">
            {{ t('footer.engine').toUpperCase() }}
          </div>
          <NuxtLink :to="localePath('/') + '#features'">
            {{ t('footer.features') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/') + '#usecases'">
            {{ t('footer.usecases') }}
          </NuxtLink>
          <a
            href="https://github.com/MavonEngine/Core"
            target="_blank"
            rel="noopener"
          >GitHub</a>
        </nav>

        <nav
          :aria-label="t('footer.demos')"
          class="flex flex-col gap-3"
        >
          <div class="mavon-footer-label">
            {{ t('footer.demos').toUpperCase() }}
          </div>
          <a href="/demo/paper-train">Paper Train ({{ t('footer.singlePlayer') }})</a>
          <a :href="airsportsUrl">BASE Jump ({{ t('footer.multiplayer') }})</a>
        </nav>

        <nav
          :aria-label="t('footer.community')"
          class="flex flex-col gap-3"
        >
          <div class="mavon-footer-label">
            {{ t('footer.community').toUpperCase() }}
          </div>
          <a href="/community">{{ t('footer.forum') }}</a>
          <a
            href="https://github.com/mavonengine"
            target="_blank"
            rel="noopener"
          >GitHub</a>
        </nav>
      </div>
    </div>

    <div class="mavon-footer-wrap flex flex-wrap justify-between gap-3 pt-5 pb-7 border-t border-[rgba(137,180,250,0.08)] font-mono text-xs text-[#9399b2]">
      <span>© {{ year }} MavonEngine</span>
      <NuxtLink
        :to="localePath('/impressum')"
        class="!text-[#9399b2]"
      >
        Impressum
      </NuxtLink>
    </div>
  </footer>
</template>
