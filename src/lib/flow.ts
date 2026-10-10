/**
 * Geometry helpers for the Pravaah flow motif: smooth streamline paths and
 * analytic stream functions used in the diagrams.
 */

export type Point = readonly [number, number]

const round = (n: number) => Math.round(n * 10) / 10

/** Smooth open path through the given points (Catmull–Rom → cubic Bézier). */
export function smoothPath(points: readonly Point[], tension = 1): string {
  if (points.length < 2) return ''
  let d = `M${round(points[0][0])},${round(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension
    d += ` C${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(p2[0])},${round(p2[1])}`
  }
  return d
}

/**
 * A bundle of streamlines that converge at each node and open up between them,
 * like flow passing through a series of throats.
 */
export function streamlineBundle(options: {
  nodesX: readonly number[]
  centerY: number
  count: number
  /** half-spacing between lines at a node */
  throat: number
  /** spacing between lines midway between nodes, per segment (cycled) */
  spread: readonly number[]
  /** vertical drift of the bundle midway between nodes, per segment (cycled) */
  drift: readonly number[]
  startX: number
  endX: number
  /** spacing at the open ends */
  openSpread: number
}): string[] {
  const { nodesX, centerY, count, throat, spread, drift, startX, endX, openSpread } = options
  const paths: string[] = []
  for (let k = 0; k < count; k++) {
    const o = k - (count - 1) / 2
    const pts: Point[] = [[startX, centerY + o * openSpread]]
    nodesX.forEach((x, i) => {
      pts.push([x, centerY + o * throat])
      const next = nodesX[i + 1]
      if (next !== undefined) {
        const s = spread[i % spread.length]
        const dft = drift[i % drift.length]
        pts.push([(x + next) / 2, centerY + dft + o * s])
      }
    })
    pts.push([endX, centerY + o * openSpread])
    paths.push(smoothPath(pts))
  }
  return paths
}
