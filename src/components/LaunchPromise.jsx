import { motion } from 'framer-motion'
import { Rocket, Tags, Wallet, Flame } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function LaunchPromise() {
  const { t } = useLanguage()

  const pillars = [
    {
      icon: Tags,
      title: t('launch.p1Title'),
      desc: t('launch.p1Desc'),
      tag: t('launch.p1Tag'),
    },
    {
      icon: Flame,
      title: t('launch.p2Title'),
      desc: t('launch.p2Desc'),
      tag: t('launch.p2Tag'),
    },
    {
      icon: Wallet,
      title: t('launch.p3Title'),
      desc: t('launch.p3Desc'),
      tag: t('launch.p3Tag'),
    },
    {
      icon: Rocket,
      title: t('launch.p4Title'),
      desc: t('launch.p4Desc'),
      tag: t('launch.p4Tag'),
      highlight: true,
    },
  ]

  return (
    <section id="launch" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="aurora opacity-60" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('launch.eyebrow')}
              </p>
              <h2
                className="text-3xl font-extrabold leading-tight tracking-tight text-text md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('launch.titleBefore')}{' '}
                <span className="gradient-text">{t('launch.titleAccent')}</span>
              </h2>
              <p className="mt-5 text-base text-muted md:text-lg">{t('launch.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <motion.article
                    key={p.title}
                    variants={item}
                    className={`feature-card glass group relative overflow-hidden rounded-2xl p-6 ${
                      p.highlight ? 'ring-1 ring-cyan/35' : ''
                    }`}
                  >
                    {p.highlight && (
                      <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-cyan to-warm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-bg">
                        {t('launch.edge')}
                      </span>
                    )}
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-purple/25 ring-1 ring-cyan/25 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-cyan" />
                    </div>
                    <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-wider text-warm">
                      {p.tag}
                    </span>
                    <h3
                      className="text-lg font-bold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
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
