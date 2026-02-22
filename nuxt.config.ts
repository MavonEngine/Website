// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', 'nuxt-og-image', 'nuxt-llms', '@nuxtjs/mcp-toolkit', 'nuxt-umami'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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

  colorMode: {
    preference: 'dark'
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
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

  icon: {
    provider: 'iconify'
  },

  llms: {
    domain: 'https://mavonengine.dev/',
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

  umami: {
    id: 'd065dc99-7c95-43e4-9a1a-a38d087e0a54',
    host: 'https://cloud.umami.is/',
    autoTrack: true,
    enabled: true,
    domains: ['mavonengine.com']
  },
})