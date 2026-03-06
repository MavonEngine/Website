import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const docSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional()
  })).optional()
})

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    landing_de: defineCollection({
      type: 'page',
      source: 'de/index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md', 'de/**']
      },
      schema: docSchema
    }),
    docs_de: defineCollection({
      type: 'page',
      source: {
        include: 'de/**',
        exclude: ['de/index.md']
      },
      schema: docSchema
    })
  }
})
