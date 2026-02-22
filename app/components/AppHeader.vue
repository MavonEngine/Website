<template>
  <header class="mavon-header">
    <div class="mavon-header-inner">
      <NuxtLink
        to="/"
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
          to="/#features"
          class="mavon-nav-link"
        >Features</NuxtLink>
        <NuxtLink
          to="/#why"
          class="mavon-nav-link"
        >Why mavon</NuxtLink>
        <NuxtLink
          to="/#usecases"
          class="mavon-nav-link"
        >Use Cases</NuxtLink>
        <NuxtLink
          to="/getting-started"
          class="mavon-nav-link"
        >Docs</NuxtLink>
        <a
          href="/community"
          class="mavon-nav-link"
        >Community</a>
      </nav>

      <div class="mavon-header-right">
        <a
          href="/getting-started"
          class="mavon-cta"
        >Get started</a>
      </div>
    </div>
  </header>
</template>
