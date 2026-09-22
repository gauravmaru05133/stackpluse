import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'
import { WHATSAPP_URL } from './WhatsAppFloat'

export default function FinalCTA() {
  const { t } = useLanguage()

  return (
    <section id="get-started" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-4xl px-5 md:px-8">
        {(item) => (
          <motion.div
            variants={item}
            className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12 md:py-16"
          >
            <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-purple/20 blur-3xl" />

            <h2
              className="relative text-3xl font-bold tracking-tight text-text md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('finalCta.title')}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">{t('finalCta.desc')}</p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#demo"
                className="glow-btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-6 py-3.5 text-base font-semibold text-bg"
              >
                {t('cta.primary')}
                <ArrowRight size={16} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3.5 text-base font-semibold text-text transition hover:bg-surface-hover"
              >
                {t('cta.talk')}
              </a>
            </div>

            <p className="relative mt-8 text-sm font-medium text-muted">
              {t('finalCta.bottom')}
            </p>
          </motion.div>
        )}
      </SectionReveal>
    </section>
  )
}
