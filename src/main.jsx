import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreatorsJoin from './pages/CreatorsJoin.jsx'
import { LanguageProvider } from './i18n/LanguageContext'

const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/'
const Page = path === '/creators' ? CreatorsJoin : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  </StrictMode>,
)
