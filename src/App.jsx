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

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-bg text-text">
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
    </SmoothScroll>
  )
}
