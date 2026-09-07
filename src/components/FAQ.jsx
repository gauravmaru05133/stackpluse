import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(0)

  const items = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
  ]

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <SectionReveal className="mx-auto max-w-3xl px-5 md:px-8">
        {(item) => (
          <>
            <motion.div variants={item} className="text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('faq.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('faq.title')}
              </h2>
            </motion.div>

            <motion.div variants={item} className="mt-10 space-y-2">
              {items.map((it, i) => {
                const isOpen = open === i
                return (
                  <div key={it.q} className="glass overflow-hidden rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-sm font-semibold text-text md:text-base"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {it.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-muted transition ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                            {it.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </>
        )}
      </SectionReveal>
    </section>
  )
}
