import { motion } from 'framer-motion'
import { Plane, Car, Wrench, Briefcase, TrendingUp } from 'lucide-react'
import SectionReveal from './SectionReveal'
import CtaButtons from './CtaButtons'
import { useLanguage } from '../i18n/LanguageContext'

export default function Industries() {
  const { t } = useLanguage()

  const items = [
    { icon: Plane, title: t('industries.i1Title'), desc: t('industries.i1Desc') },
    { icon: Car, title: t('industries.i2Title'), desc: t('industries.i2Desc') },
    { icon: Wrench, title: t('industries.i3Title'), desc: t('industries.i3Desc') },
    { icon: Briefcase, title: t('industries.i4Title'), desc: t('industries.i4Desc') },
    { icon: TrendingUp, title: t('industries.i5Title'), desc: t('industries.i5Desc') },
  ]

  return (
    <section id="solutions" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('industries.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('industries.title')}
              </h2>
              <p className="mt-4 text-muted">{t('industries.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => {
                const Icon = it.icon
                return (
                  <motion.article
                    key={it.title}
                    variants={item}
                    className="glass rounded-2xl p-6"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 ring-1 ring-cyan/25">
                      <Icon size={18} className="text-cyan" />
                    </div>
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {it.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{it.desc}</p>
                  </motion.article>
                )
              })}
            </div>

            <motion.div variants={item} className="mt-12 flex justify-center">
              <CtaButtons
                primaryHref="#features"
                primaryLabel={t('cta.explore')}
                showSecondary={false}
              />
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
