// The homepage's .glass panel (app/assets/css/main.css), as utilities so they merge over Nuxt UI's theme
const glass = 'bg-[rgba(24,24,37,0.62)] border border-[rgba(137,180,250,0.12)] rounded-[14px] backdrop-blur-[14px]'
// The darker title bar on the homepage's code cards
const glassBar = 'bg-[rgba(17,17,27,0.6)] border-[rgba(137,180,250,0.12)]'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
    },
    // Docs tiles use the homepage's glass panels: translucent, blurred, with a faint blue border
    prose: {
      card: {
        slots: {
          base: [
            `${glass} hover:-translate-y-0.5 hover:bg-[rgba(30,30,46,0.75)]! hover:border-[rgba(137,180,250,0.45)]!`,
            'transition-[color,background-color,border-color,transform] duration-250'
          ]
        }
      },
      pre: {
        slots: {
          header: `${glassBar} rounded-t-[14px] backdrop-blur-[14px]`,
          base: glass
        }
      },
      codeGroup: {
        slots: {
          list: `${glassBar} rounded-t-[14px] backdrop-blur-[14px]`
        }
      },
      codePreview: {
        slots: {
          preview: glass
        }
      },
      callout: {
        slots: {
          base: 'rounded-[14px] backdrop-blur-[14px]'
        },
        variants: {
          color: {
            neutral: { base: glass }
          }
        }
      },
      table: {
        slots: {
          base: 'rounded-[14px] bg-[rgba(24,24,37,0.62)] backdrop-blur-[14px]'
        }
      },
      thead: {
        base: 'bg-[rgba(17,17,27,0.6)]'
      },
      th: {
        base: 'border-[rgba(137,180,250,0.12)]'
      },
      td: {
        base: 'border-[rgba(137,180,250,0.12)]'
      },
      tr: {
        base: '[&:first-child>th:first-child]:rounded-tl-[14px] [&:first-child>th:last-child]:rounded-tr-[14px] [&:last-child>td:first-child]:rounded-bl-[14px] [&:last-child>td:last-child]:rounded-br-[14px]'
      }
    },
    contentSurround: {
      slots: {
        link: [
          `${glass} hover:-translate-y-0.5 hover:bg-[rgba(30,30,46,0.75)] hover:border-[rgba(137,180,250,0.45)]`,
          'transition-[color,background-color,border-color,transform] duration-250'
        ]
      }
    }
  },
  seo: {
    siteName: 'MavonEngine'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: false,
    links: []
  },
  footer: {
    credits: `© ${new Date().getFullYear()} MavonEngine`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-discord',
      'to': '#',
      'target': '_blank',
      'aria-label': 'Discord'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/MavonEngine/Core',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/MavonEngine/Website/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/MavonEngine/Core',
        target: '_blank'
      }, {
        icon: 'i-lucide-users',
        label: 'Join the community',
        href: '/community',
        // The forum is served outside the Nuxt app; without this, Nuxt UI localizes it to /de/community
        external: true
      }]
    }
  }
})
