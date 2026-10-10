import { Box, Gauge, Grid3x3, Layers, TrendingDown, Wind } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const domains = [
  { name: 'CAD', note: 'Geometry from intent', Icon: Box },
  { name: 'CFD', note: 'Flow, pressure, drag', Icon: Wind },
  { name: 'FEA', note: 'Stress and strength', Icon: Grid3x3 },
  { name: 'CAE', note: 'Complete simulation workflows', Icon: Layers },
  { name: 'Optimization', note: 'Better designs, faster', Icon: TrendingDown },
  { name: 'Engineering Intelligence', note: 'Insight from every result', Icon: Gauge },
]

export function Domains() {
  return (
    <section id="domains" aria-labelledby="domains-title" className="section-y border-y border-line bg-bg-alt">
      <div className="container-wide">
        <SectionHeader index="04" label="Domains" titleId="domains-title" title="One agent. Every stage of engineering." />
        <ul className="mt-block grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {domains.map(({ name, note, Icon }, i) => (
            <li key={name}>
              <Reveal delay={i * 0.05} className="group relative h-full overflow-hidden rounded-xl border border-line bg-surface p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent lg:p-9">
                <Icon className="size-12 text-accent transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} aria-hidden />
                <p className="mt-8 text-[clamp(1.5rem,1rem+1.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] text-fg">{name}</p>
                <p className="mt-2 text-body text-fg-2">{note}</p>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
