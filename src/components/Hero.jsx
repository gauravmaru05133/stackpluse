import { motion } from 'framer-motion'
import { Zap, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const floatingCards = [
    {
      title: t('hero.float1Title'),
      meta: t('hero.float1Meta'),
      className: 'left-[5%] top-[20%] hidden lg:block animate-float',
      glow: true,
    },
    {
      title: t('hero.float2Title'),
      meta: t('hero.float2Meta'),
      className: 'right-[4%] top-[16%] hidden lg:block animate-float-delayed',
    },
    {
      title: t('hero.float3Title'),
      meta: t('hero.float3Meta'),
      className: 'bottom-[16%] left-[8%] hidden md:block animate-float-delayed',
    },
    {
      title: t('hero.float4Title'),
      meta: t('hero.float4Meta'),
      className: 'bottom-[20%] right-[7%] hidden md:block animate-float',
      glow: true,
    },
  ]

  const highlights = [
    { icon: Sparkles, label: t('hero.pill1') },
    { icon: Target, label: t('hero.pill2') },
    { icon: Rocket, label: t('hero.pill3') },
  ]

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="aurora opacity-80" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[80%] -translate-x-1/2 bg-gradient-to-t from-bg/90 to-transparent" />

      {floatingCards.map((card) => (
        <div key={card.title} className={`absolute z-0 ${card.className}`}>
          <div
            className={`glass rounded-2xl px-4 py-3 shadow-lg shadow-black/30 ${
              card.glow ? 'ring-1 ring-cyan/40 glow-cyan' : ''
            }`}
          >
            <p
              className="text-sm font-semibold text-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {card.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">{card.meta}</p>
          </div>
        </div>
      ))}

      <SectionReveal
        immediate
        className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center md:px-8"
      >
        {(item) => (
          <>
           
            <motion.div variants={item} className="mb-6 flex justify-center">
              <span className="friendly-pill">
                <Zap size={13} className="text-warm" />
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-[4.2rem]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('hero.titleBefore')}{' '}
              <span className="gradient-text">{t('hero.titleAccent')}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-5 max-w-2xl text-base text-muted md:text-lg"
            >
              {t('hero.descBefore')}{' '}
              <span className="font-semibold text-text">{t('hero.whiteLabel')}</span>
              {t('hero.descMid')}{' '}
              <span className="font-semibold text-cyan">{t('hero.hassleFree')}</span>
              {t('hero.descAnd')}{' '}
              <span className="font-semibold gradient-text">{t('hero.goLive')}</span>
              {t('hero.descEnd')}
            </motion.p>

            <motion.div
              variants={item}
              className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {highlights.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                >
                  <Icon size={13} className="text-cyan" />
                  {label}
                </span>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="glow-btn group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-8 py-3.5 text-sm font-bold text-bg"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-6 py-3.5 text-sm font-semibold text-text backdrop-blur transition hover:border-cyan/40"
              >
                {t('hero.ctaSecondary')}
              </a>
            </motion.div>

            <motion.p variants={item} className="mt-5 text-xs text-muted/85">
              {t('hero.footnote')}
            </motion.p>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
