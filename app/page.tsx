import Head from 'next/head'
import { Hero } from './components/Hero'
import TreatmentSection from './components/Treatment'
import LogoSlider from './components/LogoSlider'
import FindSection from './components/FindSection'
import WellnessSection from './components/Wellness'
import AppointmentSection from './components/Appointment'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Facey official website</title>
        <meta property="og:title" content="Facey official website" key="title" />
      </Head>
      <Hero />
      <TreatmentSection />
      <LogoSlider />
      <FindSection />
      <WellnessSection />
      <AppointmentSection />
    </div>
  )
}
