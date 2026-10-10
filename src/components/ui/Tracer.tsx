import type { CSSProperties } from 'react'

interface TracerProps {
  d: string
  /** seconds per period */
  duration: number
  delay?: number
  /** dash + gap, in user units */
  dash?: number
  gap?: number
  stroke: string
  width?: number
  reverse?: boolean
  opacity?: number
}

/** Animated tracer particles travelling along a path (the Pravaah flow motif). */
export function Tracer({
  d,
  duration,
  delay = 0,
  dash = 8,
  gap = 152,
  stroke,
  width = 1.6,
  reverse = false,
  opacity = 1,
}: TracerProps) {
  const style = {
    '--flow-duration': `${duration}s`,
    '--flow-delay': `${delay}s`,
    '--flow-dash': `${dash}px ${gap}px`,
    '--flow-period': `${dash + gap}px`,
    stroke,
    strokeWidth: width,
    opacity,
  } as CSSProperties
  return <path d={d} className={`flow-tracer ${reverse ? 'flow-tracer-reverse' : ''}`} style={style} />
}
