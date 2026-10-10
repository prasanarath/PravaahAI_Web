import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  titleId: string
  intro?: ReactNode
  /** `split` puts the intro beside the title on large screens. */
  layout?: 'stacked' | 'split'
  className?: string
}

export function SectionHeader({
  index,
  label,
  title,
  titleId,
  intro,
  layout = 'stacked',
  className = '',
}: SectionHeaderProps) {
  const split = layout === 'split'
  return (
    <Reveal className={className}>
      <div className="mb-[clamp(1.5rem,1rem+1vw,2.25rem)] flex items-center gap-3 text-muted">
        <span className="label text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="label">{label}</span>
      </div>
      <div className={split ? 'grid gap-6 lg:grid-cols-12 lg:gap-x-[clamp(2.5rem,1rem+3vw,5.5rem)]' : ''}>
        <h2
          id={titleId}
          className={`text-h2 font-semibold text-fg ${split ? 'max-w-[22ch] lg:col-span-7' : 'max-w-[22ch]'}`}
        >
          {title}
        </h2>
        {intro && (
          <div
            className={`text-lead text-fg-2 ${
              split ? 'lg:col-span-5 lg:col-start-8 lg:pt-2' : 'mt-6 max-w-[62ch]'
            }`}
          >
            {intro}
          </div>
        )}
      </div>
    </Reveal>
  )
}
