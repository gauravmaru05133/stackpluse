import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clapperboard,
  Globe2,
  MessageSquare,
  Palette,
  Share2,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Logo from '../components/Logo'
import WhatsAppFloat, { WHATSAPP_URL } from '../components/WhatsAppFloat'
import { useLanguage } from '../i18n/LanguageContext'

const INQUIRY_EMAIL = 'gauravmaru2@gmail.com'

function resolveMulti(ids, labels, otherText) {
  return ids
    .map((id) => {
      if (id === 'other') {
        const custom = otherText?.trim()
        return custom ? `Other: ${custom}` : 'Other'
      }
      return labels[id] || id
    })
    .join(', ')
}

async function sendCreatorInquiry(form, labels) {
  const types = resolveMulti(form.creatorTypes, labels.types, form.creatorTypeOther)
  const niches = resolveMulti(form.niches, labels.niches, form.nicheOther)
  const needs = resolveMulti(form.needs, labels.needs, form.needOther)
  const audience = labels.audiences[form.audience] || form.audience
  const language = labels.languages[form.language] || form.language

  const fullName = form.name.trim()
  const brand = form.brand.trim()
  const email = form.email.trim()
  const whatsapp = form.mobile.trim()
  const city = form.city?.trim() || '—'
  const website = form.website?.trim() || '—'
  const instagram = form.instagram?.trim() || '—'
  const youtube = form.youtube?.trim() || '—'
  const social = form.social?.trim() || '—'
  const notes = form.message?.trim() || '—'

  // Single readable body + individual fields for FormSubmit table view
  const message = [
    'New creator join request — StackPulse',
    '',
    `Full name: ${fullName}`,
    `Creator / brand: ${brand}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp}`,
    `I am a: ${types || '—'}`,
    `My niche: ${niches || '—'}`,
    `I need on my site: ${needs || '—'}`,
    `Audience size: ${audience}`,
    `Content language: ${language}`,
    `City: ${city}`,
    `Existing website: ${website}`,
    `Instagram: ${instagram}`,
    `YouTube: ${youtube}`,
    `Other social: ${social}`,
    `Anything else: ${notes}`,
  ].join('\n')

  const response = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: fullName,
      email,
      whatsapp,
      creator_brand: brand,
      i_am_a: types || '—',
      my_niche: niches || '—',
      i_need_on_my_site: needs || '—',
      audience_size: audience,
      content_language: language,
      city,
      existing_website: website,
      instagram,
      youtube,
      other_social: social,
      anything_else: notes,
      message,
      _replyto: email,
      _subject: `StackPulse creator join — ${brand}`,
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

function CreatorPath({ steps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-2 rounded-2xl border border-border/70 bg-bg-elevated/40 px-3.5 py-2.5 backdrop-blur-sm sm:gap-x-3 sm:px-4"
    >
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          {i > 0 ? (
            <span className="text-cyan/50" aria-hidden>
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          ) : null}
          <span
            className={`text-sm font-semibold tracking-tight ${
              i === steps.length - 1 ? 'gradient-text' : 'text-text/85'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__image" />
      <div className="site-bg__glow" />
      <div className="site-bg__vignette" />
    </div>
  )
}

function SectionLabel({ children, hint }) {
  return (
    <div className="mb-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan/90">{children}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-left text-xs font-semibold transition sm:text-sm ${
        active
          ? 'border-cyan/50 bg-cyan/15 text-cyan shadow-[0_0_20px_rgba(0,240,255,0.12)]'
          : 'border-border bg-surface/60 text-muted hover:border-cyan/30 hover:text-text'
      }`}
    >
      {children}
    </motion.button>
  )
}

function OtherInput({ show, id, label, placeholder, value, onChange, fieldClass }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -6 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="overflow-hidden"
        >
          <div className="mt-3">
            <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">
              {label}
            </label>
            <input
              id={id}
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={fieldClass}
              required
              autoFocus
            />
            {value.trim() ? (
              <p className="mt-2 text-xs text-cyan">
                ✓ {value.trim()}
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function chipLabel(id, baseLabel, otherText) {
  if (id !== 'other') return baseLabel
  const custom = otherText?.trim()
  return custom ? custom : baseLabel
}

export default function CreatorsJoin() {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    brand: '',
    creatorTypes: ['influencer'],
    creatorTypeOther: '',
    niches: ['lifestyle'],
    nicheOther: '',
    needs: ['website', 'enquiry'],
    needOther: '',
    audience: '1k-10k',
    language: 'en',
    mobile: '',
    email: '',
    instagram: '',
    youtube: '',
    social: '',
    city: '',
    website: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [needsActivation, setNeedsActivation] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = t('creators.docTitle')
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t('creators.docDesc'))
    return () => {
      document.title =
        'StackPulse Business | StackPulse.in – Local Business Website & Growth Platform'
    }
  }, [t])

  const creatorTypes = [
    { id: 'youtuber', label: t('creators.typeYoutuber') },
    { id: 'instagram', label: t('creators.typeInstagram') },
    { id: 'influencer', label: t('creators.typeInfluencer') },
    { id: 'tiktok', label: t('creators.typeTiktok') },
    { id: 'coach', label: t('creators.typeCoach') },
    { id: 'educator', label: t('creators.typeEducator') },
    { id: 'artist', label: t('creators.typeArtist') },
    { id: 'musician', label: t('creators.typeMusician') },
    { id: 'photographer', label: t('creators.typePhotographer') },
    { id: 'freelancer', label: t('creators.typeFreelancer') },
    { id: 'podcaster', label: t('creators.typePodcaster') },
    { id: 'streamer', label: t('creators.typeStreamer') },
    { id: 'other', label: t('creators.typeOther') },
  ]

  const niches = [
    { id: 'lifestyle', label: t('creators.nicheLifestyle') },
    { id: 'fashion', label: t('creators.nicheFashion') },
    { id: 'beauty', label: t('creators.nicheBeauty') },
    { id: 'fitness', label: t('creators.nicheFitness') },
    { id: 'food', label: t('creators.nicheFood') },
    { id: 'travel', label: t('creators.nicheTravel') },
    { id: 'tech', label: t('creators.nicheTech') },
    { id: 'education', label: t('creators.nicheEducation') },
    { id: 'business', label: t('creators.nicheBusiness') },
    { id: 'entertainment', label: t('creators.nicheEntertainment') },
    { id: 'other', label: t('creators.nicheOther') },
  ]

  const needOptions = [
    { id: 'website', label: t('creators.needWebsite') },
    { id: 'portfolio', label: t('creators.needPortfolio') },
    { id: 'linkbio', label: t('creators.needLinkbio') },
    { id: 'enquiry', label: t('creators.needEnquiry') },
    { id: 'booking', label: t('creators.needBooking') },
    { id: 'collab', label: t('creators.needCollab') },
    { id: 'shop', label: t('creators.needShop') },
    { id: 'courses', label: t('creators.needCourses') },
    { id: 'media', label: t('creators.needMedia') },
    { id: 'whatsapp', label: t('creators.needWhatsapp') },
    { id: 'other', label: t('creators.needOther') },
  ]

  const audiences = [
    { id: 'under1k', label: t('creators.audUnder1k') },
    { id: '1k-10k', label: t('creators.aud1k10k') },
    { id: '10k-50k', label: t('creators.aud10k50k') },
    { id: '50k-100k', label: t('creators.aud50k100k') },
    { id: '100k+', label: t('creators.aud100k') },
  ]

  const languages = [
    { id: 'en', label: t('creators.langEn') },
    { id: 'hi', label: t('creators.langHi') },
    { id: 'gu', label: t('creators.langGu') },
    { id: 'mixed', label: t('creators.langMixed') },
  ]

  const labels = {
    types: Object.fromEntries(creatorTypes.map((n) => [n.id, n.label])),
    niches: Object.fromEntries(niches.map((n) => [n.id, n.label])),
    needs: Object.fromEntries(needOptions.map((n) => [n.id, n.label])),
    audiences: Object.fromEntries(audiences.map((n) => [n.id, n.label])),
    languages: Object.fromEntries(languages.map((n) => [n.id, n.label])),
  }

  const highlights = [
    { icon: Globe2, text: t('creators.li1') },
    { icon: MessageSquare, text: t('creators.li2') },
    { icon: Clapperboard, text: t('creators.li3') },
    { icon: Share2, text: t('creators.li4') },
    { icon: CalendarDays, text: t('creators.li5') },
    { icon: Palette, text: t('creators.li6') },
    { icon: Zap, text: t('creators.li7') },
    { icon: Users, text: t('creators.li8') },
  ]

  const toggleMulti = (key, otherKey, id) => {
    setForm((prev) => {
      const list = prev[key]
      const has = list.includes(id)
      const next = has ? list.filter((n) => n !== id) : [...list, id]
      const patch = { [key]: next }
      if (id === 'other' && has) patch[otherKey] = ''
      return { ...prev, ...patch }
    })
  }

  const otherReady = (selected, otherText) =>
    !selected.includes('other') || otherText.trim().length > 0

  const valid =
    form.name.trim().length > 1 &&
    form.brand.trim().length > 1 &&
    form.email.includes('@') &&
    form.mobile.replace(/\D/g, '').length >= 10 &&
    form.creatorTypes.length > 0 &&
    form.niches.length > 0 &&
    form.needs.length > 0 &&
    Boolean(form.audience) &&
    Boolean(form.language) &&
    form.city.trim().length > 0 &&
    form.website.trim().length > 0 &&
    form.instagram.trim().length > 0 &&
    form.youtube.trim().length > 0 &&
    form.social.trim().length > 0 &&
    form.message.trim().length > 0 &&
    otherReady(form.creatorTypes, form.creatorTypeOther) &&
    otherReady(form.niches, form.nicheOther) &&
    otherReady(form.needs, form.needOther)

  const submit = async (e) => {
    e.preventDefault()
    if (!valid || sending) return

    setSending(true)
    setError('')

    try {
      const result = await sendCreatorInquiry(form, labels)
      setNeedsActivation(Boolean(result.needsActivation))
      setSent(true)
    } catch {
      setError(t('creators.error'))
    } finally {
      setSending(false)
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-border bg-bg/70 px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/50 focus:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/25'

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="relative min-h-screen text-text">
      <SiteBackground />
      <div className="page-shell">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
            <a href="/" className="group">
              <Logo size="sm" />
            </a>
            <div className="flex items-center gap-3">
              <LanguageSwitcher compact />
              <a
                href="/"
                className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-cyan/40 hover:text-text sm:inline-flex"
              >
                {t('creators.backHome')}
              </a>
            </div>
          </nav>
        </header>

        <main className="relative pt-24 pb-20 md:pt-28 md:pb-28">
          <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[70%] -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]" />
          <div className="aurora opacity-40" />

          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <motion.div
              className="mb-12 max-w-3xl"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.span variants={fadeUp} className="friendly-pill mb-5 inline-flex items-center gap-1.5">
                <Sparkles size={14} className="text-cyan" />
                {t('creators.eyebrow')}
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl md:text-[3rem] md:leading-[1.12]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t('creators.title')}{' '}
                <span className="gradient-text">{t('creators.titleAccent')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-lg font-medium text-text/90 md:text-xl">
                {t('creators.support')}
              </motion.p>
              <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-[1.05rem]">
                {t('creators.desc')}
              </motion.p>
              <CreatorPath
                steps={[t('creators.stepCreate'), t('creators.stepVerified'), t('creators.stepReady')]}
              />
            </motion.div>

            <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <motion.div
                className="space-y-3"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {highlights.map(({ icon: Icon, text }) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    className="glass group flex items-start gap-3 rounded-2xl border border-border/80 p-4 transition hover:border-cyan/30"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-purple/15 text-cyan ring-1 ring-cyan/25">
                      <Icon size={18} />
                    </span>
                    <p className="text-sm leading-relaxed text-muted group-hover:text-text/90">{text}</p>
                  </motion.div>
                ))}

                <motion.a
                  variants={fadeUp}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-cyan hover:opacity-80"
                >
                  {t('creators.whatsappCta')}
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong relative overflow-hidden rounded-[1.75rem] p-[1px]"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple/20 blur-3xl" />
                <div className="relative rounded-[1.7rem] bg-bg-elevated/95 p-5 md:p-7">
                  <div className="mb-6">
                    <h2
                      className="text-lg font-bold text-text md:text-xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t('creators.formTitle')}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t('creators.formDesc')}</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center py-14 text-center"
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan/15 ring-1 ring-cyan/40">
                          <Check className="text-cyan" size={28} />
                        </div>
                        <h3
                          className="text-xl font-bold text-text"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {t('creators.thanksTitle')}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-muted">
                          {needsActivation ? t('creators.activateDesc') : t('creators.thanksDesc')}
                        </p>
                        <a href="/" className="mt-6 text-sm font-semibold text-cyan hover:opacity-80">
                          {t('creators.backHome')} →
                        </a>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={submit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative space-y-6"
                      >
                        <div>
                          <SectionLabel>{t('creators.sectionAbout')}</SectionLabel>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label htmlFor="creator-name" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.fullName')}
                              </label>
                              <input
                                id="creator-name"
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={fieldClass}
                                required
                                autoComplete="name"
                              />
                            </div>
                            <div>
                              <label htmlFor="creator-brand" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.brandName')}
                              </label>
                              <input
                                id="creator-brand"
                                type="text"
                                value={form.brand}
                                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                className={fieldClass}
                                required
                                autoComplete="organization"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <SectionLabel hint={t('creators.multiHint')}>{t('creators.sectionType')}</SectionLabel>
                          <div className="flex flex-wrap gap-2">
                            {creatorTypes.map((tp) => {
                              const active = form.creatorTypes.includes(tp.id)
                              return (
                                <Chip
                                  key={tp.id}
                                  active={active}
                                  onClick={() => toggleMulti('creatorTypes', 'creatorTypeOther', tp.id)}
                                >
                                  {active ? '✓ ' : ''}
                                  {chipLabel(tp.id, tp.label, form.creatorTypeOther)}
                                </Chip>
                              )
                            })}
                          </div>
                          <OtherInput
                            show={form.creatorTypes.includes('other')}
                            id="creator-type-other"
                            label={t('creators.otherTypeLabel')}
                            placeholder={t('creators.otherTypePh')}
                            value={form.creatorTypeOther}
                            onChange={(e) => setForm({ ...form, creatorTypeOther: e.target.value })}
                            fieldClass={fieldClass}
                          />
                        </div>

                        <div>
                          <SectionLabel hint={t('creators.multiHint')}>{t('creators.sectionNiche')}</SectionLabel>
                          <div className="flex flex-wrap gap-2">
                            {niches.map((n) => {
                              const active = form.niches.includes(n.id)
                              return (
                                <Chip
                                  key={n.id}
                                  active={active}
                                  onClick={() => toggleMulti('niches', 'nicheOther', n.id)}
                                >
                                  {active ? '✓ ' : ''}
                                  {chipLabel(n.id, n.label, form.nicheOther)}
                                </Chip>
                              )
                            })}
                          </div>
                          <OtherInput
                            show={form.niches.includes('other')}
                            id="creator-niche-other"
                            label={t('creators.otherNicheLabel')}
                            placeholder={t('creators.otherNichePh')}
                            value={form.nicheOther}
                            onChange={(e) => setForm({ ...form, nicheOther: e.target.value })}
                            fieldClass={fieldClass}
                          />
                        </div>

                        <div>
                          <SectionLabel hint={t('creators.needsHint')}>{t('creators.sectionNeeds')}</SectionLabel>
                          <div className="flex flex-wrap gap-2">
                            {needOptions.map((n) => {
                              const active = form.needs.includes(n.id)
                              return (
                                <Chip
                                  key={n.id}
                                  active={active}
                                  onClick={() => toggleMulti('needs', 'needOther', n.id)}
                                >
                                  {active ? '✓ ' : ''}
                                  {chipLabel(n.id, n.label, form.needOther)}
                                </Chip>
                              )
                            })}
                          </div>
                          <OtherInput
                            show={form.needs.includes('other')}
                            id="creator-need-other"
                            label={t('creators.otherNeedLabel')}
                            placeholder={t('creators.otherNeedPh')}
                            value={form.needOther}
                            onChange={(e) => setForm({ ...form, needOther: e.target.value })}
                            fieldClass={fieldClass}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <SectionLabel>{t('creators.sectionAudience')}</SectionLabel>
                            <select
                              id="creator-audience"
                              value={form.audience}
                              onChange={(e) => setForm({ ...form, audience: e.target.value })}
                              className={fieldClass}
                              required
                            >
                              {audiences.map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <SectionLabel>{t('creators.sectionLanguage')}</SectionLabel>
                            <select
                              id="creator-language"
                              value={form.language}
                              onChange={(e) => setForm({ ...form, language: e.target.value })}
                              className={fieldClass}
                              required
                            >
                              {languages.map((l) => (
                                <option key={l.id} value={l.id}>
                                  {l.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <SectionLabel>{t('creators.sectionContact')}</SectionLabel>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label htmlFor="creator-mobile" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.whatsapp')}
                              </label>
                              <input
                                id="creator-mobile"
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
                              <label htmlFor="creator-email" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.email')}
                              </label>
                              <input
                                id="creator-email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={fieldClass}
                                required
                                autoComplete="email"
                              />
                            </div>
                            <div>
                              <label htmlFor="creator-city" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.city')}
                              </label>
                              <input
                                id="creator-city"
                                type="text"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                className={fieldClass}
                                required
                                autoComplete="address-level2"
                              />
                            </div>
                            <div>
                              <label htmlFor="creator-website" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.website')}
                              </label>
                              <input
                                id="creator-website"
                                type="text"
                                placeholder="https://"
                                value={form.website}
                                onChange={(e) => setForm({ ...form, website: e.target.value })}
                                className={fieldClass}
                                required
                                autoComplete="url"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <SectionLabel>{t('creators.sectionSocial')}</SectionLabel>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label htmlFor="creator-instagram" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.instagram')}
                              </label>
                              <input
                                id="creator-instagram"
                                type="text"
                                placeholder={t('creators.instagramPh')}
                                value={form.instagram}
                                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                                className={fieldClass}
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="creator-youtube" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.youtube')}
                              </label>
                              <input
                                id="creator-youtube"
                                type="text"
                                placeholder={t('creators.youtubePh')}
                                value={form.youtube}
                                onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                                className={fieldClass}
                                required
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label htmlFor="creator-social" className="mb-1.5 block text-xs font-medium text-muted">
                                {t('creators.social')}
                              </label>
                              <input
                                id="creator-social"
                                type="text"
                                placeholder={t('creators.socialPh')}
                                value={form.social}
                                onChange={(e) => setForm({ ...form, social: e.target.value })}
                                className={fieldClass}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="creator-message" className="mb-1.5 block text-xs font-medium text-muted">
                            {t('creators.message')}
                          </label>
                          <textarea
                            id="creator-message"
                            rows={3}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className={`${fieldClass} resize-y`}
                            placeholder={t('creators.messagePh')}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={!valid || sending}
                          className="glow-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan via-purple to-warm px-5 py-3.5 text-sm font-bold text-bg disabled:opacity-40"
                        >
                          {sending ? t('creators.sending') : t('creators.submit')}
                          <ArrowRight size={16} />
                        </button>
                        {error ? <p className="text-center text-[11px] text-red-400">{error}</p> : null}
                        <p className="text-center text-[11px] text-muted">{t('creators.footnote')}</p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <WhatsAppFloat />
    </div>
  )
}
