import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import AnimatedCounter from './AnimatedCounter'
import { useLanguage } from '../i18n/LanguageContext'

const logos = [
  'Nexus',
  'OrbitPay',
  'Helio',
  'Vaultly',
  'PulseAI',
  'Northbeam',
  'Kite',
  'Lumina',
]

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

            <motion.div variants={item} className="relative mt-16 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-24" />
              <div className="marquee-track gap-10 py-4 md:gap-16">
                {[...logos, ...logos].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex shrink-0 items-center gap-2 opacity-50 transition hover:opacity-100"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-[10px] font-bold text-cyan">
                      {name.slice(0, 2).toUpperCase()}
                    </span>
                    <span
                      className="text-lg font-semibold tracking-tight text-text/80"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {testimonials.map((tm) => (
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
