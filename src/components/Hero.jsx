import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionReveal from './SectionReveal'
import CtaButtons from './CtaButtons'
import { useLanguage } from '../i18n/LanguageContext'

const LIVE_URL = 'https://gaurav-travel.challo.co/'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="aurora opacity-40" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8" immediate>
        {(item) => (
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <motion.span
                variants={item}
                className="friendly-pill mb-5 inline-flex"
              >
                {t('hero.badge')}
              </motion.span>

              <motion.h1
                variants={item}
                className="text-4xl font-extrabold leading-[1.12] tracking-tight text-text sm:text-5xl md:text-[3.25rem]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('hero.title')}{' '}
                <span className="gradient-text">{t('hero.titleAccent')}</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-5 max-w-xl text-base text-muted md:text-lg"
              >
                {t('hero.desc')}
              </motion.p>

              <motion.div variants={item} className="mt-8">
                <CtaButtons size="lg" />
              </motion.div>

              <motion.p
                variants={item}
                className="mt-5 text-sm text-muted/90"
              >
                {t('hero.trust')}
              </motion.p>
            </div>

            <motion.div variants={item} className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="glass-strong relative overflow-hidden rounded-2xl p-3 shadow-2xl shadow-black/40 md:p-4">
                <div className="mb-3 flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="truncate text-[11px] text-muted">
                    {t('hero.visualLabel')} · {t('hero.visualBrand')}
                  </span>
                  <a
                    href={LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan hover:opacity-80"
                  >
                    Live <ExternalLink size={12} />
                  </a>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-border bg-bg">
                  <img
                    src="/previews/gaurav-travel.png"
                    alt="Gaurav Travel website preview"
                    className="aspect-[16/10] w-full object-cover object-top"
                    loading="eager"
                    width={800}
                    height={500}
                  />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[t('hero.mockDash'), t('hero.mockEnquiries'), t('hero.mockBookings')].map(
                    (label) => (
                      <div
                        key={label}
                        className="rounded-lg border border-border bg-bg/50 px-2 py-2 text-center"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted md:text-[11px]">
                          {label}
                        </p>
                        <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-gradient-to-r from-cyan/60 to-purple/60" />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-2 hidden w-36 overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-xl sm:block md:-right-4 md:w-40">
                <div className="border-b border-border px-2 py-1.5 text-center text-[10px] text-muted">
                  Mobile
                </div>
                <img
                  src="/previews/gaurav-travel.png"
                  alt=""
                  aria-hidden
                  className="aspect-[9/14] w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        )}
      </SectionReveal>
    </section>
  )
}
