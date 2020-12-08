import Head from 'next/head'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

const SeoConfig = {
  title: 'Agallio Samai',
  description: 'Web Engineer.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://agallio.vercel.app',
    site_name: 'Agallio',
    images: [
      {
        url: 'http://agallio.vercel.app/images/og-aga.png',
        alt: 'Agallio Samai',
      },
    ],
  },
  twitter: {
    handle: '@agalliosamai',
    site: '@agalliosamai',
    cardType: 'summary_large_image',
  },
}

export default function SEO() {
  const router = useRouter()

  let emoji = '🙂'
  if (router.route.indexOf('/about') === 0) emoji = '👋'
  if (router.route.indexOf('/blog') === 0) emoji = '🤔'

  return (
    <>
      <DefaultSeo {...SeoConfig} />
      <Head>
        <meta name="theme-color" content="#319795" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="mask-icon" href="/images/mask-icon.svg" color="#050505" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`}
        />
      </Head>
    </>
  )
}
