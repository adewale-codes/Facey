import Head from 'next/head'
import { Hero } from './components/Hero'
import TreatmentSection from './components/Treatment'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Facey official website</title>
        <meta property="og:title" content="Facey official website" key="title" />
      </Head>
      <Hero />
      <TreatmentSection />
    </div>
  )
}
