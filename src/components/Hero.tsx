import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import demoPoster from '../assets/videos/pravaah-real-demo-poster.webp'
import { contact } from '../data/site'
import { LoopVideo } from './LoopVideo'

const PHASES = ['Design', 'Simulate', 'Analyse', 'Optimize'] as const
const demoVideo = `${import.meta.env.BASE_URL}videos/pravaah-real-demo.mp4`

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-var(--nav-h))] items-center py-[clamp(2.5rem,1rem+3vw,5rem)]"
    >
      <div className="container-wide max-w-[calc(120rem+2*var(--gutter))] grid grid-cols-1 items-center gap-x-[clamp(2.5rem,1rem+3vw,5.5rem)] gap-y-12 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div>
          <m.p
            className="label text-accent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Your engineering software just got an AI agent.
          </m.p>
          <m.h1
            id="hero-title"
            className="mt-5 text-display font-semibold text-fg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Meet Pravaah AI.
          </m.h1>
          <m.p
            className="mt-3 text-h2 font-semibold text-fg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease }}
          >
            The AI Agent for <span className="text-accent">Engineers</span>.
          </m.p>
          <m.p
            className="mt-6 max-w-[34ch] text-lead text-fg-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            You tell Pravaah what you want to achieve. <span className="text-fg">Pravaah figures out how to do it.</span>
          </m.p>

          <m.ol
            className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3"
            aria-label="Design, simulate, analyse, optimize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {PHASES.map((p, i) => (
              <li key={p} className="flex items-center gap-2 sm:gap-3">
                <span
                  className="rounded-md border border-accent bg-accent-soft px-3 py-1.5 text-h4 font-semibold text-accent"
                >
                  {p}
                </span>
                {i < PHASES.length - 1 && <ArrowRight className="size-4 text-muted" aria-hidden />}
              </li>
            ))}
          </m.ol>

          <m.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease }}
          >
            <a href={contact.demoHref} className="btn btn-primary">
              Try Pravaah
              <ArrowRight className="btn-arrow size-4" strokeWidth={1.8} aria-hidden />
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              See How It Works
            </a>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        >
          {/* The real product demonstration, shown as recorded (16:9, normal speed) */}
          <div
            data-theme="dark"
            className="workstation aspect-video overflow-hidden rounded-xl border border-line bg-bg shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]"
          >
            <LoopVideo src={demoVideo} poster={demoPoster} label="Pravaah AI product demonstration" />
          </div>
        </m.div>
      </div>
    </section>
  )
}
