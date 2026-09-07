import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function Trust() {
  const { t } = useLanguage()

  const points = [
    t('trust.t1'),
    t('trust.t2'),
    t('trust.t3'),
    t('trust.t4'),
    t('trust.t5'),
    t('trust.t6'),
  ]

  return (
    <section id="trust" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('trust.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('trust.title')}
              </h2>
              <p className="mt-4 text-muted">{t('trust.desc')}</p>
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {points.map((p) => (
                <motion.span
                  key={p}
                  variants={item}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
