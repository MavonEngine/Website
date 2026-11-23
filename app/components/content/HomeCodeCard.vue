<script setup lang="ts">
// A highlighted code sample in an editor-style card. The code itself is fixed per `sample`; the
// comments come from `comments` so they can be translated ("\n" splits one comment over two lines).
const props = withDefaults(defineProps<{
  sample: 'server' | 'liveops'
  filename?: string
  badge?: string
  comments?: string[]
  stats?: { label: string, value: string, accent?: boolean }[]
  glow?: boolean
}>(), { filename: 'server.ts', badge: '', comments: () => [], stats: () => [], glow: false })

// «x|text» marks a token with highlight class x (k keyword, s string, c comment, t type, f function,
// n number, p punctuation, v parameter); «c|$N» is replaced by comments[N]
const SAMPLES = {
  server: `«k|import» Server «k|from» «s|'@mavonengine/core/Networking/Server/Server'»
«k|import» Player «k|from» «s|'./Base/Player'»

«k|export default class» «t|GameServer» «k|extends» «t|Server»«p|<»«t|Player»«p|>» «p|{»
  «c|$0»
  «k|protected» «f|onConnection»«p|(»«v|channel»«p|) {»
    «k|return new» «t|Player»«p|(»«v|channel».id«p|)»
  «p|}»

  «c|$1»
  «k|protected» «f|onCommand»«p|(»«v|command»«p|) {»
    «k|const» player «p|=» «k|this».game.world.entities.items.«f|get»«p|(»«v|command».playerId«p|)»
    player«p|?.»«f|applyInput»«p|(»«v|command»«p|)»
  «p|}»

  «c|$2»
  «f|getStateSyncDistance»«p|() {»
    «k|return» «n|200»
  «p|}»
«p|}»`,
  liveops: `«k|export default class» «t|GameServer» «k|extends» «t|Server»«p|<»«t|Player»«p|>» «p|{»
  «c|$0»
  «k|protected» «f|onConnection»«p|(»«v|channel»«p|) {»
    «k|const» player «p|=» «k|new» «t|Player»«p|(»«v|channel».id«p|)»
    «k|this».logger.«f|info»«p|(»«s|\`\${player.identity?.name} joined\`»«p|)»
    «k|return» player
  «p|}»

  «c|$1»
  «k|async» «f|levelUp»«p|(»«v|player»: «t|Player», «v|level»: «t|number»«p|) {»
    «k|await» player.«f|notify»«p|(»«k|new» «t|LevelUp»«p|(»level«p|))»
    «c|$2»
    «k|await» «k|this».queue.«f|dispatch»«p|(»«k|new» «t|GrantReward»«p|({»
      player: player.identity«p|!».id, coins: «n|100»
    «p|}))»
  «p|}»

  «c|$3»
  «f|topScores»«p|() {»
    «k|return» «k|this».db«p|?.»«f|selectFrom»«p|(»«s|'game_scores'»«p|)»
      .«f|selectAll»«p|()».«f|limit»«p|(»«n|10»«p|)».«f|execute»«p|()»
  «p|}»
«p|}»`
}

const DEFAULT_COMMENTS = {
  server: [
    'A client connected: return its player,\nthe server adds and syncs it',
    'Inputs arrive in order and run on the authoritative tick',
    'Only sync entities within 200 units of each player'
  ],
  liveops: [
    'Every connection has an account, the same on every reconnect',
    'In the game, by mail and kept in the player\'s inbox',
    'Slow work goes on the queue, tried again when it fails',
    'Plugins share one database, each with its own tables'
  ]
}

type Token = { cls?: string, text: string }

const lines = computed<Token[][]>(() => {
  const comments = props.comments.length ? props.comments : DEFAULT_COMMENTS[props.sample]
  const out: Token[][] = []
  for (const line of SAMPLES[props.sample].split('\n')) {
    const placeholder = line.match(/^(\s*)«c\|\$(\d+)»$/)
    if (placeholder) {
      for (const part of (comments[Number(placeholder[2])] ?? '').split('\n')) {
        out.push([{ text: placeholder[1]! }, { cls: 'c', text: `// ${part}` }])
      }
      continue
    }
    const tokens: Token[] = []
    let last = 0
    for (const m of line.matchAll(/«(\w)\|([^»]*)»/g)) {
      if (m.index > last) tokens.push({ text: line.slice(last, m.index) })
      tokens.push({ cls: m[1], text: m[2]! })
      last = m.index + m[0].length
    }
    if (last < line.length) tokens.push({ text: line.slice(last) })
    out.push(tokens)
  }
  return out
})

const CodeLines = () => lines.value.flatMap((line, i) => [
  ...line.map(t => t.cls ? h('span', { class: t.cls }, t.text) : t.text),
  i < lines.value.length - 1 ? '\n' : ''
])
</script>

<template>
  <div :class="['glass hud rounded-[14px] overflow-hidden', { 'shadow-[0_40px_120px_-40px_rgba(137,180,250,0.45)]': glow }]">
    <div class="flex items-center gap-2 py-3 px-4 border-b border-[rgba(137,180,250,0.1)] bg-[rgba(17,17,27,0.6)]">
      <span class="size-[11px] rounded-full bg-[#f38ba8]" />
      <span class="size-[11px] rounded-full bg-[#f9e2af]" />
      <span class="size-[11px] rounded-full bg-[#a6e3a1]" />
      <span class="ml-2.5 mono text-xs text-[#9399b2]">{{ filename }}</span>
      <span
        v-if="badge"
        class="ml-auto mono text-[11px] text-[#89b4fa] tracking-[0.08em]"
      >● {{ badge }}</span>
    </div>
    <pre class="code"><CodeLines /></pre>
    <div
      v-if="stats.length"
      class="grid border-t border-[rgba(137,180,250,0.1)] mono text-[11px] tracking-[0.06em]"
      :style="{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }"
    >
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        :class="['py-3 px-4', { 'border-r border-[rgba(137,180,250,0.1)]': i < stats.length - 1 }]"
      >
        <div class="text-[#9399b2]">
          {{ stat.label }}
        </div>
        <div :class="['mt-1', stat.accent ? 'text-[#89b4fa]' : 'text-[#cdd6f4]']">
          {{ stat.value }}
        </div>
      </div>
    </div>
  </div>
</template>
