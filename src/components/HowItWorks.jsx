import { motion } from 'framer-motion'
import { MessageCircle, Puzzle, CreditCard, Rocket } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { icon: MessageCircle, step: '01', title: t('how.s1Title'), desc: t('how.s1Desc') },
    { icon: Puzzle, step: '02', title: t('how.s2Title'), desc: t('how.s2Desc') },
    { icon: CreditCard, step: '03', title: t('how.s3Title'), desc: t('how.s3Desc') },
    { icon: Rocket, step: '04', title: t('how.s4Title'), desc: t('how.s4Desc') },
  ]

  return (
    <section id="how" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('how.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('how.title')}
              </h2>
              <p className="mt-4 text-muted">{t('how.desc')}</p>
            </motion.div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => {
                const Icon = s.icon
                return (
                  <motion.article
                    key={s.step}
                    variants={item}
                    className="feature-card glass relative rounded-2xl p-5"
                  >
                    <span className="absolute right-4 top-4 text-xs font-bold text-muted/40">
                      {s.step}
                    </span>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-purple/20 ring-1 ring-cyan/20">
                      <Icon size={20} className="text-cyan" />
                    </div>
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </motion.article>
                )
              })}
            </div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
