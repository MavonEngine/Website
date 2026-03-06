import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (e) => {
  const [docs, docsDe] = await Promise.all([
    queryCollection(e, 'docs').select('path').all(),
    queryCollection(e, 'docs_de').select('path').all()
  ])

  return [...docs, ...docsDe].map(p => ({ loc: p.path }))
})
