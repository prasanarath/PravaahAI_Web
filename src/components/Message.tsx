import { Reveal } from './ui/Reveal'

const parts = ['Your expertise', 'AI reasoning', 'Engineering software']

export function Message() {
  return (
    <section id="why" aria-label="Why Pravaah" className="section-y">
      <div className="container-wide">
        <Reveal>
          <p className="text-h2 font-semibold text-muted">
            No more <span className="line-through decoration-2">“What do I click next?”</span>
          </p>
          <p className="mt-3 text-display font-semibold text-fg">
            Start asking <span className="text-accent">“What should we build next?”</span>
          </p>
        </Reveal>

        <Reveal className="mt-block" delay={0.08}>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[clamp(1.25rem,0.9rem+1vw,2rem)] font-semibold tracking-[-0.02em]">
            {parts.map((p, i) => (
              <span key={p} className="flex items-center gap-4">
                <span className="rounded-lg border border-line-strong bg-surface px-4 py-2 text-fg">{p}</span>
                <span className="text-muted" aria-hidden>
                  {i < parts.length - 1 ? '+' : '='}
                </span>
              </span>
            ))}
            <span className="rounded-lg bg-fg px-4 py-2 text-bg">A new way to engineer.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
