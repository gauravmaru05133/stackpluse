import Logo from './Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from './WhatsAppFloat'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative border-t border-border pt-16 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
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

        <div className="flex flex-wrap gap-8 text-sm">
          <a href="#how" className="text-muted transition hover:text-text">
            {t('footer.launchPath')}
          </a>
          <a href="#care" className="text-muted transition hover:text-text">
            {t('footer.customEdge')}
          </a>
          <a href="#contact" className="text-muted transition hover:text-text">
            {t('footer.inquire')}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} stackpulse — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
