import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { AgentDemo } from './components/AgentDemo'
import { CadCae } from './components/CadCae'
import { Contact } from './components/Contact'
import { Domains } from './components/Domains'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Message } from './components/Message'
import { Navbar } from './components/Navbar'
import { NotChatbot } from './components/NotChatbot'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main id="main">
          <Hero />
          <CadCae />
          <NotChatbot />
          <AgentDemo />
          <HowItWorks />
          <Domains />
          <Message />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
