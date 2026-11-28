<script setup lang="ts">
// A logic graph running live on the page, with the engine's own GraphRuntime: the graph on the left lights up step by
// step, and a small stage on the right shows what its Self does. Usage in content: ::logic-graph-demo{demo="npc"}
import type { GraphValue } from '@mavonengine/core/Graph/types'
import type { DemoEntity, GraphDemoName } from '~/utils/graphDemos'
import { GraphRuntime } from '@mavonengine/core/Graph/Logic/GraphRuntime'
import { chatListeners, GRAPH_DEMOS, makeEntity, parameterDefaults } from '~/utils/graphDemos'

const props = withDefaults(defineProps<{
  demo: GraphDemoName
  height?: number
}>(), { height: 440 })

const demo = GRAPH_DEMOS[props.demo]
const tab = ref(0)
const current = computed(() => demo.graphs[tab.value]!)

// ---- Parameters, from the sliders
const parameters = reactive(demo.graphs.map(g => parameterDefaults(g.graph)))

// ---- What the graphs act on
let entities: Record<string, DemoEntity> = {}
let runtimes: GraphRuntime[] = []
/** Bumped every frame, so the stage redraws */
const frame = ref(0)

// ---- Steps that ran a moment ago, per graph
const ranAt = demo.graphs.map(() => new Map<string, number>())
const active = shallowRef(demo.graphs.map(() => new Set<string>()))
const LIT_FOR = 280

// ---- Log and speech
interface LogLine { id: number, text: string, from: 'graph' | 'game' }
const log = ref<LogLine[]>([])
let logId = 0
function write(text: string, from: LogLine['from'] = 'graph') {
  log.value = [...log.value.slice(-5), { id: ++logId, text, from }]
}
const speech = ref('')
let speechTimer: ReturnType<typeof setTimeout> | undefined

function build() {
  entities = Object.fromEntries(demo.entities.map(id => [id, makeEntity(id)]))
  runtimes = demo.graphs.map((g, i) => new GraphRuntime(g.graph, {
    self: entities[g.self],
    find: id => entities[id],
    parameters: { ...parameters[i] },
    log: message => write(message),
    emit: (name: string, value: GraphValue) => {
      for (const runtime of runtimes)
        runtime.message(name, value)
    },
    onStep: node => ranAt[i]!.set(node, performance.now())
  }))
  for (const runtime of runtimes)
    runtime.start()
}

function setParameter(graph: number, name: string, value: number) {
  parameters[graph]![name] = value
  build()
}

// ---- The loop, paused while the demo is off screen
const root = ref<HTMLElement>()
let visible = false
let raf = 0
let last = 0
let litTimer: ReturnType<typeof setInterval> | undefined

function loop(now: number) {
  raf = requestAnimationFrame(loop)
  const delta = Math.min((now - last) / 1000, 0.1)
  last = now
  if (!visible || document.hidden)
    return
  for (const runtime of runtimes)
    runtime.update(delta)
  frame.value++
}

function updateLit() {
  const now = performance.now()
  active.value = ranAt.map(map => new Set([...map].filter(([, at]) => now - at < LIT_FOR).map(([id]) => id)))
}

let observer: IntersectionObserver | undefined
onMounted(() => {
  build()
  chatListeners.set('server_npc', (message) => {
    speech.value = message
    clearTimeout(speechTimer)
    speechTimer = setTimeout(() => {
      speech.value = ''
    }, 5000)
  })
  observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting
  })
  if (root.value)
    observer.observe(root.value)
  last = performance.now()
  raf = requestAnimationFrame(loop)
  litTimer = setInterval(updateLit, 100)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearInterval(litTimer)
  clearTimeout(speechTimer)
  observer?.disconnect()
  chatListeners.delete('server_npc')
})

// ---- Interaction
function clickNpc() {
  write('click → server sends `clicked`', 'game')
  runtimes[0]?.message('clicked', 'visitor')
}

const keyDown = ref(false)
function pressSpace() {
  keyDown.value = true
  setTimeout(() => {
    keyDown.value = false
  }, 120)
  for (const runtime of runtimes)
    runtime.trigger('keydown', { code: 'Space' })
}
function onKeydown(e: KeyboardEvent) {
  if (props.demo !== 'messages' || e.code !== 'Space' || e.repeat)
    return
  if ((e.target as HTMLElement).closest('input, button'))
    return
  e.preventDefault()
  pressSpace()
}

// ---- What the stage draws, read from the entities each frame
const stage = computed(() => {
  void frame.value
  const npc = entities.server_npc
  const lamp = entities.lamp
  const crate = entities.crate
  const startX = Number(runtimes[0]?.variables.get('startX') ?? 0)
  return {
    npcX: npc?.position[0] ?? 0,
    // The template's convention: −90° around y faces +x
    npcFacing: (npc?.rotation[1] ?? 0) <= 0 ? 1 : -1,
    startX,
    range: Number(parameters[0]?.range ?? 4),
    lampScale: lamp?.scale[0] ?? 1,
    crateAngle: ((crate?.rotation[1] ?? 0) * 180) / Math.PI,
    crateScale: crate?.scale[0] ?? 1
  }
})
const lampOn = computed(() => stage.value.lampScale > 1.2)
</script>

<template>
  <div
    ref="root"
    class="lgd"
    :tabindex="props.demo === 'messages' ? 0 : undefined"
    @keydown="onKeydown"
  >
    <div class="lgd-bar">
      <div class="lgd-tabs">
        <button
          v-for="(g, i) in demo.graphs"
          :key="g.file"
          type="button"
          :class="['lgd-tab', { on: i === tab }]"
          @click="tab = i"
        >
          <span class="lgd-dot" />
          {{ g.file }}
        </button>
      </div>
      <span class="lgd-live">LIVE · GraphRuntime</span>
    </div>

    <div class="lgd-body">
      <LogicGraphView
        :graph="current.graph"
        :analysis="current.analysis"
        :active="active[tab]"
        :height="height"
      />

      <div class="lgd-side">
        <div class="lgd-stage">
          <!-- Server NPC: walks back and forth, answers clicks -->
          <template v-if="props.demo === 'npc'">
            <svg
              viewBox="-6 -3.2 12 4"
              class="lgd-svg"
            >
              <line
                x1="-6"
                y1="0.4"
                x2="6"
                y2="0.4"
                class="ground"
              />
              <line
                :x1="stage.startX - stage.range"
                y1="0.55"
                :x2="stage.startX + stage.range"
                y2="0.55"
                class="span"
              />
              <line
                :x1="stage.startX"
                y1="0.25"
                :x2="stage.startX"
                y2="0.7"
                class="mark"
              />
              <g
                :transform="`translate(${stage.npcX} 0) scale(${stage.npcFacing} 1)`"
                class="npc"
                role="button"
                aria-label="Click the NPC"
                @click="clickNpc"
              >
                <rect
                  x="-0.35"
                  y="-1.6"
                  width="0.7"
                  height="2"
                  rx="0.35"
                  class="body"
                />
                <circle
                  cx="0.12"
                  cy="-1.15"
                  r="0.09"
                  class="eye"
                />
                <path
                  d="M 0.45 -0.6 L 0.75 -0.45 L 0.45 -0.3 Z"
                  class="arrow"
                />
              </g>
            </svg>
            <div
              v-if="speech"
              class="lgd-bubble"
              :style="{ left: `${((stage.npcX + 6) / 12) * 100}%` }"
            >
              {{ speech }}
            </div>
            <button
              type="button"
              class="lgd-action"
              @click="clickNpc"
            >
              Click the NPC
            </button>
          </template>

          <!-- Switch + lamp: two graphs talking through a message -->
          <template v-else-if="props.demo === 'messages'">
            <svg
              viewBox="-3 -2 6 4"
              class="lgd-svg"
            >
              <circle
                cx="0"
                cy="-0.1"
                :r="0.55 * stage.lampScale"
                :class="['lamp', { on: lampOn }]"
              />
            </svg>
            <button
              type="button"
              :class="['lgd-key', { down: keyDown }]"
              @click="pressSpace"
            >
              Space
            </button>
          </template>

          <!-- Spinner: math and vectors -->
          <template v-else>
            <svg
              viewBox="-3 -2 6 4"
              class="lgd-svg"
            >
              <rect
                x="-0.6"
                y="-0.6"
                width="1.2"
                height="1.2"
                rx="0.12"
                class="crate"
                :transform="`rotate(${stage.crateAngle}) scale(${stage.crateScale})`"
              />
            </svg>
          </template>
        </div>

        <div
          v-if="demo.sliders.length"
          class="lgd-sliders"
        >
          <label
            v-for="s in demo.sliders"
            :key="s.parameter"
          >
            <span class="mono">{{ s.label }}</span>
            <input
              type="range"
              :min="s.min"
              :max="s.max"
              :step="s.step"
              :value="Number(parameters[s.graph]![s.parameter])"
              @change="setParameter(s.graph, s.parameter, Number(($event.target as HTMLInputElement).value))"
            >
            <span class="mono val">{{ parameters[s.graph]![s.parameter] }}</span>
          </label>
        </div>

        <div class="lgd-log mono">
          <div class="lgd-log-title">
            LOG
          </div>
          <div
            v-if="!log.length"
            class="lgd-log-empty"
          >
            {{ props.demo === 'messages' ? 'Press Space…' : props.demo === 'npc' ? 'Click the NPC…' : 'Log nodes write here' }}
          </div>
          <div
            v-for="line in log"
            :key="line.id"
            :class="['lgd-log-line', line.from]"
          >
            {{ line.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="lgd-hint mono">
      Drag to pan · Ctrl/⌘ + scroll to zoom · steps light up as they run
    </div>
  </div>
</template>

<style scoped>
.lgd {
  border: 1px solid rgba(137, 180, 250, 0.18);
  border-radius: 14px;
  background: rgba(17, 17, 27, 0.85);
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
  outline: none;
}
.lgd:focus-visible { border-color: #89b4fa; }
.lgd-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(137, 180, 250, 0.12);
  background: #181825;
}
.lgd-tabs { display: flex; flex-wrap: wrap; gap: 4px; min-width: 0; }
.lgd-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: #9399b2;
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
}
.lgd-tab.on { border-color: rgba(137, 180, 250, 0.3); background: rgba(137, 180, 250, 0.08); color: #cdd6f4; }
.lgd-dot { width: 6px; height: 6px; border-radius: 50%; background: #a6e3a1; box-shadow: 0 0 8px #a6e3a1; }
.lgd-live { flex: none; color: #a6e3a1; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; }

.lgd-body { display: grid; grid-template-columns: minmax(0, 1fr) 300px; }
.lgd-side { display: flex; flex-direction: column; border-left: 1px solid rgba(137, 180, 250, 0.12); }
.lgd-stage { position: relative; height: 190px; background: linear-gradient(#1e1e2e, #181825); }
.lgd-svg { display: block; width: 100%; height: 100%; }

.ground { stroke: rgba(205, 214, 244, 0.25); stroke-width: 0.04; }
.span { stroke: rgba(137, 180, 250, 0.45); stroke-width: 0.04; stroke-dasharray: 0.15 0.12; }
.mark { stroke: #89b4fa; stroke-width: 0.05; }
.npc { cursor: pointer; }
.npc .body { fill: #89b4fa; }
.npc:hover .body { fill: #b4befe; }
.npc .eye { fill: #11111b; }
.npc .arrow { fill: #f9e2af; }

.lamp { fill: #45475a; transition: r 0.2s ease, fill 0.2s; }
.lamp.on { fill: #f9e2af; filter: drop-shadow(0 0 0.35px #f9e2af) drop-shadow(0 0 0.8px rgba(249, 226, 175, 0.6)); }

.crate { fill: #cba6f7; stroke: #f5c2e7; stroke-width: 0.05; }

.lgd-bubble {
  position: absolute;
  top: 8px;
  max-width: 220px;
  padding: 6px 9px;
  border-radius: 8px;
  background: #cdd6f4;
  color: #11111b;
  font-size: 11px;
  line-height: 1.35;
  transform: translateX(-50%);
  pointer-events: none;
}
.lgd-action, .lgd-key {
  position: absolute;
  bottom: 10px;
  left: 50%;
  padding: 5px 12px;
  border: 1px solid rgba(137, 180, 250, 0.35);
  border-radius: 6px;
  background: rgba(17, 17, 27, 0.85);
  color: #cdd6f4;
  font-family: var(--font-mono);
  font-size: 12px;
  transform: translateX(-50%);
  cursor: pointer;
}
.lgd-key { min-width: 120px; border-bottom-width: 3px; }
.lgd-key.down { transform: translateX(-50%) translateY(2px); border-bottom-width: 1px; }

.lgd-sliders { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border-top: 1px solid rgba(137, 180, 250, 0.12); }
.lgd-sliders label { display: grid; grid-template-columns: 48px 1fr 32px; align-items: center; gap: 8px; color: #a6adc8; font-size: 12px; }
.lgd-sliders input { accent-color: #89b4fa; }
.lgd-sliders .val { text-align: right; color: #cdd6f4; }

.lgd-log { flex: 1; min-height: 120px; padding: 10px 12px; border-top: 1px solid rgba(137, 180, 250, 0.12); font-size: 11px; line-height: 1.6; }
.lgd-log-title { margin-bottom: 4px; color: #6c7086; letter-spacing: 0.12em; }
.lgd-log-empty { color: #6c7086; }
.lgd-log-line { color: #a6e3a1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lgd-log-line.game { color: #89b4fa; }

.lgd-hint { padding: 6px 12px; border-top: 1px solid rgba(137, 180, 250, 0.12); color: #6c7086; font-size: 11px; }

@media (max-width: 820px) {
  .lgd-body { grid-template-columns: 1fr; }
  .lgd-side { order: -1; border-left: 0; border-bottom: 1px solid rgba(137, 180, 250, 0.12); }
  .lgd-log { min-height: 0; }
}
</style>
