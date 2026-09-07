import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Demo from './components/Demo'
import Examples from './components/Examples'
import Industries from './components/Industries'
import WhyStackPulse from './components/WhyStackPulse'
import TalkToUs from './components/TalkToUs'
import FeatureDeepDive from './components/FeatureDeepDive'
import Trust from './components/Trust'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
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
            <Problem />
            <Solution />
            <HowItWorks />
            <Demo />
            <Examples />
            <Industries />
            <WhyStackPulse />
            <TalkToUs />
            <FeatureDeepDive />
            <Trust />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>
        <WhatsAppFloat />
      </div>
    </SmoothScroll>
  )
}
