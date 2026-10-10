import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Silent looping product video. Loads and plays only while near the viewport;
 * with reduced motion it does not autoplay and shows native controls instead.
 */
export function LoopVideo({ src, poster, label, className = '' }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const near = useInView(ref, { margin: '200px 0px' })

  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    if (near) void v.play().catch(() => {})
    else v.pause()
  }, [near, reduce, src])

  return (
    <video
      ref={ref}
      key={src}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={near ? 'auto' : 'none'}
      controls={!!reduce}
      aria-label={label}
      className={`block h-full w-full bg-black object-cover ${className}`}
    />
  )
}
