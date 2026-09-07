import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const INQUIRY_TO = process.env.INQUIRY_TO || 'gauravmaru2@gmail.com'

const TYPE_LABELS = {
  business: 'Business',
  startup: 'Startup',
  founder: 'Founder',
}

const INTEREST_LABELS = {
  launch: 'I want to launch fast',
  hasslefree: 'Hassle-free service',
  modules: 'Module-powered website',
  custom: 'Custom solution for my business',
  scale: "I'm ready to scale online",
}

app.use(cors())
app.use(express.json({ limit: '32kb' }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not configured')
  }

  return nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

app.post('/api/inquiry', async (req, res) => {
  const { name, email, mobile, company, type, interest, message } = req.body ?? {}

  if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  const typeLabel = TYPE_LABELS[type] || type || '—'
  const interestLabel = INTEREST_LABELS[interest] || interest || '—'
  const companyLabel = company?.trim() || '—'
  const mobileLabel = mobile?.trim() || '—'

  const text = [
    'New stackpulse inquiry',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Mobile: ${mobileLabel}`,
    `Company: ${companyLabel}`,
    `Type: ${typeLabel}`,
    `Interest: ${interestLabel}`,
    '',
    'Message:',
    message.trim(),
  ].join('\n')

  const html = `
    <h2>New stackpulse inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(mobileLabel)}</p>
    <p><strong>Company:</strong> ${escapeHtml(companyLabel)}</p>
    <p><strong>Type:</strong> ${escapeHtml(typeLabel)}</p>
    <p><strong>Interest:</strong> ${escapeHtml(interestLabel)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
  `

  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"stackpulse Inquiry" <${process.env.SMTP_USER}>`,
      to: INQUIRY_TO,
      replyTo: email.trim(),
      subject: `New inquiry from ${name.trim()}${company?.trim() ? ` (${company.trim()})` : ''}`,
      text,
      html,
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Inquiry email failed:', error)
    res.status(500).json({ error: 'Failed to send inquiry email.' })
  }
})

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Inquiry emails will be sent to ${INQUIRY_TO}`)
})
