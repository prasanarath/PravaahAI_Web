import entPng from '../../assets/logos/ent-logo.png'
import entWebp from '../../assets/logos/ent-logo.webp'
import markPng from '../../assets/logos/pravaah-mark.png'
import markWebp from '../../assets/logos/pravaah-mark.webp'

/** Intrinsic ratios of the prepared logo files (see scripts/prepare-brand-assets.py). */
const MARK_RATIO = 377 / 256
const ENT_RATIO = 313 / 120

/**
 * Pravaah "P" mark. `height` is in px for the intrinsic size; `cssHeight`
 * lets callers scale it fluidly (e.g. with clamp()).
 */
export function PravaahMark({
  height = 28,
  cssHeight,
  className = '',
}: {
  height?: number
  cssHeight?: string
  className?: string
}) {
  return (
    <picture className={`shrink-0 ${className}`}>
      <source srcSet={markWebp} type="image/webp" />
      <img
        src={markPng}
        alt=""
        width={Math.round(height * MARK_RATIO)}
        height={height}
        style={{ height: cssHeight ?? height, width: 'auto' }}
        decoding="async"
      />
    </picture>
  )
}

export function EntLogo({ height = 20, className = '' }: { height?: number; className?: string }) {
  return (
    <picture className={`shrink-0 ${className}`}>
      <source srcSet={entWebp} type="image/webp" />
      <img
        src={entPng}
        alt="ENT — Enginuvity Nexus Technologies"
        width={Math.round(height * ENT_RATIO)}
        height={height}
        style={{ height, width: 'auto' }}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}

/** "Pravaah AI" wordmark set in type; "AI" takes the accent, as in the logo. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-[-0.02em] text-fg ${className}`}>
      Pravaah <span className="text-accent">AI</span>
    </span>
  )
}
