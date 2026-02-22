<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default mt-auto">
    <UContainer>
      <div class="py-12 flex flex-col md:flex-row gap-8 md:gap-0">
        <!-- Brand -->
        <div class="flex-1">
          <NuxtLink to="/">
            <AppLogo class="h-5 w-auto mb-3" />
          </NuxtLink>
          <p class="text-sm text-muted max-w-xs leading-relaxed">
            Full-stack multiplayer 3D game engine for the browser. Built with TypeScript, Three.js, Rapier, and WebRTC.
          </p>
        </div>

        <!-- Link columns -->
        <div class="flex gap-12 text-sm">
          <div>
            <div class="text-xs font-medium uppercase tracking-wider text-muted mb-3">
              Engine
            </div>
            <ul class="space-y-2">
              <li>
                <NuxtLink
                  to="/#features"
                  class="text-muted hover:text-default transition-colors"
                >
                  Features
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/#why"
                  class="text-muted hover:text-default transition-colors"
                >
                  Why MavonEngine
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/#usecases"
                  class="text-muted hover:text-default transition-colors"
                >
                  Use Cases
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <div class="text-xs font-medium uppercase tracking-wider text-muted mb-3">
              Community
            </div>
            <ul class="space-y-2">
              <li>
                <a
                  href="/community"
                  class="text-muted hover:text-default transition-colors"
                >
                  Forum
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
        <span>Made with care by the MavonEngine contributors.</span>
      </div>
    </UContainer>
  </footer>
</template>
