<script setup lang="ts">
type Command = { id: string, label: string, cmd: string, note: string }

const props = withDefaults(defineProps<{ commands?: Command[] }>(), {
  commands: () => [
    { id: 'create', label: 'create', cmd: 'npx @mavonengine/cli create my-game', note: 'New project with physics and multiplayer, ready in under a minute.' },
    { id: 'auth', label: 'auth', cmd: 'npx @mavonengine/cli install @mavonengine/auth', note: 'Player accounts, sessions and guest play.' },
    { id: 'chat', label: 'chat', cmd: 'npx @mavonengine/cli install @mavonengine/chat', note: 'In-game chat. Restart the server, press Enter to type.' },
    { id: 'sqlite', label: 'sqlite', cmd: 'npx @mavonengine/cli install @mavonengine/sqlite', note: 'SQLite on node:sqlite, migrations per plugin.' },
    { id: 'mail', label: 'mail', cmd: 'npx @mavonengine/cli install @mavonengine/mail', note: 'Queued mail over SMTP or any nodemailer transport.' },
    { id: 'notifications', label: 'notifications', cmd: 'npx @mavonengine/cli install @mavonengine/notifications', note: 'In the game, by mail, or kept in an inbox.' },
    { id: 'monitoring', label: 'monitoring', cmd: 'npx @mavonengine/cli install @mavonengine/http-monitoring', note: 'The live server dashboard in the browser, behind a login.' }
  ]
})

const { t } = useI18n()
const selected = ref(props.commands[0]?.id)
const current = computed(() => props.commands.find(c => c.id === selected.value) ?? props.commands[0])
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function pick(id: string) {
  selected.value = id
  copied.value = false
}

async function copy() {
  try {
    await navigator.clipboard?.writeText(current.value?.cmd ?? '')
  } catch {
    // clipboard blocked: still acknowledge, as the design does
  }
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1600)
}

onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <div class="glass hud rounded-[14px] p-4 w-full max-w-[520px] box-border flex flex-col gap-3">
    <div
      role="group"
      :aria-label="t('home.chooseCommand')"
      class="flex flex-wrap gap-1.5"
    >
      <button
        v-for="c in commands"
        :key="c.id"
        type="button"
        :class="['pill', { on: c.id === selected }]"
        :aria-pressed="c.id === selected"
        @click="pick(c.id)"
      >
        {{ c.label }}
      </button>
    </div>
    <div class="flex items-center gap-3 py-1.5 pr-1.5 pl-4 rounded-[10px] bg-[rgba(17,17,27,0.85)] border border-[rgba(137,180,250,0.22)]">
      <span
        aria-hidden="true"
        class="mono text-sm text-[#a6e3a1]"
      >$</span>
      <code class="flex-1 min-w-0 overflow-x-auto whitespace-nowrap mono text-[13.5px] text-[#cdd6f4] py-2">{{ current?.cmd }}</code>
      <button
        type="button"
        class="copy"
        :aria-label="t('home.copyLabel')"
        @click="copy"
      >
        <UIcon
          name="i-lucide-copy"
          class="size-4"
        />
        <span aria-live="polite">{{ copied ? t('home.copied') : t('home.copy') }}</span>
      </button>
    </div>
    <div class="mono text-xs text-[#9399b2]">
      {{ current?.note }}
    </div>
  </div>
</template>
