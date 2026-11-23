<script setup lang="ts">
// One panel the size of the monitoring screenshot that slides between screenshots (`src` set) and
// plugin panels (no `src`: title, description, install command and a screenshot placeholder).
// Auto-advances every `interval` ms, pauses on hover and focus, and doesn't autoplay under reduced motion.
type Slide = { title: string, src?: string, alt?: string, tag?: string, desc?: string, cmd?: string, slot?: string }

const props = withDefaults(defineProps<{ slides?: Slide[], interval?: number }>(), {
  interval: 5000,
  slides: () => [
    { src: '/images/http-monitoring.png', alt: 'MavonEngine server monitoring dashboard: CPU, network and tick charts, world stats, players and logs', title: 'Live server monitoring', tag: '@mavonengine/http-monitoring' },
    { title: 'Chat', cmd: 'npx @mavonengine/cli install @mavonengine/chat', slot: 'CHAT SCREENSHOT', desc: 'In-game text chat with rate limiting, mutes, proximity chat, history and an admin API. Press Enter in the game to type.' },
    { src: '/baseScreenshot.jpg', alt: 'BASE Jump, a multiplayer MavonEngine demo', title: 'BASE Jump — multiplayer demo', tag: 'DEMO' },
    { title: 'Player Accounts', cmd: 'npx @mavonengine/cli install @mavonengine/auth', slot: 'LOGIN SCREENSHOT', desc: 'Usernames and passwords, sessions, guest play and login rate limiting. Every player gets a stable account id.' },
    { title: 'Database', cmd: 'npx @mavonengine/cli install @mavonengine/sqlite', slot: 'DATABASE SCREENSHOT', desc: 'SQLite on Node’s built-in node:sqlite, shared by every plugin, each with its own tables and migrations.' },
    { title: 'Mail', cmd: 'npx @mavonengine/cli install @mavonengine/mail', slot: 'MAIL SCREENSHOT', desc: 'Queued mail in a layout you can change, over SMTP or any nodemailer transport — retried when the mail server is down.' },
    { title: 'Notifications', cmd: 'npx @mavonengine/cli install @mavonengine/notifications', slot: 'NOTIFICATION SCREENSHOT', desc: 'player.notify(new LevelUp()) reaches the player in the game, by mail, or in an inbox they read later.' }
  ]
})

const { t } = useI18n()
const n = computed(() => props.slides.length)
const idx = ref(0)
let paused = false
let lastAdvance = 0
let timer: ReturnType<typeof setInterval> | undefined

const pad = (v: number) => String(v).padStart(2, '0')

function go(i: number) {
  lastAdvance = Date.now()
  idx.value = ((i % n.value) + n.value) % n.value
}

function pause() {
  paused = true
}
function resume() {
  paused = false
  lastAdvance = Date.now()
}

onMounted(() => {
  lastAdvance = Date.now()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (paused || Date.now() - lastAdvance < props.interval) return
    go(idx.value + 1)
  }, 250)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="wrap">
    <div
      class="glass hud rounded-2xl p-2.5 shadow-[0_50px_140px_-50px_rgba(137,180,250,0.4)]"
      role="region"
      aria-roledescription="carousel"
      :aria-label="t('home.carousel')"
      @mouseenter="pause"
      @mouseleave="resume"
      @focusin="pause"
      @focusout="resume"
    >
      <div class="relative rounded-[10px] overflow-hidden aspect-[2800/1800] bg-[#181825]">
        <div
          class="flex h-full transition-transform duration-[850ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
          :style="{ transform: `translateX(${-idx * 100}%)` }"
        >
          <div
            v-for="(s, i) in slides"
            :key="s.title"
            role="group"
            aria-roledescription="slide"
            :aria-label="t('home.slideOf', { n: i + 1, total: n, title: s.title })"
            :aria-hidden="i !== idx"
            class="relative flex-[0_0_100%] h-full overflow-hidden"
          >
            <template v-if="s.src">
              <img
                :src="s.src"
                :alt="s.alt"
                loading="lazy"
                class="block size-full object-cover"
              >
              <div
                aria-hidden="true"
                class="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,27,0)_60%,rgba(17,17,27,0.9)_100%)]"
              />
              <div class="absolute left-7 bottom-[26px] right-[120px] flex flex-wrap items-center gap-3">
                <span class="display font-semibold text-[clamp(18px,2.2vw,26px)] text-[#cdd6f4]">{{ s.title }}</span>
                <span
                  v-if="s.tag"
                  class="mono text-[11px] text-[#89b4fa] tracking-[0.08em] border border-[rgba(137,180,250,0.4)] bg-[rgba(17,17,27,0.6)] py-1 px-[9px] rounded-[5px]"
                >{{ s.tag }}</span>
              </div>
            </template>
            <div
              v-else
              class="pslide h-full box-border p-[clamp(24px,5vw,64px)] bg-[radial-gradient(ellipse_70%_80%_at_85%_50%,rgba(137,180,250,0.12),transparent_70%),repeating-linear-gradient(135deg,rgba(137,180,250,0.035)_0_12px,transparent_12px_24px),#181825]"
            >
              <div class="flex flex-col justify-center gap-4 min-w-0">
                <div class="mono flex items-center gap-2.5 text-xs tracking-[0.12em] text-[#89b4fa]">
                  <span class="size-2 rounded-full bg-[#a6e3a1] shadow-[0_0_10px_#a6e3a1]" />{{ t('home.plugin') }}
                </div>
                <h3 class="m-0 display font-bold text-[clamp(28px,4vw,52px)] leading-none tracking-[-0.03em] text-[#cdd6f4]">
                  {{ s.title }}
                </h3>
                <p class="m-0 text-[clamp(14px,1.4vw,17px)] leading-[1.6] text-[#a6adc8] max-w-[440px]">
                  {{ s.desc }}
                </p>
                <code
                  v-if="s.cmd"
                  class="self-start max-w-full box-border overflow-hidden text-ellipsis whitespace-nowrap mono text-[13px] text-[#89dceb] bg-[rgba(17,17,27,0.7)] border border-[rgba(137,220,235,0.2)] py-[9px] px-3 rounded-lg"
                ><span class="text-[#a6e3a1]">$ </span>{{ s.cmd }}</code>
              </div>
              <div class="pshot rounded-xl border border-dashed border-[rgba(137,180,250,0.3)] bg-[rgba(17,17,27,0.55)] flex items-center justify-center mono text-xs text-[#9399b2] tracking-[0.08em] text-center p-4">
                [ {{ s.slot }} ]
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="nav-btn left-4"
          :aria-label="t('home.prev')"
          @click="go(idx - 1)"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-5"
          />
        </button>
        <button
          type="button"
          class="nav-btn right-4"
          :aria-label="t('home.next')"
          @click="go(idx + 1)"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="size-5"
          />
        </button>
        <div
          aria-hidden="true"
          class="absolute right-6 bottom-7 mono text-xs text-[#cdd6f4] tracking-[0.1em] bg-[rgba(17,17,27,0.6)] py-1 px-2 rounded-[5px]"
        >
          {{ pad(idx + 1) }} / {{ pad(n) }}
        </div>
      </div>
      <div class="flex justify-center gap-1 pt-2.5 pb-0.5">
        <button
          v-for="(s, i) in slides"
          :key="s.title"
          type="button"
          class="dot"
          :aria-label="t('home.showSlide', { n: i + 1, title: s.title })"
          :aria-current="i === idx"
          @click="go(i)"
        >
          <span :class="{ on: i === idx }" />
        </button>
      </div>
    </div>
  </div>
</template>
