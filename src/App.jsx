import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import LaunchPromise from './components/LaunchPromise'
import Modules from './components/Modules'
import SpecialCare from './components/SpecialCare'
import Features from './components/Features'
import Proof from './components/Proof'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__image" />
      <div className="site-bg__glow" />
      <div className="site-bg__vignette" />
    </div>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-text">
        <SiteBackground />
        <div className="page-shell">
          <Navbar />
          <main>
            <Hero />
            <HowItWorks />
            <LaunchPromise />
            <Modules />
            <SpecialCare />
            <Features />
            <Proof />
            <Contact />
          </main>
          <Footer />
        </div>
        <WhatsAppFloat />
      </div>
    </SmoothScroll>
  )
}
