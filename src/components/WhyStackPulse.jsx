import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhyStackPulse() {
  const { t } = useLanguage()

  const traditional = [
    t('why.t1'),
    t('why.t2'),
    t('why.t3'),
    t('why.t4'),
    t('why.t5'),
  ]

  const stackpulse = [
    t('why.s1'),
    t('why.s2'),
    t('why.s3'),
    t('why.s4'),
    t('why.s5'),
    t('why.s6'),
    t('why.s7'),
    t('why.s8'),
  ]

  return (
    <section id="why" className="relative py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('why.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('why.title')}
              </h2>
              <p className="mt-4 text-muted">{t('why.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <motion.div variants={item} className="glass rounded-2xl p-6 md:p-8">
                <h3
                  className="text-lg font-semibold text-muted"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t('why.traditional')}
                </h3>
                <ul className="mt-5 space-y-3">
                  {traditional.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warm/10 text-warm">
                        <X size={12} strokeWidth={3} />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={item}
                className="rounded-2xl border border-cyan/30 bg-cyan/5 p-6 md:p-8"
              >
                <h3
                  className="gradient-text text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {t('why.stackpulse')}
                </h3>
                <ul className="mt-5 space-y-3">
                  {stackpulse.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-text">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div variants={item} className="mx-auto mt-12 max-w-2xl text-center">
              <h3
                className="text-2xl font-bold text-text md:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('why.bottomTitle')}
              </h3>
              <p className="mt-3 text-muted">{t('why.bottomDesc')}</p>
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
