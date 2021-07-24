import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'Agallio Samai',
  description: '🇮🇩 A musician who codes',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://agallio.xyz',
    site_name: 'Agallio Samai',
    images: [
      {
        url: 'http://agallio.xyz/images/og-main.png',
        alt: 'Agallio Samai',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
}

export default function SEO() {
  return (
    <>
      <DefaultSeo {...SeoConfig} />
      <Head>
        <meta name="theme-color" content="#0284C7" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
    </>
  )
}
