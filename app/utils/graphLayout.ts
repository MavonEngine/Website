import type { PortSpec } from '@mavonengine/core/Graph/NodeRegistry'
import type { GraphData, GraphNodeData, GraphValue, PortType } from '@mavonengine/core/Graph/types'
import type { GraphAnalysis } from '@mavonengine/core/Graph/validate'
import { getNode } from '@mavonengine/core/Graph/NodeRegistry'
import { registerBuiltinNodes } from '@mavonengine/core/Graph/Nodes/builtin'
import { GRAPH_COMMENT, GRAPH_GROUP } from '@mavonengine/core/Graph/types'

/*
 * Where the website's read-only graph view (LogicGraphView) draws a graph: the nodes at their positions from the
 * graph file, sized from their rows the way the level editor's Graphs view lays them out (outputs, settings, inputs),
 * and the edges between their ports. Worked out here rather than measured, so it is the same on the server and the client.
 */

registerBuiltinNodes()

export const NODE_WIDTH = 176
export const NODE_HEADER = 26
export const NODE_ROW = 22
const NODE_PADDING = 6

/** The editor's pin colors (editor/src/Editor/UI/Graphs/graphModel.ts) */
export const PIN_COLORS: Record<string, string> = {
  float: '#8fb3ff',
  int: '#5fd1c1',
  bool: '#e06c75',
  vec2: '#c99cff',
  vec3: '#f0c674',
  vec4: '#f59e6b',
  color: '#ffd84d',
  texture: '#e5c07b',
  string: '#9ca3af',
  entity: '#56b6c2',
  exec: '#ffffff',
  number: '#a5b4fc',
  any: '#d4d4d8'
}

export interface LaidOutRow {
  side: 'out' | 'setting' | 'in'
  key: string
  label: string
  type: PortType
  /** What the node shows for a setting or an unconnected input */
  value?: string
}

export interface LaidOutNode {
  node: GraphNodeData
  kind: 'node' | 'comment' | 'group'
  label: string
  event: boolean
  description?: string
  x: number
  y: number
  width: number
  height: number
  rows: LaidOutRow[]
  /** A comment's text or a group's name */
  text?: string
}

export interface LaidOutEdge {
  id: string
  from: string
  to: string
  exec: boolean
  color: string
  path: string
}

export interface GraphLayout {
  nodes: LaidOutNode[]
  edges: LaidOutEdge[]
  bounds: { x: number, y: number, width: number, height: number }
}

export function formatValue(value: GraphValue | undefined): string {
  if (Array.isArray(value))
    return `(${value.map(n => Math.round(n * 1000) / 1000).join(', ')})`
  if (typeof value === 'number')
    return String(Math.round(value * 1000) / 1000)
  if (typeof value === 'boolean')
    return value ? 'true' : 'false'
  const text = String(value ?? '')
  return text.length > 18 ? `${text.slice(0, 17)}…` : text
}

function rowsOf(node: GraphNodeData, inputs: Record<string, PortSpec>, outputs: Record<string, PortSpec>, settings: Record<string, PortSpec>, analysis: GraphAnalysis): LaidOutRow[] {
  const connected = analysis.incoming.get(node.id) ?? {}
  const outputTypes = analysis.outputTypes.get(node.id) ?? {}
  const value = (key: string, spec: PortSpec) => node.values?.[key] ?? spec.default
  return [
    ...Object.entries(outputs).map(([key, spec]): LaidOutRow => ({
      side: 'out',
      key,
      label: spec.label ?? key,
      type: outputTypes[key] ?? spec.type
    })),
    ...Object.entries(settings).map(([key, spec]): LaidOutRow => ({
      side: 'setting',
      key,
      label: spec.label ?? key,
      type: spec.type,
      value: formatValue(value(key, spec))
    })),
    ...Object.entries(inputs).map(([key, spec]): LaidOutRow => ({
      side: 'in',
      key,
      label: spec.label ?? key,
      type: spec.type,
      value: connected[key] || spec.type === 'exec' || spec.type === 'texture'
        ? undefined
        : spec.type === 'entity'
          ? (String(value(key, spec) ?? '') || 'Self')
          : formatValue(value(key, spec))
    }))
  ]
}

export function layoutGraph(graph: GraphData, analysis: GraphAnalysis): GraphLayout {
  const nodes: LaidOutNode[] = []
  const ports = new Map<string, { x: number, y: number }>()

  for (const node of graph.nodes) {
    const [x, y] = node.position
    if (node.type === GRAPH_GROUP || node.type === GRAPH_COMMENT) {
      const group = node.type === GRAPH_GROUP
      nodes.push({
        node,
        kind: group ? 'group' : 'comment',
        label: group ? 'Group' : 'Comment',
        event: false,
        x,
        y,
        width: Number(node.values?.width ?? (group ? 420 : 260)),
        height: Number(node.values?.height ?? (group ? 260 : 120)),
        rows: [],
        text: String(node.values?.[group ? 'name' : 'text'] ?? '')
      })
      continue
    }

    const definition = getNode(node.type)
    const rows = definition
      ? rowsOf(node, definition.inputs, definition.outputs, definition.settings ?? {}, analysis)
      : []
    nodes.push({
      node,
      kind: 'node',
      label: definition?.label ?? node.type,
      event: !!definition?.trigger,
      description: definition?.description,
      x,
      y,
      width: NODE_WIDTH,
      height: NODE_HEADER + rows.length * NODE_ROW + NODE_PADDING,
      rows
    })
    rows.forEach((row, i) => {
      if (row.side === 'setting')
        return
      ports.set(`${node.id}:${row.side}:${row.key}`, {
        x: row.side === 'out' ? x + NODE_WIDTH : x,
        y: y + NODE_HEADER + i * NODE_ROW + NODE_ROW / 2
      })
    })
  }

  const edges: LaidOutEdge[] = []
  for (const edge of graph.edges) {
    const from = ports.get(`${edge.from.node}:out:${edge.from.port}`)
    const to = ports.get(`${edge.to.node}:in:${edge.to.port}`)
    if (!from || !to)
      continue
    const type = analysis.outputTypes.get(edge.from.node)?.[edge.from.port] ?? 'any'
    const bend = Math.max(40, Math.abs(to.x - from.x) / 2)
    edges.push({
      id: `${edge.from.node}.${edge.from.port}-${edge.to.node}.${edge.to.port}`,
      from: edge.from.node,
      to: edge.to.node,
      exec: type === 'exec',
      color: PIN_COLORS[type] ?? PIN_COLORS.any!,
      path: `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`
    })
  }

  const minX = Math.min(...nodes.map(n => n.x))
  const minY = Math.min(...nodes.map(n => n.y))
  const maxX = Math.max(...nodes.map(n => n.x + n.width))
  const maxY = Math.max(...nodes.map(n => n.y + n.height))
  return {
    // Groups first, so the nodes in them draw on top
    nodes: [...nodes.filter(n => n.kind === 'group'), ...nodes.filter(n => n.kind !== 'group')],
    edges,
    bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }
}
