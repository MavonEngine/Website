<script setup lang="ts">
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://buttons.github.io/buttons.js'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
})
</script>

<template>
  <a
    class="github-button"
    href="https://github.com/MavonEngine/Core"
    data-color-scheme="no-preference: light; light: light; dark: dark;"
    data-size="large"
    data-show-count="true"
    aria-label="Star MavonEngine/Core on GitHub"
  >Star</a>
</template>
