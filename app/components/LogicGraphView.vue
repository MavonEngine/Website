<script setup lang="ts">
// A read-only view of a logic graph, drawn like the level editor's Graphs view. Steps in `active` light up, along
// with the exec wires between them. Drag to pan, Ctrl/⌘ + scroll (or the buttons) to zoom.
import type { GraphData } from '@mavonengine/core/Graph/types'
import type { GraphAnalysis } from '@mavonengine/core/Graph/validate'
import { layoutGraph, NODE_HEADER, NODE_ROW, PIN_COLORS } from '~/utils/graphLayout'

const props = withDefaults(defineProps<{
  graph: GraphData
  analysis: GraphAnalysis
  active?: Set<string>
  height?: number
}>(), { active: () => new Set(), height: 420 })

const layout = computed(() => layoutGraph(props.graph, props.analysis))

const viewport = ref<HTMLElement>()
const view = reactive({ x: 0, y: 0, scale: 0.6 })
const MIN_SCALE = 0.2
const MAX_SCALE = 1.6
const PADDING = 24

function fit() {
  const el = viewport.value
  if (!el)
    return
  const { bounds } = layout.value
  const scale = Math.min(
    (el.clientWidth - PADDING * 2) / bounds.width,
    (el.clientHeight - PADDING * 2) / bounds.height,
    1
  )
  view.scale = Math.max(MIN_SCALE, scale)
  view.x = (el.clientWidth - bounds.width * view.scale) / 2 - bounds.x * view.scale
  view.y = (el.clientHeight - bounds.height * view.scale) / 2 - bounds.y * view.scale
}

function zoomAt(factor: number, cx: number, cy: number) {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * factor))
  view.x = cx - (cx - view.x) * (scale / view.scale)
  view.y = cy - (cy - view.y) * (scale / view.scale)
  view.scale = scale
}

function zoomButton(factor: number) {
  const el = viewport.value
  if (el)
    zoomAt(factor, el.clientWidth / 2, el.clientHeight / 2)
}

function onWheel(e: WheelEvent) {
  // Plain scrolling keeps scrolling the page
  if (!e.ctrlKey && !e.metaKey)
    return
  e.preventDefault()
  const rect = viewport.value!.getBoundingClientRect()
  zoomAt(Math.exp(-e.deltaY * 0.002), e.clientX - rect.left, e.clientY - rect.top)
}

let drag: { id: number, x: number, y: number } | undefined
function onPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest('button'))
    return
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY }
  viewport.value?.setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!drag || drag.id !== e.pointerId)
    return
  view.x += e.clientX - drag.x
  view.y += e.clientY - drag.y
  drag.x = e.clientX
  drag.y = e.clientY
}
function onPointerUp(e: PointerEvent) {
  if (drag?.id === e.pointerId)
    drag = undefined
}

let observer: ResizeObserver | undefined
onMounted(() => {
  fit()
  observer = new ResizeObserver(() => fit())
  if (viewport.value)
    observer.observe(viewport.value)
})
onBeforeUnmount(() => observer?.disconnect())
watch(() => props.graph, () => nextTick(fit))

defineExpose({ fit })

const rowStyle = (i: number) => ({ top: `${NODE_HEADER + i * NODE_ROW}px`, height: `${NODE_ROW}px` })
</script>

<template>
  <div
    ref="viewport"
    class="lgv"
    :style="{ height: `${height}px` }"
    @wheel="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <div
      class="lgv-world"
      :style="{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }"
    >
      <template
        v-for="item in layout.nodes.filter(n => n.kind === 'group')"
        :key="item.node.id"
      >
        <div
          class="lgv-group"
          :style="{ left: `${item.x}px`, top: `${item.y}px`, width: `${item.width}px`, height: `${item.height}px` }"
        >
          <div class="lgv-group-header">
            {{ item.text }}
          </div>
        </div>
      </template>

      <svg
        class="lgv-edges"
        aria-hidden="true"
      >
        <path
          v-for="edge in layout.edges"
          :key="edge.id"
          :d="edge.path"
          :stroke="edge.color"
          :class="['lgv-edge', { exec: edge.exec, live: edge.exec && active.has(edge.from) && active.has(edge.to) }]"
        />
      </svg>

      <template
        v-for="item in layout.nodes.filter(n => n.kind !== 'group')"
        :key="item.node.id"
      >
        <div
          v-if="item.kind === 'comment'"
          class="lgv-comment"
          :style="{ left: `${item.x}px`, top: `${item.y}px`, width: `${item.width}px`, height: `${item.height}px` }"
        >
          <div class="lgv-comment-header">
            Comment
          </div>
          <div class="lgv-comment-text">
            {{ item.text }}
          </div>
        </div>
        <div
          v-else
          :class="['lgv-node', { event: item.event, running: active.has(item.node.id) }]"
          :style="{ left: `${item.x}px`, top: `${item.y}px`, width: `${item.width}px`, height: `${item.height}px` }"
          :title="item.description"
        >
          <div class="lgv-node-header">
            {{ item.label }}
          </div>
          <div
            v-for="(row, i) in item.rows"
            :key="`${row.side}-${row.key}`"
            :class="['lgv-row', row.side]"
            :style="rowStyle(i)"
          >
            <span
              v-if="row.side !== 'setting'"
              :class="['lgv-pin', { exec: row.type === 'exec' }]"
              :style="{ background: PIN_COLORS[row.type] ?? PIN_COLORS.number }"
            />
            <span class="lgv-label">{{ row.label }}</span>
            <span
              v-if="row.value !== undefined"
              class="lgv-value"
            >{{ row.value }}</span>
          </div>
        </div>
      </template>
    </div>

    <div class="lgv-tools">
      <button
        type="button"
        aria-label="Zoom in"
        @click="zoomButton(1.25)"
      >
        +
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        @click="zoomButton(0.8)"
      >
        −
      </button>
      <button
        type="button"
        aria-label="Fit the graph in view"
        @click="fit"
      >
        ⤢
      </button>
    </div>
  </div>
</template>

<style scoped>
.lgv {
  position: relative;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  background-color: #11111b;
  background-image: radial-gradient(rgba(205, 214, 244, 0.09) 1px, transparent 1px);
  background-size: 18px 18px;
  font-family: var(--font-sans, Inter, sans-serif);
}
.lgv:active { cursor: grabbing; }
.lgv-world { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.lgv-edges { position: absolute; left: 0; top: 0; width: 1px; height: 1px; overflow: visible; pointer-events: none; }
.lgv-edge { fill: none; stroke-width: 2; opacity: 0.55; }
.lgv-edge.exec { stroke-width: 2.5; opacity: 0.7; }
.lgv-edge.live { stroke: #f9e2af !important; opacity: 1; filter: drop-shadow(0 0 4px rgba(249, 226, 175, 0.8)); }

.lgv-group {
  position: absolute;
  border: 1px solid rgba(120, 160, 220, 0.45);
  border-radius: 6px;
  background: rgba(120, 160, 220, 0.07);
}
.lgv-group-header {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  border-bottom: 1px solid rgba(120, 160, 220, 0.25);
  border-radius: 6px 6px 0 0;
  background: rgba(120, 160, 220, 0.14);
  color: #cdd6f4;
  font-size: 13px;
  font-weight: 600;
}

.lgv-comment {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(220, 220, 170, 0.35);
  border-radius: 4px;
  background: rgba(220, 220, 170, 0.08);
}
.lgv-comment-header {
  padding: 2px 10px;
  color: #f9e2af;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.lgv-comment-text { padding: 0 10px 8px; color: #bac2de; font-size: 12px; line-height: 1.45; overflow: hidden; }

.lgv-node {
  position: absolute;
  border: 1px solid #45475a;
  border-radius: 4px;
  background: #1e1e2e;
  color: #cdd6f4;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.lgv-node.running {
  border-color: #f9e2af;
  box-shadow: 0 0 0 2px rgba(249, 226, 175, 0.45), 0 2px 8px rgba(0, 0, 0, 0.4);
}
.lgv-node-header {
  height: 26px;
  padding: 0 10px;
  line-height: 26px;
  border-bottom: 1px solid #313244;
  border-radius: 4px 4px 0 0;
  background: #181825;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lgv-node.event .lgv-node-header { background: #4a2a2a; }

.lgv-row {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  white-space: nowrap;
}
.lgv-row.out { justify-content: flex-end; }
.lgv-label { color: #bac2de; }
.lgv-value {
  margin-left: auto;
  padding: 0 4px;
  border-radius: 3px;
  background: #11111b;
  color: #a6adc8;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lgv-row.setting .lgv-value { max-width: 100px; }
.lgv-pin {
  position: absolute;
  top: 50%;
  width: 9px;
  height: 9px;
  border: 1px solid #11111b;
  border-radius: 50%;
  transform: translateY(-50%);
}
.lgv-row.in .lgv-pin { left: -5px; }
.lgv-row.out .lgv-pin { right: -5px; }
.lgv-pin.exec {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  clip-path: polygon(0 0, 60% 0, 100% 50%, 60% 100%, 0 100%);
}

.lgv-tools {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  gap: 4px;
}
.lgv-tools button {
  width: 28px;
  height: 28px;
  border: 1px solid rgba(137, 180, 250, 0.25);
  border-radius: 6px;
  background: rgba(30, 30, 46, 0.9);
  color: #cdd6f4;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
}
.lgv-tools button:hover { border-color: #89b4fa; }
</style>
