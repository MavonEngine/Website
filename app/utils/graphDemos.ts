import type { GraphEntity, NodeDefinition } from '@mavonengine/core/Graph/NodeRegistry'
import type { GraphData, GraphValue } from '@mavonengine/core/Graph/types'
import type { GraphAnalysis } from '@mavonengine/core/Graph/validate'
import { registerNode } from '@mavonengine/core/Graph/NodeRegistry'
import { registerBuiltinNodes } from '@mavonengine/core/Graph/Nodes/builtin'
import { parseGraphData } from '@mavonengine/core/Graph/types'
import { analyzeGraph } from '@mavonengine/core/Graph/validate'
import lampFile from '~/graphs/lamp.graph.json'
import npcFile from '~/graphs/server-npc.graph.json'
import spinnerFile from '~/graphs/spinner.graph.json'
import switchFile from '~/graphs/switch.graph.json'

/*
 * The live logic graph demos on the website (LogicGraphDemo). The graphs are ordinary graph files, run by the engine's
 * own GraphRuntime: server-npc.graph.json is a copy of the multiplayer template's.
 */

registerBuiltinNodes()

/** Who hears a Say in Chat node, by the id of the entity saying it */
export const chatListeners = new Map<string, (message: string) => void>()

/**
 * The template's Say in Chat node (template-multiplayer server/src/Base/Npc/sayInChat.ts), with the same ports. In the
 * game the server posts the line in the chat; here the demo shows it in a speech bubble
 */
const sayInChatNode: NodeDefinition = {
  type: 'chat.say',
  label: 'Say in Chat',
  category: 'Actions',
  description: 'Post a line in the chat as the graph\'s Self',
  kinds: ['logic'],
  inputs: {
    run: { type: 'exec', label: '' },
    message: { type: 'any', label: 'Message', default: 'Hello!' }
  },
  outputs: {
    then: { type: 'exec', label: '' }
  },
  run: ({ message }, { self }) => {
    chatListeners.get(self?.id ?? '')?.(String(message ?? ''))
  }
}
registerNode(sayInChatNode)

export interface DemoEntity extends GraphEntity {
  position: number[]
  rotation: number[]
  scale: number[]
}

export function makeEntity(id: string): DemoEntity {
  const entity: DemoEntity = {
    id,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    getPosition: () => [...entity.position],
    setPosition: (value) => { entity.position = [...value] },
    getRotation: () => [...entity.rotation],
    setRotation: (value) => { entity.rotation = [...value] },
    getScale: () => [...entity.scale],
    setScale: (value) => { entity.scale = [...value] }
  }
  return entity
}

export interface DemoGraph {
  /** Tab label */
  label: string
  /** Where the graph file lives in a project */
  file: string
  graph: GraphData
  analysis: GraphAnalysis
  /** The entity id the graph runs with as Self */
  self: string
}

export interface DemoSlider {
  /** Index into the demo's graphs */
  graph: number
  parameter: string
  label: string
  min: number
  max: number
  step: number
}

export interface GraphDemo {
  graphs: DemoGraph[]
  entities: string[]
  sliders: DemoSlider[]
}

function demoGraph(label: string, file: unknown, self: string): DemoGraph {
  const graph = parseGraphData(file)
  return { label, file: `graphs/${graph.name}.graph.json`, graph, analysis: analyzeGraph(graph), self }
}

export type GraphDemoName = 'npc' | 'messages' | 'spinner'

export const GRAPH_DEMOS: Record<GraphDemoName, GraphDemo> = {
  npc: {
    graphs: [demoGraph('Server NPC', npcFile, 'server_npc')],
    entities: ['server_npc'],
    sliders: [
      { graph: 0, parameter: 'speed', label: 'speed', min: 0.5, max: 6, step: 0.5 },
      { graph: 0, parameter: 'range', label: 'range', min: 1, max: 5, step: 0.5 }
    ]
  },
  messages: {
    graphs: [
      demoGraph('Switch', switchFile, 'switch'),
      demoGraph('Lamp', lampFile, 'lamp')
    ],
    entities: ['switch', 'lamp'],
    sliders: []
  },
  spinner: {
    graphs: [demoGraph('Spinner', spinnerFile, 'crate')],
    entities: ['crate'],
    sliders: [
      { graph: 0, parameter: 'spin', label: 'spin', min: -6, max: 6, step: 0.5 },
      { graph: 0, parameter: 'pulse', label: 'pulse', min: 0, max: 12, step: 1 }
    ]
  }
}

export function parameterDefaults(graph: GraphData): Record<string, GraphValue> {
  return Object.fromEntries(graph.parameters.map(p => [p.name, p.default]))
}
