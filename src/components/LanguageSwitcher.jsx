import { useEffect, useRef, useState } from 'react'
import { Languages, Check } from 'lucide-react'
import { languages } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ compact = false }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = languages.find((l) => l.code === lang) || languages[0]

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-cyan/40 hover:text-text ${
          compact ? 'px-2.5' : ''
        }`}
        aria-label={t('lang.label')}
        aria-expanded={open}
      >
        <Languages size={14} className="text-cyan" />
        <span>{current.short}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[10.5rem] overflow-hidden rounded-xl border border-border bg-bg-elevated/95 p-1 shadow-xl shadow-black/40 backdrop-blur-xl">
          <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {t('lang.label')}
          </p>
          {languages.map((l) => {
            const active = l.code === lang
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                  active
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-muted hover:bg-surface hover:text-text'
                }`}
              >
                <span className="font-medium">{l.label}</span>
                {active ? <Check size={14} /> : <span className="text-xs opacity-60">{l.short}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
