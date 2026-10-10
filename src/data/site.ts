/**
 * Site-wide facts: product naming, navigation and verified company contacts.
 * Contact details and social URLs are taken from enginuvitynexus.com —
 * do not add details that the company has not published.
 */

export const product = {
  name: 'Pravaah AI',
  descriptor: 'AI engineering agent for CAD & CAE',
  company: 'Enginuvity Nexus Technologies',
  companyShort: 'ENT',
} as const

export const navLinks = [
  { id: 'cad-cae', label: 'CAD + CAE' },
  { id: 'demo', label: 'Demo' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'domains', label: 'Domains' },
] as const

const email = 'info@enginuvitynexus.com'

export const contact = {
  email,
  phoneDisplay: '+91 80759 98325',
  phoneHref: 'tel:+918075998325',
  website: 'https://enginuvitynexus.com',
  websiteDisplay: 'enginuvitynexus.com',
  demoHref: `mailto:${email}?subject=${encodeURIComponent('Try Pravaah AI — demo request')}&body=${encodeURIComponent(
    'Hello ENT team,\n\nI would like to request a demonstration of Pravaah AI.\n\nName:\nOrganisation:\nEngineering domain / software used:\n\nThank you.',
  )}`,
  enquiryHref: `mailto:${email}?subject=${encodeURIComponent('Pravaah AI — enquiry')}`,
} as const

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/enginuvity-nexus-technologies/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61563715481704' },
  { label: 'Instagram', handle: '@enginuvitynexus', href: 'https://www.instagram.com/enginuvitynexus/' },
] as const
