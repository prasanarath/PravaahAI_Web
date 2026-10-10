import { ArrowUpRight } from 'lucide-react'
import { contact } from '../data/site'
import { EntLogo, PravaahMark, Wordmark } from './ui/Logo'

const year = new Date().getFullYear()

const footerLinks = [
  { href: '#cad-cae', label: 'CAD + CAE' },
  { href: '#demo', label: 'Demo' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#domains', label: 'Domains' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt">
      <div className="container-wide py-[clamp(3rem,2rem+2vw,4.5rem)]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Pravaah AI — back to top">
              <PravaahMark height={28} />
              <Wordmark className="text-lg" />
            </a>
            <p className="mt-4 text-body-sm text-fg-2">
              The AI engineering agent for Engineers. By ENT Enginuvity Nexus Technologies.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-body-sm sm:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-fg-2 transition-colors hover:text-fg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <p className="label text-muted">Parent company</p>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener"
                className="group mt-3 flex items-center gap-3 text-body-sm text-fg-2 hover:text-fg"
              >
                <EntLogo height={20} />
                <span className="inline-flex items-center gap-1">
                  {contact.websiteDisplay}
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-caption text-muted lg:flex-row lg:justify-between lg:gap-10">
          <p>© {year} Enginuvity Nexus Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
