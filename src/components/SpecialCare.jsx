import { motion } from 'framer-motion'
import { HeartHandshake, Sparkles, Wand2, ArrowRight } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function SpecialCare() {
  const { t } = useLanguage()

  return (
    <section id="care" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warm/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/10 blur-[130px]" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <div className="grid gap-5 lg:grid-cols-2">
            <motion.article
              variants={item}
              className="feature-card glass-strong relative overflow-hidden rounded-3xl p-7 md:p-9"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/25 to-purple/30 ring-1 ring-cyan/30">
                <HeartHandshake className="text-cyan" size={24} />
              </div>
              <span className="friendly-pill mb-3">{t('care.hasslePill')}</span>
              <h2
                className="mt-4 text-2xl font-bold text-text md:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('care.hassleTitle')}
              </h2>
              <p className="mt-3 text-muted">{t('care.hassleDesc')}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:opacity-80"
              >
                {t('care.hassleCta')}
                <ArrowRight size={14} />
              </a>
            </motion.article>

            <motion.article
              variants={item}
              className="feature-card relative overflow-hidden rounded-3xl p-[1px]"
            >
              <div className="shimmer-border absolute inset-0 rounded-3xl" />
              <div className="relative h-full rounded-[1.4rem] bg-gradient-to-br from-bg-elevated via-bg to-bg p-7 md:p-9">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-warm/30 to-purple/30 ring-1 ring-warm/40">
                  <Wand2 className="text-warm" size={24} />
                </div>
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple/40 bg-purple/15 px-3 py-1 text-xs font-semibold text-purple">
                  <Sparkles size={12} />
                  {t('care.customPill')}
                </span>
                <h2
                  className="mt-4 text-2xl font-bold text-text md:text-3xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t('care.customTitle')}
                </h2>
                <p className="mt-3 text-muted">{t('care.customDesc')}</p>
                <a
                  href="#contact"
                  className="glow-btn mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple to-warm px-5 py-3 text-sm font-bold text-bg"
                >
                  {t('care.customCta')}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          </div>
        )}
      </SectionReveal>
    </section>
  )
}
