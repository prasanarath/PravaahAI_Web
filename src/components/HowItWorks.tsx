import { BarChart3, ListChecks, MessageSquareText, Mic, Play, RefreshCw, ScanSearch, UserCheck } from 'lucide-react'
import { useRef } from 'react'
import { useTimeline } from '../lib/useTimeline'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

function TypeOrSpeakIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className ?? ''}`}>
      <MessageSquareText className="size-7" strokeWidth={strokeWidth} aria-hidden />
      <Mic className="absolute -bottom-0.5 -right-1 size-4 bg-bg" strokeWidth={strokeWidth} aria-hidden />
    </span>
  )
}

const steps = [
  { who: 'You', verb: 'Type or Speak', note: 'Give Pravaah your engineering task', Icon: TypeOrSpeakIcon },
  { who: 'Pravaah', verb: 'Understands', note: 'Understands your intent and engineering context', Icon: ScanSearch },
  { who: 'Pravaah', verb: 'Plans', note: 'Plans the required engineering workflow', Icon: ListChecks },
  { who: 'Pravaah', verb: 'Acts', note: 'Works with CAD and CAE tools', Icon: Play },
  { who: 'Pravaah', verb: 'Analyses', note: 'Reads simulation and engineering results', Icon: BarChart3 },
  { who: 'Pravaah', verb: 'Iterates', note: 'Refines the workflow based on results', Icon: RefreshCw },
  { who: 'You', verb: 'Decide', note: 'Review, approve, and continue', Icon: UserCheck },
]
const STEP_MS = 1100

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useTimeline(ref, steps.length * STEP_MS - 100)
  const active = Math.min(steps.length - 1, Math.floor(t / STEP_MS))

  return (
    <section ref={ref} id="how-it-works" aria-labelledby="how-title" className="section-y">
      <div className="container-wide">
        <SectionHeader index="03" label="How it works" titleId="how-title" title="You type or speak. Pravaah engineers. You decide." />

        <Reveal className="mt-block">
          <ol className="relative grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-0">
            {/* Flow line behind the steps (wide screens) */}
            <span aria-hidden className="rail-x absolute left-[7%] right-[7%] top-[2.75rem] hidden h-px lg:block" />
            {steps.map(({ who, verb, note, Icon }, i) => {
              const on = i === active
              const you = who === 'You'
              return (
                <li key={verb} className="relative flex items-center gap-4 lg:flex-col lg:px-2 lg:text-center">
                  <span
                    className={`relative z-10 flex size-[5.5rem] shrink-0 items-center justify-center rounded-full border-2 bg-bg transition-all duration-500 ${
                      on ? 'scale-110 border-accent shadow-[0_0_0_8px_var(--accent-soft)]' : you ? 'border-fg/70' : 'border-line-strong'
                    }`}
                  >
                    <Icon className={`size-8 transition-colors ${on ? 'text-accent' : you ? 'text-fg' : 'text-fg-2'}`} strokeWidth={1.5} aria-hidden />
                  </span>
                  <div className="lg:mt-5">
                    <p className={`label ${you ? 'text-fg' : 'text-accent'}`}>{who}</p>
                    <p className={`mt-1 text-h3 font-semibold transition-colors ${on ? 'text-fg' : 'text-fg-2'}`}>{verb}</p>
                    <p className="mt-1 text-body-sm text-muted">{note}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Iterate loop: Iterates → back to Acts */}
          <div aria-hidden className="relative mt-6 hidden h-10 lg:block">
            <span className="absolute bottom-0 left-[50%] right-[21.4%] top-0 rounded-b-2xl border-x-2 border-b-2 border-dashed border-accent/50" />
            <span className="label absolute bottom-0 left-[64.3%] -translate-x-1/2 translate-y-1/2 bg-bg px-3 text-accent">
              ↺ Iterate
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
