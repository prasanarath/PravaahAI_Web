import { Check, MessageSquare } from 'lucide-react'
import { useRef } from 'react'
import { useTimeline } from '../lib/useTimeline'
import { PravaahMark } from './ui/Logo'
import { Reveal } from './ui/Reveal'

const ACTIONS = ['Geometry updated', 'Mesh regenerated', 'Solver configured', 'Simulation complete', 'Results compared']

export function NotChatbot() {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTimeline(ref, ACTIONS.length * 650 + 3000)
  const shown = Math.floor(t / 650)

  return (
    <section id="agent" aria-labelledby="agent-title" className="section-y">
      <div className="container-wide">
        <Reveal>
          <h2 id="agent-title" className="text-h2 font-semibold">
            <span className="block text-muted">This is not an AI chatbot.</span>
            <span className="block text-fg">
              Pravaah is an <span className="text-accent">engineering agent.</span>
            </span>
          </h2>
        </Reveal>

        <div ref={ref} className="mt-block grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Chatbot */}
          <Reveal>
            <div className="flex h-full flex-col rounded-xl border border-dashed border-line-strong p-6 sm:p-8">
              <p className="label inline-flex items-center gap-2 text-muted">
                <MessageSquare className="size-4" aria-hidden /> A chatbot
              </p>
              <p className="mt-6 max-w-[42ch] rounded-2xl rounded-tl-sm bg-bg-alt px-5 py-4 text-body-sm text-fg-2">
                To reduce drag, open your CAD tool and refine the nose. Then re-mesh the domain, set up the turbulence
                model and re-run the solver…
              </p>
              <p className="mt-auto pt-10 text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-semibold tracking-[-0.02em] text-muted">
                Tells you what to do.
              </p>
            </div>
          </Reveal>

          {/* Pravaah */}
          <Reveal delay={0.08}>
            <div data-theme="dark" className="workstation flex h-full flex-col rounded-xl border border-accent/60 bg-bg p-6 text-fg sm:p-8">
              <p className="label inline-flex items-center gap-2.5 text-accent">
                <PravaahMark height={20} /> Pravaah
              </p>
              <ul className="mt-6 space-y-2.5" aria-label="Actions taken by Pravaah">
                {ACTIONS.map((a, i) => (
                  <li
                    key={a}
                    className={`flex items-center gap-3 font-mono text-body-sm transition-all duration-500 ${
                      i < shown ? 'translate-x-0 text-fg opacity-100' : '-translate-x-1 opacity-25'
                    }`}
                  >
                    <span
                      className={`flex size-5 items-center justify-center rounded-full border transition-colors ${
                        i < shown ? 'border-ok bg-ok text-bg' : 'border-line-strong'
                      }`}
                    >
                      {i < shown && <Check className="size-3" strokeWidth={3} aria-hidden />}
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-10 text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-semibold tracking-[-0.02em]">
                Takes action.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
