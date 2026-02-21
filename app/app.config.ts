export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc'
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
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/mavonengine/mavonengine',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
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
      'to': 'https://github.com/mavonengine/mavonengine',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/mavonengine/mavonengine/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/mavonengine/mavonengine',
        target: '_blank'
      }, {
        icon: 'i-lucide-users',
        label: 'Join the community',
        href: '/community'
      }]
    }
  }
})
