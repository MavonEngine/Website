<script setup lang="ts">
// The latest discussions from the forum (Flarum at /community, same origin, behind Caddy).
// The homepage is prerendered, so they're fetched in the browser: fetching during SSR would freeze them at build time.
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 6 })

const { t, locale } = useI18n()

interface Resource {
  type: string
  id: string
  attributes: Record<string, unknown>
  relationships?: Record<string, { data: { type: string, id: string } | { type: string, id: string }[] | null }>
}

interface Discussion {
  id: string
  title: string
  url: string
  createdAt: string
  replies: number
  excerpt: string
  author?: { name: string, avatarUrl: string | null }
  tag?: { name: string, color: string }
}

const query = new URLSearchParams({
  'sort': '-createdAt',
  'page[limit]': String(props.limit),
  'include': 'user,firstPost,tags',
  'fields[discussions]': 'title,slug,createdAt,commentCount,user,firstPost,tags',
  'fields[users]': 'displayName,avatarUrl',
  'fields[posts]': 'contentHtml',
  'fields[tags]': 'name,color,isChild'
})

const { data: discussions, status } = useFetch(`/community/api/discussions?${query}`, {
  key: `community-posts-${props.limit}`,
  server: false,
  lazy: true,
  transform: (res: { data: Resource[], included?: Resource[] }): Discussion[] => {
    const included = new Map((res.included ?? []).map(r => [`${r.type}:${r.id}`, r]))
    const one = (r: Resource, rel: string) => {
      const d = r.relationships?.[rel]?.data
      return d && !Array.isArray(d) ? included.get(`${d.type}:${d.id}`) : undefined
    }
    const many = (r: Resource, rel: string) => {
      const d = r.relationships?.[rel]?.data
      return Array.isArray(d) ? d.map(x => included.get(`${x.type}:${x.id}`)).filter(x => !!x) : []
    }

    return res.data.map((d) => {
      const user = one(d, 'user')
      const post = one(d, 'firstPost')
      // show the primary tag rather than a child tag
      const tag = many(d, 'tags').find(x => !x.attributes.isChild)
      const text = new DOMParser().parseFromString(String(post?.attributes.contentHtml ?? ''), 'text/html').body.textContent ?? ''
      return {
        id: d.id,
        title: String(d.attributes.title),
        url: `/community/d/${d.attributes.slug}`,
        createdAt: String(d.attributes.createdAt),
        replies: Math.max(0, Number(d.attributes.commentCount ?? 1) - 1),
        excerpt: text.replace(/\s+/g, ' ').trim(),
        author: user ? { name: String(user.attributes.displayName), avatarUrl: (user.attributes.avatarUrl as string | null) ?? null } : undefined,
        tag: tag ? { name: String(tag.attributes.name), color: String(tag.attributes.color || '#89b4fa') } : undefined
      }
    })
  }
})

function ago(iso: string) {
  const rtf = new Intl.RelativeTimeFormat(locale.value, { numeric: 'auto' })
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]]
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return rtf.format(0, 'minute')
}
</script>

<template>
  <div>
    <div
      v-if="status === 'idle' || status === 'pending'"
      class="g3"
      aria-busy="true"
    >
      <div
        v-for="i in Math.min(limit, 3)"
        :key="i"
        class="glass rounded-[14px] p-6 h-[168px] animate-pulse"
      />
    </div>

    <div
      v-else-if="discussions?.length"
      class="g3"
    >
      <a
        v-for="d in discussions"
        :key="d.id"
        :href="d.url"
        class="glass card rounded-[14px] p-6 flex flex-col gap-3 no-underline"
      >
        <div class="flex items-center justify-between gap-3 mono text-[12px] text-[#7f849c]">
          <span
            v-if="d.tag"
            class="inline-flex items-center gap-1.5 truncate"
          >
            <span
              class="size-2 rounded-full shrink-0"
              :style="{ background: d.tag.color }"
            />{{ d.tag.name }}
          </span>
          <span class="ml-auto shrink-0">{{ ago(d.createdAt) }}</span>
        </div>
        <h3 class="m-0 display font-semibold text-[17px] leading-snug text-[#cdd6f4] line-clamp-2">
          {{ d.title }}
        </h3>
        <p
          v-if="d.excerpt"
          class="m-0 text-[14px] leading-[1.6] text-[#a6adc8] line-clamp-3"
        >
          {{ d.excerpt }}
        </p>
        <div class="mt-auto pt-1 flex items-center justify-between gap-3 text-[13px] text-[#a6adc8]">
          <span
            v-if="d.author"
            class="inline-flex items-center gap-2 truncate"
          >
            <img
              v-if="d.author.avatarUrl"
              :src="d.author.avatarUrl"
              alt=""
              class="size-5 rounded-full"
              loading="lazy"
            >
            <UIcon
              v-else
              name="i-lucide-circle-user-round"
              class="size-5 text-[#7f849c]"
            />
            {{ d.author.name }}
          </span>
          <span class="inline-flex items-center gap-1.5 shrink-0 mono text-[12px]">
            <UIcon
              name="i-lucide-message-square"
              class="size-3.5"
            />{{ d.replies }}
          </span>
        </div>
      </a>
    </div>

    <p
      v-else
      class="text-[#a6adc8]"
    >
      {{ status === 'error' ? t('home.communityError') : t('home.communityEmpty') }}
      <a
        href="/community"
        class="text-[#89b4fa]"
      >{{ t('home.communityVisit') }}</a>
    </p>
  </div>
</template>
