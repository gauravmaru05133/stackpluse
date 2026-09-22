import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'
import { WHATSAPP_URL } from './WhatsAppFloat'

const INQUIRY_EMAIL = 'gauravmaru2@gmail.com'

async function sendInquiry(form) {
  const websiteLine = form.website?.trim()
    ? `Website: ${form.website.trim()}`
    : 'Website: —'
  const message = `Personalized demo request\nBusiness: ${form.company}\nType: ${form.type}\n${websiteLine}`

  const response = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: form.company,
      email: form.email,
      mobile: form.mobile,
      company: form.company || '—',
      type: form.type,
      interest: 'demo',
      website: form.website || '—',
      message,
      _replyto: form.email,
      _subject: `stackpulse demo request — ${form.company}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  const data = await response.json().catch(() => ({}))
  const msg = String(data.message || '')
  const ok =
    response.ok &&
    (data.success === true ||
      data.success === 'true' ||
      msg.toLowerCase().includes('activation'))

  if (!ok) {
    throw new Error(msg || 'Request failed')
  }

  return { needsActivation: msg.toLowerCase().includes('activation') }
}

export default function Demo() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    company: '',
    type: 'travel',
    mobile: '',
    email: '',
    website: '',
  })
  const [sent, setSent] = useState(false)
  const [needsActivation, setNeedsActivation] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const types = [
    { id: 'travel', label: t('demo.typeTravel') },
    { id: 'taxi', label: t('demo.typeTaxi') },
    { id: 'local', label: t('demo.typeLocal') },
    { id: 'professional', label: t('demo.typePro') },
    { id: 'other', label: t('demo.typeOther') },
  ]

  const valid =
    form.company.trim().length > 1 &&
    form.email.includes('@') &&
    form.mobile.replace(/\D/g, '').length >= 10

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || sending) return

    setSending(true)
    setError('')

    try {
      const result = await sendInquiry(form)
      setNeedsActivation(Boolean(result.needsActivation))
      setSent(true)
    } catch {
      setError(t('demo.error'))
    } finally {
      setSending(false)
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/30'

  return (
    <section id="demo" className="relative scroll-mt-20 py-20 md:py-28">
      <div id="contact" className="absolute -top-20" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="aurora opacity-30" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
            <motion.div variants={item}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
                {t('demo.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('demo.title')}
              </h2>
              <p className="mt-3 text-lg font-medium text-text/90">{t('demo.support')}</p>
              <p className="mt-4 text-muted">{t('demo.desc')}</p>

              <p className="mt-8 text-sm font-semibold text-text">{t('demo.sideTitle')}</p>
              <ul className="mt-3 space-y-3 text-sm text-muted">
                {[t('demo.li1'), t('demo.li2'), t('demo.li3'), t('demo.li4')].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm font-semibold text-cyan hover:opacity-80"
              >
                {t('demo.whatsappCta')}
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan/15 ring-1 ring-cyan/40">
                      <Check className="text-cyan" size={28} />
                    </div>
                    <h3
                      className="text-xl font-bold text-text"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t('demo.thanksTitle')}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      {needsActivation ? t('demo.activateDesc') : t('demo.thanksDesc')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative space-y-4"
                  >
                    <div>
                      <label htmlFor="demo-company" className="mb-1.5 block text-xs font-medium text-muted">
                        {t('demo.businessName')}
                      </label>
                      <input
                        id="demo-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={fieldClass}
                        required
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="demo-type" className="mb-1.5 block text-xs font-medium text-muted">
                        {t('demo.businessType')}
                      </label>
                      <select
                        id="demo-type"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className={fieldClass}
                      >
                        {types.map((tp) => (
                          <option key={tp.id} value={tp.id}>
                            {tp.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="demo-mobile" className="mb-1.5 block text-xs font-medium text-muted">
                        {t('demo.whatsapp')}
                      </label>
                      <input
                        id="demo-mobile"
                        type="tel"
                        inputMode="tel"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className={fieldClass}
                        required
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label htmlFor="demo-email" className="mb-1.5 block text-xs font-medium text-muted">
                        {t('demo.email')}
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={fieldClass}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label htmlFor="demo-website" className="mb-1.5 block text-xs font-medium text-muted">
                        {t('demo.website')}
                      </label>
                      <input
                        id="demo-website"
                        type="url"
                        placeholder="https://"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className={fieldClass}
                        autoComplete="url"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!valid || sending}
                      className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan via-purple to-warm px-5 py-3.5 text-sm font-bold text-bg disabled:opacity-40"
                    >
                      {sending ? t('demo.sending') : t('demo.submit')}
                      <ArrowRight size={16} />
                    </button>
                    {error ? (
                      <p className="text-center text-[11px] text-red-400">{error}</p>
                    ) : null}
                    <p className="text-center text-[11px] text-muted">{t('demo.footnote')}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </SectionReveal>
    </section>
  )
}
