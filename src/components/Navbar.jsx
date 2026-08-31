import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#how', label: t('nav.launchPath') },
    { href: '#modules', label: t('nav.modules') },
    { href: '#care', label: t('nav.customEdge') },
    { href: '#contact', label: t('nav.inquire') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-18 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/25 via-purple/30 to-warm/25 ring-1 ring-cyan/30">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 13L8 2L14 13H2Z" stroke="#00F0FF" strokeWidth="1.5" />
              <path d="M5 13L8 7L11 13" stroke="#8B5CFF" strokeWidth="1.5" />
            </svg>
          </span>
          <span
            className="text-[1.05rem] font-bold tracking-tight text-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            stack<span className="gradient-text">pluse</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#contact"
            className="glow-btn rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-5 py-2 text-sm font-semibold text-bg"
          >
            {t('nav.startInquiry')}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-text"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-cyan via-purple to-warm px-5 py-3 text-center text-sm font-semibold text-bg"
              >
                {t('nav.startInquiry')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
