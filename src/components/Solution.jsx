import { motion } from 'framer-motion'
import {
  Globe,
  Inbox,
  Users,
  CalendarDays,
  CreditCard,
  LayoutTemplate,
  MessageSquare,
  BarChart3,
} from 'lucide-react'
import SectionReveal from './SectionReveal'
import CtaButtons from './CtaButtons'
import { useLanguage } from '../i18n/LanguageContext'

export default function Solution() {
  const { t } = useLanguage()

  const features = [
    { icon: Globe, title: t('solution.f1Title'), desc: t('solution.f1Desc') },
    { icon: Inbox, title: t('solution.f2Title'), desc: t('solution.f2Desc') },
    { icon: Users, title: t('solution.f3Title'), desc: t('solution.f3Desc') },
    { icon: CalendarDays, title: t('solution.f4Title'), desc: t('solution.f4Desc') },
    { icon: CreditCard, title: t('solution.f5Title'), desc: t('solution.f5Desc') },
    { icon: LayoutTemplate, title: t('solution.f6Title'), desc: t('solution.f6Desc') },
    { icon: MessageSquare, title: t('solution.f7Title'), desc: t('solution.f7Desc') },
    { icon: BarChart3, title: t('solution.f8Title'), desc: t('solution.f8Desc') },
  ]

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[70%] -translate-x-1/2 rounded-full bg-purple/10 blur-[120px]" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('solution.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('solution.title')}
              </h2>
              <p className="mt-4 text-muted">{t('solution.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <motion.article
                    key={f.title}
                    variants={item}
                    className="feature-card glass rounded-2xl p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-purple/25 ring-1 ring-cyan/25">
                      <Icon size={18} className="text-cyan" />
                    </div>
                    <h3
                      className="text-base font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
                  </motion.article>
                )
              })}
            </div>

            <motion.div variants={item} className="mt-12 flex justify-center">
              <CtaButtons
                primaryHref="#demo"
                primaryLabel={t('cta.build')}
                showSecondary={false}
              />
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
