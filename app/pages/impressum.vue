<script setup lang="ts">
useSeoMeta({
  title: 'Impressum',
  robots: 'noindex'
})
</script>

<template>
  <UContainer class="py-16 max-w-2xl">
    <h1 class="text-3xl font-bold mb-8">
      Impressum
    </h1>
    <div class="space-y-4 text-muted leading-relaxed">
      <p>
        <strong class="text-default">Angaben gemäß § 5 TMG</strong>
      </p>
      <p>
        Matthias von Bargen<br>
        Bahnhofstrasse 12<br>
        72810 Gomaringen<br>
        Deutschland
      </p>
      <p>
        <strong class="text-default">Kontakt</strong><br>
        <a
          href="mailto:matt@mavonengine.com"
          class="hover:text-default transition-colors"
        >matt@mavonengine.com</a>
      </p>
    </div>
  </UContainer>
</template>
