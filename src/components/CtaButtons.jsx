import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function CtaButtons({
  primaryHref = '#demo',
  secondaryHref = '#how',
  primaryLabel,
  secondaryLabel,
  showSecondary = true,
  className = '',
  primaryClassName = '',
  secondaryClassName = '',
  size = 'md',
}) {
  const { t } = useLanguage()
  const pad = size === 'lg' ? 'px-6 py-3.5 text-base' : 'px-5 py-3 text-sm'

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={primaryHref}
        className={`glow-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm font-semibold text-bg ${pad} ${primaryClassName}`}
      >
        {primaryLabel || t('cta.primary')}
        <ArrowRight size={16} />
      </a>
      {showSecondary ? (
        <a
          href={secondaryHref}
          className={`inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 font-semibold text-text transition hover:bg-surface-hover ${pad} ${secondaryClassName}`}
        >
          {secondaryLabel || t('cta.secondary')}
        </a>
      ) : null}
    </div>
  )
}
