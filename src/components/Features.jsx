import { motion } from 'framer-motion'
import {
  Tags,
  Puzzle,
  Wallet,
  Rocket,
  HeartHandshake,
  Wand2,
  Smartphone,
  Shield,
  Users,
} from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function Features() {
  const { t } = useLanguage()

  const features = [
    { icon: Tags, title: t('features.f1Title'), desc: t('features.f1Desc'), highlight: true },
    { icon: HeartHandshake, title: t('features.f2Title'), desc: t('features.f2Desc'), highlight: true },
    { icon: Wand2, title: t('features.f3Title'), desc: t('features.f3Desc'), highlight: true },
    { icon: Puzzle, title: t('features.f4Title'), desc: t('features.f4Desc') },
    { icon: Wallet, title: t('features.f5Title'), desc: t('features.f5Desc') },
    { icon: Rocket, title: t('features.f6Title'), desc: t('features.f6Desc') },
    { icon: Users, title: t('features.f7Title'), desc: t('features.f7Desc') },
    { icon: Smartphone, title: t('features.f8Title'), desc: t('features.f8Desc') },
    { icon: Shield, title: t('features.f9Title'), desc: t('features.f9Desc') },
  ]

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('features.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('features.title')}
              </h2>
              <p className="mt-4 text-muted">{t('features.desc')}</p>
            </motion.div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <motion.article
                    key={f.title}
                    variants={item}
                    className={`feature-card glass group rounded-2xl p-6 ${
                      f.highlight ? 'ring-1 ring-cyan/30' : ''
                    }`}
                  >
                    {f.highlight && (
                      <span className="mb-3 inline-block rounded-full bg-gradient-to-r from-cyan/20 to-warm/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan">
                        {t('features.core')}
                      </span>
                    )}
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-purple/20 ring-1 ring-cyan/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-cyan" />
                    </div>
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
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
