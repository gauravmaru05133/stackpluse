import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import SectionReveal from './SectionReveal'
import AnimatedCounter from './AnimatedCounter'
import { useLanguage } from '../i18n/LanguageContext'

const LIVE_PREVIEW = {
  url: 'https://gaurav-travel.challo.co/',
  host: 'gaurav-travel.challo.co',
  brand: 'Gaurav Travel',
}

export default function Proof() {
  const { t } = useLanguage()

  const stats = [
    { value: 1, suffix: ' day', label: t('proof.s1') },
    { value: 100, suffix: '%', label: t('proof.s2') },
    { value: 50, suffix: '+', label: t('proof.s3') },
    { value: 24, suffix: '/7', label: t('proof.s4') },
  ]

  const testimonials = [
    {
      quote: t('proof.t1Quote'),
      name: t('proof.t1Name'),
      role: t('proof.t1Role'),
      preview: true,
    },
    {
      quote: t('proof.t2Quote'),
      name: t('proof.t2Name'),
      role: t('proof.t2Role'),
    },
    {
      quote: t('proof.t3Quote'),
      name: t('proof.t3Name'),
      role: t('proof.t3Role'),
    },
  ]

  return (
    <section id="proof" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <SectionReveal className="mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('proof.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('proof.title')}
              </h2>
              <p className="mt-4 text-muted">{t('proof.desc')}</p>
            </motion.div>

            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="glass rounded-2xl px-4 py-6 text-center"
                >
                  <div
                    className="text-3xl font-extrabold gradient-text md:text-4xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted md:text-sm">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Live site preview — Gaurav Travel */}
            <motion.div
              variants={item}
              className="mt-16 overflow-hidden rounded-3xl border border-border bg-bg-elevated/60 shadow-2xl shadow-black/40"
            >
              <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                    {t('proof.liveEyebrow')}
                  </p>
                  <h3
                    className="mt-1 text-lg font-bold text-text md:text-xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t('proof.liveTitle')}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{t('proof.liveDesc')}</p>
                </div>
                <a
                  href={LIVE_PREVIEW.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition hover:bg-cyan/20"
                >
                  {t('proof.liveCta')}
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid lg:grid-cols-[1.35fr_0.85fr]">
                <div className="relative min-h-[280px] bg-[#0a101c] p-3 sm:min-h-[360px] sm:p-4 md:min-h-[420px]">
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-border bg-bg/80 px-3 py-2">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </span>
                    <div className="ml-2 flex-1 truncate rounded-md border border-border bg-surface px-3 py-1 text-[11px] text-muted">
                      {LIVE_PREVIEW.host}
                    </div>
                    <a
                      href={LIVE_PREVIEW.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition hover:text-cyan"
                      aria-label="Open live preview"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                  <div className="relative h-[220px] overflow-hidden rounded-xl border border-border bg-bg sm:h-[300px] md:h-[340px]">
                    <img
                      src="/previews/gaurav-travel.png"
                      alt="Gaurav Travel website preview"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                    <iframe
                      title={`${LIVE_PREVIEW.brand} live preview`}
                      src={LIVE_PREVIEW.url}
                      className="absolute inset-0 z-[1] h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-transparent"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <a
                      href={LIVE_PREVIEW.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Visit ${LIVE_PREVIEW.brand}`}
                    />
                  </div>
                </div>

                <blockquote className="flex flex-col justify-center border-t border-border p-6 lg:border-l lg:border-t-0 lg:p-8">
                  <p className="text-base leading-relaxed text-text/95 md:text-lg">
                    &ldquo;{t('proof.t1Quote')}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p
                      className="text-sm font-semibold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t('proof.t1Name')}
                    </p>
                    <p className="text-xs text-muted">{t('proof.t1Role')}</p>
                    <a
                      href={LIVE_PREVIEW.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan hover:opacity-80"
                    >
                      {LIVE_PREVIEW.url.replace('https://', '')}
                      <ExternalLink size={12} />
                    </a>
                  </footer>
                </blockquote>
              </div>
            </motion.div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {testimonials
                .filter((tm) => !tm.preview)
                .map((tm) => (
                  <motion.blockquote
                    key={tm.name}
                    variants={item}
                    className="glass rounded-2xl p-6"
                  >
                    <p className="text-sm leading-relaxed text-text/90">
                      &ldquo;{tm.quote}&rdquo;
                    </p>
                    <footer className="mt-5">
                      <p
                        className="text-sm font-semibold text-text"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {tm.name}
                      </p>
                      <p className="text-xs text-muted">{tm.role}</p>
                    </footer>
                  </motion.blockquote>
                ))}
            </div>

            <motion.div variants={item} className="mt-14 text-center">
              <a
                href="#contact"
                className="glow-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-8 py-3.5 text-sm font-bold text-bg"
              >
                {t('proof.cta')}
              </a>
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
