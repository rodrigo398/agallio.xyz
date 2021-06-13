import { ThemeProvider } from 'next-themes'

import SEO from '@/components/SEO'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import '../styles/index.css'

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider attribute="class">
      <SEO />

      <Header router={router} />

      <main className="flex flex-col max-w-2xl mx-auto px-4 md:px-0">
        <Component {...pageProps} />

        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default MyApp
