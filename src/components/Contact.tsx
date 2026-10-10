import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import entLockup from '../assets/images/branding/enginuvity-logo.webp'
import { contact, socials } from '../data/site'
import { streamlineBundle } from '../lib/flow'
import { Reveal } from './ui/Reveal'
import { Tracer } from './ui/Tracer'

/** Final call to action on a dark workstation panel with the flow motif behind it. */
export function Contact() {
  const lines = useMemo(
    () =>
      streamlineBundle({
        nodesX: [200, 600, 1000],
        centerY: 300,
        count: 9,
        throat: 6,
        spread: [26, 30],
        drift: [-40, 40],
        startX: -20,
        endX: 1220,
        openSpread: 30,
      }),
    [],
  )

  return (
    <section
      id="contact"
      data-theme="dark"
      aria-labelledby="contact-title"
      className="workstation relative isolate overflow-hidden bg-bg py-[clamp(6rem,4rem+6vw,11rem)] text-fg"
    >
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 h-full w-full opacity-60" aria-hidden>
        {lines.map((d, i) => (
          <path key={i} d={d} fill="none" style={{ stroke: 'var(--diagram-line)' }} strokeWidth={1} />
        ))}
        {lines.map((d, i) =>
          i % 2 ? (
            <Tracer key={`t${i}`} d={d} duration={2.4 + (i % 3) * 0.4} delay={-i * 0.5} stroke={i === 4 ? 'var(--warm-line)' : 'var(--diagram-flow)'} />
          ) : null,
        )}
      </svg>

      <div className="container-wide text-center">
        <Reveal>
          <h2 id="contact-title" className="mx-auto max-w-[16ch] text-display font-semibold uppercase">
            Engineering at the speed of thought.
          </h2>
          <p className="mt-6 text-h2 font-semibold text-accent">Think. Tell. Build.</p>
          <p className="mt-8 text-lead text-fg-2">
            <span className="font-semibold text-fg">Pravaah AI</span> — Your AI Engineering Agent for CAD &amp; CAE.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={contact.demoHref} className="btn btn-primary">
              Start Engineering
              <ArrowRight className="btn-arrow size-4" strokeWidth={1.8} aria-hidden />
            </a>
            <a href={contact.enquiryHref} className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-[clamp(4rem,2rem+4vw,7rem)]" delay={0.1}>
          <img src={entLockup} alt="Enginuvity Nexus Technologies" width={560} height={367} loading="lazy" className="mx-auto h-auto w-[clamp(9rem,6rem+6vw,13rem)]" />
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-body-sm text-fg-2">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-fg">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="hover:text-fg">
                {contact.phoneDisplay}
              </a>
            </li>
            {[{ label: contact.websiteDisplay, href: contact.website }, ...socials].map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-fg">
                  {s.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
