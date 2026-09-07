import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import CtaButtons from './CtaButtons'
import { useLanguage } from '../i18n/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { num: '01', title: t('how.s1Title'), desc: t('how.s1Desc') },
    { num: '02', title: t('how.s2Title'), desc: t('how.s2Desc') },
    { num: '03', title: t('how.s3Title'), desc: t('how.s3Desc') },
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
            </motion.div>

            <div className="relative mt-14">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-cyan/0 via-cyan/40 to-cyan/0 md:block" />

              <div className="grid gap-6 md:grid-cols-3">
                {steps.map((s, i) => (
                  <motion.article
                    key={s.num}
                    variants={item}
                    className="glass relative rounded-2xl p-6 text-center md:text-left"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan/25 to-purple/30 text-sm font-bold text-cyan ring-1 ring-cyan/30 md:mx-0">
                      {s.num}
                    </div>
                    {i < steps.length - 1 ? (
                      <span className="absolute right-3 top-8 hidden text-cyan/40 md:block" aria-hidden>
                        →
                      </span>
                    ) : null}
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div variants={item} className="mt-12 flex justify-center">
              <CtaButtons showSecondary={false} />
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
