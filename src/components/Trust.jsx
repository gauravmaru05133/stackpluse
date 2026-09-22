import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

const TESTIMONIAL_META = [
  {
    href: 'https://rudratravels.challo.co/',
    stars: 5,
    initials: 'RT',
    quoteKey: 'trust.quote1',
    nameKey: 'trust.name1',
    roleKey: 'trust.role1',
  },
]

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

            <div className="mt-16 flex flex-wrap justify-center gap-6">
              {TESTIMONIAL_META.map((itemMeta) => (
                <motion.div
                  key={itemMeta.nameKey}
                  variants={item}
                  className="glass relative w-full max-w-xl rounded-2xl p-7"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: itemMeta.stars }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base leading-relaxed text-text">
                    "{t(itemMeta.quoteKey)}"
                  </blockquote>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/20 text-sm font-bold text-cyan">
                        {itemMeta.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{t(itemMeta.nameKey)}</p>
                        <p className="text-xs text-muted">{t(itemMeta.roleKey)}</p>
                      </div>
                    </div>
                    <a
                      href={itemMeta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan hover:opacity-80"
                    >
                      {t('trust.visitSite')} <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
