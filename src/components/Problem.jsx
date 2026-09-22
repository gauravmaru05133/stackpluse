import { motion } from 'framer-motion'
import { Globe, MessageSquareWarning, FileSpreadsheet, Layers } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()

  const pains = [
    { icon: Globe, title: t('problem.p1Title'), desc: t('problem.p1Desc') },
    { icon: MessageSquareWarning, title: t('problem.p2Title'), desc: t('problem.p2Desc') },
    { icon: FileSpreadsheet, title: t('problem.p3Title'), desc: t('problem.p3Desc') },
    { icon: Layers, title: t('problem.p4Title'), desc: t('problem.p4Desc') },
  ]

  return (
    <section id="problem" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('problem.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('problem.title')}
              </h2>
              <p className="mt-4 text-muted">{t('problem.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {pains.map((p) => {
                const Icon = p.icon
                return (
                  <motion.article
                    key={p.title}
                    variants={item}
                    className="glass rounded-2xl p-5 md:p-6"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-warm/10 ring-1 ring-warm/25">
                      <Icon size={18} className="text-warm" />
                    </div>
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  </motion.article>
                )
              })}
            </div>

            <motion.p
              variants={item}
              className="mt-10 text-center text-lg font-semibold text-text md:text-xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('problem.close')}
            </motion.p>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
