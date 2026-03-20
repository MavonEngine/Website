// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    '@nuxtjs/mcp-toolkit',
    'nuxt-umami',
    '@nuxtjs/i18n',
    '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  colorMode: {
    preference: 'dark'
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
    }
  },

  experimental: {
    asyncContext: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: [
        '/'
      ],
      ignore: [
        '/community',
        // English slugs under /de/ that don't exist (i18n hreflang artifacts)
        /^\/de\/(getting-started|core-concepts|networking|input|resources|utilities)(\/.*)?$/,
        // German slugs at root without /de/ prefix (i18n hreflang artifacts)
        /^\/(erste-schritte|kernkonzepte|netzwerk|eingabe|ressourcen|dienstprogramme)(\/.*)?$/,
        // Prefab pages with wrong locale slug
        /^\/de\/prefabs\/(grass|water|creating-a-prefab)(\/.*)?$/,
        /^\/prefabs\/(gras|wasser|prefab-erstellen)(\/.*)?$/
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  hooks: {
    'build:manifest': (manifest) => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
      if (css) {
        for (let i = css.length - 1; i >= 0; i--) {
          if (css[i]?.startsWith('entry')) css.splice(i, 1)
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500, 600, 700], preload: true, display: 'swap' },
      { name: 'JetBrains Mono', weights: [400, 500], display: 'swap' }
    ]
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/'
  },

  icon: {
    provider: 'iconify'
  },

  linkChecker: {
    enabled: false
  },

  llms: {
    domain: 'https://mavonengine.com/',
    title: 'MavonEngine',
    description: 'Full-stack multiplayer 3D game engine for the browser. Built with TypeScript, Three.js, Rapier, and WebRTC.',
    full: {
      title: 'MavonEngine - Full Documentation',
      description: 'Complete documentation for MavonEngine.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' }
        ]
      },
      {
        title: 'Essentials',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/essentials%' }
        ]
      }
    ]
  },

  mcp: {
    name: 'MavonEngine docs'
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls']
  },

  umami: {
    id: 'd065dc99-7c95-43e4-9a1a-a38d087e0a54',
    host: 'https://cloud.umami.is/',
    autoTrack: true,
    enabled: true,
    domains: ['mavonengine.com']
  }
})
