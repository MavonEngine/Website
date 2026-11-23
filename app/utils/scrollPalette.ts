// Accent colour along the page: blue → sapphire → lavender → mauve → teal → blue as you scroll.
// Shared by the homepage background and the scroll rail so both shift colour together.
export type RGB = [number, number, number]

const PAL: RGB[] = [[137, 180, 250], [116, 199, 236], [180, 190, 254], [203, 166, 247], [148, 226, 213], [137, 180, 250]]

/** The accent colour at scroll progress `p` (0–1) */
export function scrollPalette(p: number): RGB {
  const f = Math.max(0, Math.min(0.9999, p)) * (PAL.length - 1)
  const i = Math.floor(f)
  const k = f - i
  const a = PAL[i]!
  const b = PAL[i + 1]!
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]
}

export function rgbaString(col: RGB, a: number) {
  return `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${Math.max(0, Math.min(1, a)).toFixed(3)})`
}
