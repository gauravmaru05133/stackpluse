import { motion } from 'framer-motion'
import {
  Globe,
  Inbox,
  Users,
  CalendarDays,
  CreditCard,
  BarChart3,
} from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function FeatureDeepDive() {
  const { t } = useLanguage()

  const features = [
    { icon: Globe, title: t('deepDive.f1Title'), desc: t('deepDive.f1Desc'), tone: 'cyan' },
    { icon: Inbox, title: t('deepDive.f2Title'), desc: t('deepDive.f2Desc'), tone: 'purple' },
    { icon: Users, title: t('deepDive.f3Title'), desc: t('deepDive.f3Desc'), tone: 'warm' },
    { icon: CalendarDays, title: t('deepDive.f4Title'), desc: t('deepDive.f4Desc'), tone: 'cyan' },
    { icon: CreditCard, title: t('deepDive.f5Title'), desc: t('deepDive.f5Desc'), tone: 'purple' },
    { icon: BarChart3, title: t('deepDive.f6Title'), desc: t('deepDive.f6Desc'), tone: 'warm' },
  ]

  const toneClass = {
    cyan: 'from-cyan/20 to-cyan/5 ring-cyan/25 text-cyan',
    purple: 'from-purple/20 to-purple/5 ring-purple/25 text-purple',
    warm: 'from-warm/20 to-warm/5 ring-warm/25 text-warm',
  }

  return (
    <section id="deep-dive" className="relative py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('deepDive.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('deepDive.title')}
              </h2>
            </motion.div>

            <div className="mt-14 space-y-10 md:space-y-16">
              {features.map((f, i) => {
                const Icon = f.icon
                const reverse = i % 2 === 1
                return (
                  <motion.article
                    key={f.title}
                    variants={item}
                    className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
                      reverse ? 'md:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <div
                      className={`flex min-h-[180px] items-center justify-center rounded-2xl border border-border bg-gradient-to-br p-8 ${toneClass[f.tone]}`}
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-bg/40 ring-1 ring-inherit">
                        <Icon size={36} className="text-inherit" />
                      </div>
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-bold text-text"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {f.title}
                      </h3>
                      <p className="mt-3 text-muted leading-relaxed">{f.desc}</p>
                    </div>
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
