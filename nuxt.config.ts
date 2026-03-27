// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import glsl from 'vite-plugin-glsl'
import { fileURLToPath } from 'node:url'
import type { PluginBuild, OnLoadArgs, OnResolveArgs } from 'esbuild'

const glslEsbuildPlugin = {
  name: 'glsl',
  setup(build: PluginBuild) {
    build.onLoad({ filter: /\.glsl$/ }, (args: OnLoadArgs) => ({
      contents: `export default ${JSON.stringify(readFileSync(args.path, 'utf8'))}`,
      loader: 'js'
    }))
  }
}

const packageJsonEsbuildPlugin = {
  name: 'package-json',
  setup(build: PluginBuild) {
    build.onResolve({ filter: /[/\\]package\.json$/ }, (args: OnResolveArgs) => ({ path: resolve(args.resolveDir, args.path), namespace: 'pkg-json' }))
    build.onLoad({ filter: /.*/, namespace: 'pkg-json' }, (args: OnLoadArgs) => {
      const pkg = JSON.parse(readFileSync(args.path, 'utf8'))
      const named = Object.entries(pkg)
        .filter(([k]) => /^[a-z_$][\w$]*$/i.test(k))
        .map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`)
        .join('\n')
      return { contents: `${named}\nexport default ${JSON.stringify(pkg)};`, loader: 'js' }
    })
  }
}

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
    '@nuxtjs/seo',
    '@nuxt/fonts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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

  sourcemap: {
    server: false,
    client: false
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
        /^\/prefabs\/(gras|wasser|prefab-erstellen)(\/.*)?$/,
        '/demo'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    plugins: [glsl()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [glslEsbuildPlugin, packageJsonEsbuildPlugin]
      }
    },
    resolve: {
      alias: {
        '@template/server': fileURLToPath(new URL('../template-multiplayer/server', import.meta.url))
      },
      dedupe: ['three', 'vue', '@dimforge/rapier3d-compat']
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
