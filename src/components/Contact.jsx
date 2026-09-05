import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Building2, Rocket, User, Zap } from 'lucide-react'
import SectionReveal from './SectionReveal'
import { useLanguage } from '../i18n/LanguageContext'

const INQUIRY_EMAIL = 'gauravmaru2@gmail.com'

async function sendInquiry(form) {
  const response = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      company: form.company || '—',
      type: form.type,
      interest: form.interest,
      message: form.message,
      _replyto: form.email,
      _subject: `stackpluse inquiry from ${form.name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  const data = await response.json().catch(() => ({}))
  const message = String(data.message || '')
  const ok =
    response.ok &&
    (data.success === true ||
      data.success === 'true' ||
      message.toLowerCase().includes('activation'))

  if (!ok) {
    throw new Error(message || 'Request failed')
  }

  return { needsActivation: message.toLowerCase().includes('activation') }
}

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    type: 'startup',
    interest: 'launch',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [needsActivation, setNeedsActivation] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const types = [
    { id: 'business', label: t('contact.typeBusiness'), icon: Building2 },
    { id: 'startup', label: t('contact.typeStartup'), icon: Rocket },
    { id: 'founder', label: t('contact.typeFounder'), icon: User },
  ]

  const valid =
    form.name.trim() &&
    form.email.includes('@') &&
    form.mobile.replace(/\D/g, '').length >= 10 &&
    form.message.trim().length > 8

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
      setError(t('contact.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="aurora opacity-50" />

      <SectionReveal className="relative mx-auto max-w-6xl px-5 md:px-8">
        {(item) => (
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
            <motion.div variants={item}>
              <span className="friendly-pill mb-4">
                <Zap size={12} className="text-warm" />
                {t('contact.badge')}
              </span>
              <h2
                className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('contact.title')}
              </h2>
              <p className="mt-4 text-muted">{t('contact.desc')}</p>

              <ul className="mt-8 space-y-3 text-sm text-muted">
                {[
                  t('contact.li1'),
                  t('contact.li2'),
                  t('contact.li3'),
                  t('contact.li4'),
                  t('contact.li5'),
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <a
                href="mailto:hello@stackpluse.com"
                className="mt-8 inline-block text-sm font-semibold text-cyan hover:opacity-80"
              >
                {t('contact.emailCta')}
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warm/15 blur-3xl" />
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
                      {t('contact.thanksTitle')}
                      {form.name ? `, ${form.name}` : ''}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      {needsActivation
                        ? t('contact.activateDesc')
                        : t('contact.thanksDesc')}
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
                    <div className="flex flex-wrap gap-2">
                      {types.map((tp) => {
                        const Icon = tp.icon
                        const active = form.type === tp.id
                        return (
                          <button
                            key={tp.id}
                            type="button"
                            onClick={() => setForm({ ...form, type: tp.id })}
                            className={`flex min-w-[30%] flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                              active
                                ? 'border-cyan/50 bg-cyan/10 text-cyan'
                                : 'border-border bg-bg/40 text-muted hover:text-text'
                            }`}
                          >
                            <Icon size={16} />
                            {tp.label}
                          </button>
                        )
                      })}
                    </div>

                    <select
                      value={form.interest}
                      onChange={(e) =>
                        setForm({ ...form, interest: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                    >
                      <option value="launch">{t('contact.optLaunch')}</option>
                      <option value="hasslefree">{t('contact.optHassle')}</option>
                      <option value="modules">{t('contact.optModules')}</option>
                      <option value="custom">{t('contact.optCustom')}</option>
                      <option value="scale">{t('contact.optScale')}</option>
                    </select>

                    <input
                      type="text"
                      placeholder={t('contact.namePh')}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                      required
                    />
                    <input
                      type="email"
                      placeholder={t('contact.emailPh')}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                      required
                    />
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder={t('contact.phonePh')}
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                      required
                    />
                    <input
                      type="text"
                      placeholder={t('contact.companyPh')}
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                    />
                    <textarea
                      rows={4}
                      placeholder={t('contact.messagePh')}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text outline-none focus:border-cyan/50"
                      required
                    />

                    <button
                      type="submit"
                      disabled={!valid || sending}
                      className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan via-purple to-warm px-5 py-3.5 text-sm font-bold text-bg disabled:opacity-40"
                    >
                      {sending ? t('contact.sending') : t('contact.submit')}
                      <ArrowRight size={16} />
                    </button>
                    {error ? (
                      <p className="text-center text-[11px] text-red-400">{error}</p>
                    ) : null}
                    <p className="text-center text-[11px] text-muted">
                      {t('contact.footnote')}
                    </p>
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
