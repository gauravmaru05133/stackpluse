# stackpulse

Modern SaaS landing & inquiry site built with **React + Vite**.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (scroll reveals & micro-interactions)
- Lenis (smooth scrolling)
- Lucide icons

## Run

```bash
npm install
cp .env.example .env
# Add your Gmail App Password to .env (see below)
npm run dev:full
```

Open [http://localhost:5173](http://localhost:5173).

### Inquiry email setup

Form submissions are sent to `gauravmaru2@gmail.com` via Gmail SMTP.

1. Enable 2-Step Verification on your Google account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Copy `.env.example` to `.env` and set `SMTP_PASS` to that app password

For local development, run both the API and frontend:

```bash
npm run dev:full
```

For production on EC2:

```bash
npm run build
npm run start
```

## Build

```bash
npm run build
npm run preview
```
