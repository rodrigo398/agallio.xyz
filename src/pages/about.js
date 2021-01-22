import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import aboutLocale from '@/locales/about'
import homeLocale from '@/locales/home'

import Timeline from '@/components/Timeline'
import EnTimeline from '@/components/en/Timeline'

export default function About() {
  const router = useRouter()
  const { locale } = router

  return (
    <>
      <Head>
        <title>Tentang | Agallio Samai</title>
      </Head>
      <NextSeo
        title="Tentang | Agallio Samai"
        description="Tentang Saya"
        openGraph={{
          url: 'https://agallio.vercel.app/about',
          title: 'Tentang | Agallio Samai',
          description: 'Tentang Saya',
          site_name: 'Agallio Samai',
          images: [
            {
              url: 'http://agallio.vercel.app/images/og-about.png',
              alt: 'Tentang - Agallio Samai',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="flex flex-col pt-32">
        <div className="flex flex-col items-center">
          <Image
            src="/images/avatar.webp"
            width={200}
            height={200}
            layout="intrinsic"
            alt="agallio's avatar"
            className="rounded-full"
          />
        </div>

        <div className="mt-16">
          <h1 className="font-black tracking-wide text-3xl mb-4 sm:text-4xl dark:text-white">
            {aboutLocale.about_me[locale]}
          </h1>
          <p className="text-gray-700 my-2 dark:text-gray-200">
            {aboutLocale.description[locale]}{' '}
            {homeLocale.description_start[locale]}{' '}
            <a
              href="https://privy.id"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 dark:text-green-400"
            >
              PrivyID
            </a>
            . {homeLocale.description_end[locale]}{' '}
            <a
              href="https://freedomlife.id"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 dark:text-green-400"
            >
              FreedomLife
            </a>
            .
          </p>

          <p className="my-2 text-gray-700 dark:text-gray-200">
            {aboutLocale.music_description[locale]}{' '}
            <a
              href="https://instagram.com/agallio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400"
            >
              Instagram
            </a>{' '}
            {locale === 'en' ? 'and' : 'dan'}{' '}
            <a
              href="https://www.youtube.com/channel/UCyX8oVNaFtOi0PI98t7EO6g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400"
            >
              YouTube
            </a>
            {locale === 'en' ? '.' : ' saya.'}
          </p>

          <h1 className="font-black tracking-wide text-3xl mb-4 mt-12 sm:text-4xl dark:text-white">
            {aboutLocale.timeline[locale]}
          </h1>

          {locale === 'en' ? <EnTimeline /> : <Timeline />}
        </div>
      </div>
    </>
  )
}
