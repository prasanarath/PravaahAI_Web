import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, navLinks } from '../data/site'
import { PravaahMark, Wordmark } from './ui/Logo'

const navIds = navLinks.map((link) => link.id)

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])
  return active
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(navIds)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  // Closing the menu in the click handler cancels the browser's smooth scroll to the anchor,
  // so let the scroll run and close the menu once it settles (timer is a fallback for no `scrollend`).
  const closeAfterScroll = () => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.removeEventListener('scrollend', finish)
      setOpen(false)
    }
    window.addEventListener('scrollend', finish, { once: true })
    setTimeout(finish, 1500)
  }

  const solid = scrolled || open

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-line bg-bg/95 backdrop-blur-md supports-[backdrop-filter]:bg-bg/88'
          : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="sr-only-focusable btn btn-primary btn-sm absolute left-4 top-3 z-50">
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="container-wide flex h-[var(--nav-h)] items-center justify-between gap-6 transition-[height] duration-300"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Pravaah AI — back to top">
          <PravaahMark height={36} cssHeight="clamp(28px, 1.1rem + 0.9vw, 38px)" />
          <span className="flex flex-col leading-none">
            <Wordmark className="text-[clamp(1.05rem,0.9rem+0.4vw,1.35rem)]" />
            <span className="label mt-1.5 text-[clamp(0.6rem,0.55rem+0.12vw,0.6875rem)] tracking-[0.12em] text-muted">
              by ENT<span className="hidden xl:inline"> — Enginuvity Nexus Technologies</span>
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-md px-3 py-2.5 text-nav transition-colors xl:px-3.5 ${
                    isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 xl:inset-x-3.5 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2.5 xl:gap-3">
          <a href={contact.demoHref} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Try Pravaah
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-[18px]" strokeWidth={1.6} /> : <Menu className="size-[18px]" strokeWidth={1.6} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-bg lg:hidden"
          >
            <div className="container-wide pb-6 pt-2">
              <ul>
                {navLinks.map((link, i) => (
                  <li key={link.id} className="border-b border-line">
                    <a
                      href={`#${link.id}`}
                      onClick={closeAfterScroll}
                      className="flex items-center justify-between py-4 text-lg text-fg"
                    >
                      <span>{link.label}</span>
                      <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={contact.demoHref} className="btn btn-primary mt-6 w-full" onClick={() => setOpen(false)}>
                Try Pravaah
                <ArrowRight className="btn-arrow size-4" strokeWidth={1.8} />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent-line"
        style={{ scaleX: progress, opacity: scrolled ? 0.9 : 0 }}
      />
    </header>
  )
}
