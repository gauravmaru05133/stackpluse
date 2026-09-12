import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from './WhatsAppFloat'

export default function Footer() {
  const { t } = useLanguage()

  const nav = [
    { href: '#top', label: t('footer.home') },
    { href: '#features', label: t('footer.features') },
    { href: '#solutions', label: t('footer.solutionsLink') },
    { href: '#talk', label: t('footer.talk') },
    { href: '#faq', label: t('footer.faq') },
    { href: '#contact', label: t('footer.contact') },
  ]

  const solutions = [
    { href: '#solutions', label: t('footer.travel') },
    { href: '#solutions', label: t('footer.taxi') },
    { href: '#solutions', label: t('footer.local') },
    { href: '#solutions', label: t('footer.professional') },
  ]

  const company = [
    { href: '#top', label: t('footer.about') },
    { href: '#contact', label: t('footer.contact') },
    { href: '#faq', label: t('footer.privacy') },
    { href: '#faq', label: t('footer.terms') },
  ]

  return (
    <footer className="relative border-t border-border pt-16 pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="#top" className="inline-flex">
            <Logo size="md" />
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted">{t('footer.blurb')}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-cyan hover:opacity-80"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('footer.nav')}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted transition hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('footer.solutions')}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {solutions.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-muted transition hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {t('footer.company')}
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {company.map((l) => (
              <li key={`${l.href}-${l.label}`}>
                <a href={l.href} className="text-muted transition hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SEO keyword paragraph — visible text for search engines, visually subtle */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-border/50 px-5 pt-8 md:px-8">
        <p className="text-xs leading-relaxed text-muted/50">
          StackPulse is an online business platform for local businesses in India. Create a professional website for your taxi service, travel agency, salon, gym, plumber, electrician, home services business or any local service. Get discovered by nearby customers, manage enquiries, bookings, payments and grow your brand online — all from one simple platform.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-6xl px-5 md:px-8">
        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} StackPulse — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
