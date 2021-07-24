import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

import SEO from '@/components/SEO'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { animate } from '@/utils/animate'

import 'react-medium-image-zoom/dist/styles.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    animate()
  }, [])

  return (
    <ThemeProvider attribute="class">
      <SEO />
      <div className="max-w-lg mx-auto px-6 py-10">
        <Header isMounted={isMounted} />
        <Component {...pageProps} />
        {router.route !== '/404' && <Footer />}
      </div>
    </ThemeProvider>
  )
}

export default MyApp
