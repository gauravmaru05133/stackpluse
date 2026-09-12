import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

const LIVE_EXAMPLES = [
  {
    url: 'https://gaurav-travel.challo.co/',
    image: '/previews/gaurav-travel.png',
  },
  {
    url: 'https://rudratravels.challo.co/',
    image: '/previews/rudra-travels.png',
  },
]

export default function Examples() {
  const { t } = useLanguage()

  const cards = [
    {
      name: t('examples.e1Name'),
      category: t('examples.e1Category'),
      live: true,
      image: LIVE_EXAMPLES[0].image,
      href: LIVE_EXAMPLES[0].url,
    },
    {
      name: t('examples.e2Name'),
      category: t('examples.e2Category'),
      live: true,
      image: LIVE_EXAMPLES[1].image,
      href: LIVE_EXAMPLES[1].url,
    },
    {
      name: t('examples.e3Name'),
      category: t('examples.e3Category'),
      sample: true,
      gradient: 'from-cyan/20 to-purple/30',
    },
    {
      name: t('examples.e4Name'),
      category: t('examples.e4Category'),
      sample: true,
      gradient: 'from-warm/20 to-purple/25',
    },
    {
      name: t('examples.e5Name'),
      category: t('examples.e5Category'),
      sample: true,
      gradient: 'from-purple/25 to-cyan/15',
    },
    {
      name: t('examples.e6Name'),
      category: t('examples.e6Category'),
      sample: true,
      gradient: 'from-cyan/15 to-warm/20',
    },
  ]

  return (
    <section id="examples" className="relative py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('examples.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('examples.title')}
              </h2>
              <p className="mt-4 text-muted">{t('examples.desc')}</p>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <motion.article
                  key={c.name}
                  variants={item}
                  className="glass group flex flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-elevated">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={`${c.name} website preview`}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-end bg-gradient-to-br ${c.gradient} p-4`}
                      >
                        <span
                          className="text-2xl font-bold text-text/80"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {c.name.split(' ')[0]}
                        </span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full border border-border bg-bg/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted backdrop-blur">
                      {c.live ? t('examples.liveBadge') : t('examples.sampleBadge')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3
                      className="text-lg font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{c.category}</p>
                    {c.live ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:opacity-80"
                      >
                        {t('cta.viewDemo')}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <a
                        href="#demo"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:opacity-80"
                      >
                        {t('cta.viewDemo')}
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
