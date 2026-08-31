import { motion } from 'framer-motion'
import {
  CalendarDays,
  CreditCard,
  ShoppingBag,
  FileText,
  Users,
  Search,
  MessageSquare,
  BarChart3,
  ArrowRight,
  Puzzle,
} from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function Modules() {
  const { t } = useLanguage()

  const modules = [
    { icon: CalendarDays, title: t('modules.m1Title'), desc: t('modules.m1Desc') },
    { icon: CreditCard, title: t('modules.m2Title'), desc: t('modules.m2Desc') },
    { icon: ShoppingBag, title: t('modules.m3Title'), desc: t('modules.m3Desc') },
    { icon: FileText, title: t('modules.m4Title'), desc: t('modules.m4Desc') },
    { icon: Users, title: t('modules.m5Title'), desc: t('modules.m5Desc') },
    { icon: Search, title: t('modules.m6Title'), desc: t('modules.m6Desc') },
    { icon: MessageSquare, title: t('modules.m7Title'), desc: t('modules.m7Desc') },
    { icon: BarChart3, title: t('modules.m8Title'), desc: t('modules.m8Desc') },
  ]

  return (
    <section id="modules" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[70%] -translate-x-1/2 rounded-full bg-purple/15 blur-[120px]" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('modules.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('modules.title')}
              </h2>
              <p className="mt-4 text-muted">{t('modules.desc')}</p>
            </motion.div>

            <motion.div
              variants={item}
              className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-cyan/25 bg-cyan/5 px-4 py-3 text-left text-sm text-muted"
            >
              <Puzzle className="mt-0.5 shrink-0 text-cyan" size={18} />
              <p>
                <span className="font-semibold text-text">{t('modules.howLabel')}</span>{' '}
                {t('modules.howText')}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <motion.article
                    key={m.title}
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
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.desc}</p>
                  </motion.article>
                )
              })}
            </div>

            <motion.div
              variants={item}
              className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl p-[1px]"
            >
              <div className="shimmer-border absolute inset-0 rounded-3xl opacity-80" />
              <div className="relative glass-strong flex flex-col items-center gap-4 rounded-[1.4rem] px-6 py-8 text-center sm:flex-row sm:text-left md:px-8">
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold text-text"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t('modules.ctaTitle')}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{t('modules.ctaDesc')}</p>
                </div>
                <a
                  href="#contact"
                  className="glow-btn inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-6 py-3.5 text-sm font-bold text-bg"
                >
                  {t('modules.ctaBtn')}
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
