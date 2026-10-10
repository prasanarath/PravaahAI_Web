import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type RefObject } from 'react'

/**
 * Elapsed milliseconds of a scripted animation that runs while `ref` is on screen.
 * Loops after `total` ms (or holds at the end). With reduced motion it jumps to the end state.
 */
export function useTimeline(ref: RefObject<Element | null>, total: number, loop = true, tick = 100) {
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [t, setT] = useState(0)

  useEffect(() => {
    if (reduce || !inView) return
    const id = setInterval(() => setT((v) => (v >= total ? (loop ? 0 : v) : v + tick)), tick)
    return () => clearInterval(id)
  }, [inView, reduce, total, loop, tick])

  return { t: reduce ? total : t, replay: () => setT(0) }
}
