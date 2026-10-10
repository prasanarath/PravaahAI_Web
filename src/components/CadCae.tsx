import { ArrowRight, BarChart3, Box, Layers, TrendingDown, Wind } from 'lucide-react'
import submarine from '../assets/images/submarine-cfd.webp'
import cadLightPoster from '../assets/videos/example3-poster.webp'
const cadLight = `${import.meta.env.BASE_URL}videos/example3.mp4`
const simulationVideo = `${import.meta.env.BASE_URL}videos/simulation.mp4`
import { LoopVideo } from './LoopVideo'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const chain = [
  { label: 'CAD', Icon: Box },
  { label: 'CAE', Icon: Layers },
  { label: 'Simulation', Icon: Wind },
  { label: 'Analysis', Icon: BarChart3 },
  { label: 'Optimization', Icon: TrendingDown },
]

function PanelHead({ tag, name, action }: { tag: string; name: string; action: string }) {
  return (
    <div className="flex items-end justify-between gap-4 px-6 py-5">
      <div>
        <p className="text-[clamp(2rem,1.2rem+2vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-fg">{tag}</p>
        <p className="label mt-2 text-muted">{name}</p>
      </div>
      <p className="label inline-flex items-center gap-2 text-accent">
        {action}
      </p>
    </div>
  )
}

export function CadCae() {
  return (
    <section id="cad-cae" aria-labelledby="cadcae-title" className="section-y border-y border-line bg-bg-alt">
      <div className="container-wide max-w-[calc(120rem+2*var(--gutter))]">
        <SectionHeader index="01" label="CAD + CAE" titleId="cadcae-title" title="From a sentence to a model. From a model to a simulation." />

        <div className="mt-block grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* CAD */}
          <Reveal>
            <figure className="media-frame h-full">
              <PanelHead tag="CAD" name="Computer-Aided Design" action="Pravaah creates → CAD model" />
              <p className="mx-6 mb-5 rounded-md border border-line bg-bg px-4 py-3 text-body-sm text-fg">
                <span className="label mr-2 text-accent">You type</span>“Design a lightweight mounting bracket with four
                mounting holes.”
              </p>
              <div className="aspect-video border-t border-line">
                <LoopVideo
                  src={cadLight}
                  poster={cadLightPoster}
                  label="Pravaah turning a written request into a CAD model of a mounting bracket"
                />
              </div>
            </figure>
          </Reveal>

          {/* CAE */}
          <Reveal delay={0.08}>
            <figure className="media-frame h-full">
              <PanelHead tag="CAE" name="Computer-Aided Engineering" action="Pravaah simulates → CFD" />
              <div className="mx-6 mb-5 flex flex-wrap gap-2">
                {['Pressure contour', 'Velocity streamlines', 'Drag'].map((x) => (
                  <span key={x} className="label rounded-[4px] border border-line px-2.5 py-1.5 text-fg-2">
                    {x}
                  </span>
                ))}
              </div>
                <div className="relative aspect-video overflow-hidden border-t border-line bg-black">
                  {simulationVideo ? (
                    <video
                      src={simulationVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label="CFD simulation visualization"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      src={submarine}
                      alt="CFD result on a submarine hull: pressure contour and velocity streamlines"
                      loading="lazy"
                      className="h-full w-full scale-[1.35] object-cover object-[80%_75%] transition-transform duration-[2000ms] hover:scale-[1.45]"
                    />
                  )}
                </div>
            </figure>
          </Reveal>
        </div>

        {/* The chain */}
        <Reveal className="mt-block">
          <ol className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-4 lg:justify-between">
            {chain.map(({ label, Icon }, i) => (
              <li key={label} className="flex items-center gap-3 lg:flex-1 lg:last:flex-none">
                <span className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 lg:px-5 lg:py-4">
                  <Icon className="size-6 text-accent" strokeWidth={1.5} aria-hidden />
                  <span className="text-h4 font-semibold text-fg">{label}</span>
                </span>
                {i < chain.length - 1 && (
                  <>
                    <span aria-hidden className="rail-x hidden h-px flex-1 lg:block" />
                    <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden />
                  </>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
