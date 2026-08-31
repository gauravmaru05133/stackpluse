import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative border-t border-border pt-16 pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/25 via-purple/30 to-warm/25 ring-1 ring-cyan/30">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 13L8 2L14 13H2Z" stroke="#00F0FF" strokeWidth="1.5" />
                <path d="M5 13L8 7L11 13" stroke="#8B5CFF" strokeWidth="1.5" />
              </svg>
            </span>
            <span
              className="text-lg font-bold text-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              stack<span className="gradient-text">pluse</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted">{t('footer.blurb')}</p>
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
          <a
            href="mailto:hello@stackpluse.com"
            className="inline-flex items-center gap-1 font-medium text-cyan transition hover:opacity-80"
          >
            hello@stackpluse.com
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} stackpluse — {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
