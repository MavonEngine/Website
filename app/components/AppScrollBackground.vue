<script setup lang="ts">
import { scrollPalette as pal, rgbaString as rgba, type RGB } from '~/utils/scrollPalette'

// Fixed full-viewport background for the homepage: a warp starfield that follows scroll velocity,
// wireframe terrain that flows with scrollY, a rotating icosahedron with an orbit ring, a scan beam
// and HUD readouts on wide screens. The accent colour follows scrollPalette as the page scrolls;
// the scroll % rail on the left is ScrollRail.
const props = withDefaults(defineProps<{ intensity?: number }>(), { intensity: 1 })

type Vec3 = [number, number, number]

const canvas = ref<HTMLCanvasElement | null>(null)
let stop: (() => void) | null = null

function rot(v: Vec3, ax: number, ay: number): Vec3 {
  const [x, y, z] = v
  const cy = Math.cos(ay), sy = Math.sin(ay)
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy
  const cx = Math.cos(ax), sx = Math.sin(ax)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}

function terrainH(x: number, z: number, amp: number) {
  let edge = Math.min(1, Math.max(0, (Math.abs(x) - 1.6) / 5))
  edge = edge * edge * (3 - 2 * edge)
  return amp * edge * (Math.sin(x * 0.35 + z * 0.21) * 0.6 + Math.sin(x * 0.13 - z * 0.37 + 1.3) * 0.9 + Math.sin((x + z) * 0.6) * 0.25 + 0.6)
}

onMounted(() => {
  const c = canvas.value
  const ctx = c?.getContext('2d')
  if (!c || !ctx) return

  let reduce = false
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    // matchMedia unavailable: keep motion on
  }

  let W = 0, H = 0
  function resize() {
    W = c!.clientWidth || window.innerWidth
    H = c!.clientHeight || window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    c!.width = Math.max(1, Math.floor(W * dpr))
    c!.height = Math.max(1, Math.floor(H * dpr))
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  function readScroll() {
    const de = document.documentElement
    const y = window.scrollY || de.scrollTop || 0
    const max = (de.scrollHeight || 0) - window.innerHeight
    return { y, p: max > 0 ? y / max : 0 }
  }

  // stars
  type Star = { x: number, y: number, z: number }
  function seed(s: Star, far: boolean) {
    s.x = (Math.random() * 2 - 1) * 1.6
    s.y = Math.random() * 2 - 1
    s.z = far ? 1 : 0.05 + Math.random() * 0.95
  }
  const stars: Star[] = []
  for (let i = 0; i < 230; i++) {
    const s = { x: 0, y: 0, z: 0 }
    seed(s, false)
    stars.push(s)
  }

  // icosahedron
  const PHI = (1 + Math.sqrt(5)) / 2
  const V: Vec3[] = [[-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0], [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI], [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]]
  const E: [number, number][] = []
  for (let a = 0; a < 12; a++) {
    for (let b = a + 1; b < 12; b++) {
      const dx = V[a]![0] - V[b]![0], dy = V[a]![1] - V[b]![1], dz = V[a]![2] - V[b]![2]
      if (Math.abs(dx * dx + dy * dy + dz * dz - 4) < 0.01) E.push([a, b])
    }
  }
  const NV: Vec3[] = V.map((v) => {
    const l = Math.hypot(v[0], v[1], v[2])
    return [v[0] / l, v[1] / l, v[2] / l]
  })

  let t = 0, last = performance.now(), lastY = readScroll().y, vel = 0, raf = 0, live = true
  const ROWS = 26, COLS = 44
  const pts: Vec3[][] = []
  for (let r = 0; r <= ROWS; r++) pts.push(new Array<Vec3>(COLS + 1))

  function frame(now: number) {
    if (!live || !ctx) return
    const dt = Math.min(50, now - last) / 16.667
    last = now
    const sc = readScroll()
    const dv = sc.y - lastY
    lastY = sc.y
    vel += (dv - vel) * 0.18
    if (!reduce) t += dt * 0.016
    const I = props.intensity
    const p = sc.p, col = pal(p), col2 = pal(Math.min(1, p + 0.2))
    const narrow = W < 820 ? 0.5 : 1
    const cx = W / 2, cy = H * 0.42

    ctx.clearRect(0, 0, W, H)
    if (I <= 0) {
      raf = requestAnimationFrame(frame)
      return
    }
    ctx.lineCap = 'round'

    // --- warp starfield: speeds up with scroll velocity, reverses scrolling up
    const sp = (reduce ? 0 : 0.0017 * dt) + Math.max(-90, Math.min(140, vel)) * 0.00007
    const streak = Math.min(1, Math.abs(vel) / 40)
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]!, pz = s.z
      s.z -= sp
      if (s.z < 0.04) {
        seed(s, true)
        continue
      }
      if (s.z > 1) {
        seed(s, false)
        s.z = 0.06
        continue
      }
      const X = cx + (s.x / s.z) * W * 0.32, Y = cy + (s.y / s.z) * H * 0.32
      if (X < -20 || X > W + 20 || Y < -20 || Y > H + 20) continue
      const tail = 1 + streak * 6
      const pzz = s.z + (pz - s.z) * tail
      const PX = cx + (s.x / pzz) * W * 0.32, PY = cy + (s.y / pzz) * H * 0.32
      const near = 1 - s.z
      ctx.strokeStyle = rgba(i % 5 === 0 ? col2 : [205, 214, 244] as RGB, near * 0.85 * Math.min(1, I))
      ctx.lineWidth = near * 1.9 + 0.3
      ctx.beginPath()
      ctx.moveTo(PX, PY)
      ctx.lineTo(X, Y)
      ctx.stroke()
    }

    // --- wireframe terrain flowing toward the viewer as you scroll
    const horizon = H * 0.6
    const travel = sc.y * 0.0045 + t * 0.35
    const base = Math.floor(travel), off = travel - base
    const amp = 0.8 + 0.9 * Math.sin(p * Math.PI)
    const camY = 1.35
    for (let r = 0; r <= ROWS; r++) {
      const wz = r + 1 - off
      const zz = wz + base
      for (let k = 0; k <= COLS; k++) {
        const wx = (k - COLS / 2) * 0.85
        const h = terrainH(wx, zz, amp)
        pts[r]![k] = [cx + (wx / wz) * W * 0.5, horizon + ((camY - h) / wz) * H * 0.55, wz]
      }
    }
    ctx.lineWidth = 1
    for (let r = 0; r <= ROWS; r++) {
      const row = pts[r]!
      const depth = row[0]![2] / (ROWS + 1)
      let al = Math.pow(1 - depth, 1.6) * 0.5 * I
      if (r === 0) al *= (1 - off)
      ctx.strokeStyle = rgba(col, al)
      ctx.beginPath()
      for (let k = 0; k <= COLS; k++) {
        const q = row[k]!
        if (k) ctx.lineTo(q[0], q[1])
        else ctx.moveTo(q[0], q[1])
      }
      ctx.stroke()
    }
    for (let k = 0; k <= COLS; k++) {
      ctx.strokeStyle = rgba(col, 0.16 * I)
      ctx.beginPath()
      for (let r = 0; r <= ROWS; r++) {
        const q = pts[r]![k]!
        if (r) ctx.lineTo(q[0], q[1])
        else ctx.moveTo(q[0], q[1])
      }
      ctx.stroke()
    }
    // horizon glow + fade terrain into the horizon
    const hg = ctx.createLinearGradient(0, horizon - 90, 0, horizon + 60)
    hg.addColorStop(0, 'rgba(17,17,27,0)')
    hg.addColorStop(0.6, rgba(col, 0.10 * I))
    hg.addColorStop(1, 'rgba(17,17,27,0)')
    ctx.fillStyle = hg
    ctx.fillRect(0, horizon - 90, W, 150)

    // --- wireframe icosahedron that travels and turns with scroll
    const ox = W * (0.5 + 0.3 * Math.cos(p * Math.PI * 2.2))
    const oy = H * (0.33 + 0.05 * Math.sin(p * Math.PI * 3))
    const R = Math.min(W, H) * (0.12 + 0.05 * Math.sin(p * Math.PI))
    const ax = t * 0.33 + sc.y * 0.0021, ay = t * 0.21 + sc.y * 0.0013
    const fa = 0.55 * narrow * Math.min(1.4, I)
    const drawSolid = (scale: number, sax: number, say: number, alpha: number, w: number) => {
      const P: Vec3[] = NV.map((v) => {
        const q = rot(v, sax, say)
        const f = 3 / (3 + q[2])
        return [ox + q[0] * R * scale * f, oy + q[1] * R * scale * f, q[2]]
      })
      for (const [ia, ib] of E) {
        const A = P[ia]!, B = P[ib]!
        const dz = (A[2] + B[2]) / 2
        const aa = alpha * (0.35 + 0.65 * (1 - (dz + 1) / 2))
        ctx.strokeStyle = rgba(col, aa * 0.35)
        ctx.lineWidth = w * 4
        ctx.beginPath()
        ctx.moveTo(A[0], A[1])
        ctx.lineTo(B[0], B[1])
        ctx.stroke()
        ctx.strokeStyle = rgba(col, aa)
        ctx.lineWidth = w
        ctx.beginPath()
        ctx.moveTo(A[0], A[1])
        ctx.lineTo(B[0], B[1])
        ctx.stroke()
      }
      for (const q of P) {
        ctx.fillStyle = rgba([205, 214, 244] as RGB, alpha * (0.5 + 0.5 * (1 - (q[2] + 1) / 2)))
        ctx.beginPath()
        ctx.arc(q[0], q[1], 1.8 * w, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    drawSolid(1, ax, ay, fa, 1.1)
    drawSolid(0.52, -ax * 1.4, ay * 1.7 + 1, fa * 0.8, 0.9)

    // orbit ring + packet (client ⇄ server sync)
    const tilt = 0.32 + 0.1 * Math.sin(t * 0.4)
    ctx.strokeStyle = rgba(col2, 0.28 * fa / 0.55)
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.ellipse(ox, oy, R * 1.75, R * 1.75 * tilt, -0.35, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([3, 9])
    ctx.beginPath()
    ctx.ellipse(ox, oy, R * 2.25, R * 2.25 * tilt * 0.8, -0.35, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    for (let n = 0; n < 3; n++) {
      const ang = t * 1.4 + sc.y * 0.004 + n * (Math.PI * 2 / 3)
      const ex = R * 1.75 * Math.cos(ang), ey = R * 1.75 * tilt * Math.sin(ang)
      const rr = -0.35
      const px = ox + ex * Math.cos(rr) - ey * Math.sin(rr), py = oy + ex * Math.sin(rr) + ey * Math.cos(rr)
      ctx.fillStyle = rgba(col2, 0.9 * fa / 0.55)
      ctx.beginPath()
      ctx.arc(px, py, 2.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = rgba(col2, 0.18 * fa / 0.55)
      ctx.beginPath()
      ctx.arc(px, py, 9, 0, Math.PI * 2)
      ctx.fill()
    }

    // --- scan beam sweeping down with scroll
    const by = ((sc.y * 0.55 + t * 60) % (H + 240)) - 120
    const sg = ctx.createLinearGradient(0, by - 60, 0, by + 60)
    sg.addColorStop(0, 'rgba(17,17,27,0)')
    sg.addColorStop(0.5, rgba(col, 0.055 * I))
    sg.addColorStop(1, 'rgba(17,17,27,0)')
    ctx.fillStyle = sg
    ctx.fillRect(0, by - 60, W, 120)
    ctx.fillStyle = rgba(col, 0.18 * I)
    ctx.fillRect(0, by, W, 1)

    // --- HUD readouts (the scroll % rail is ScrollRail)
    if (W > 1000) {
      ctx.font = '500 10px "JetBrains Mono", monospace'
      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(166,173,200,0.6)'
      ctx.fillText('Z ' + (sc.y / 10).toFixed(1).padStart(7, '0'), W - 18, H - 52)
      ctx.fillText('V ' + (vel >= 0 ? '+' : '-') + Math.abs(vel).toFixed(1).padStart(5, '0'), W - 18, H - 36)
      ctx.fillStyle = rgba(col, 0.8)
      ctx.fillText('TICK ' + String(Math.floor(now / 16.667) % 100000).padStart(5, '0'), W - 18, H - 20)
      ctx.textAlign = 'left'
    }

    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)

  stop = () => {
    live = false
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
})

onBeforeUnmount(() => stop?.())
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="fixed top-0 left-0 w-full h-screen max-h-[1400px] z-0 pointer-events-none block"
  />
  <div
    aria-hidden="true"
    class="fixed inset-0 z-0 pointer-events-none"
    style="background: radial-gradient(ellipse 80% 55% at 50% 0%, rgba(137,180,250,0.14) 0%, transparent 70%), radial-gradient(ellipse 120% 90% at 50% 50%, transparent 55%, rgba(17,17,27,0.85) 100%)"
  />
</template>
