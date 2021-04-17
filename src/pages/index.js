import Image from 'next/image'
import { useRouter } from 'next/router'

import homeLocale from '@/locales/home'

import BlogPost from '@/components/BlogPost'

const RecentBlogPost = ({ locale }) => {
  if (locale === 'id') {
    return (
      <>
        <BlogPost
          slug="spotify-with-nextjs"
          date="27-01-2021"
          title="Menggunakan Spotify API di Next.js"
          summary='Belajar bagaimana cara menggunakan Spotify API untuk widget "now playing" seperti yang ada di footer blog ini.'
        />
        <BlogPost
          slug="switch-to-tailwind"
          date="22-01-2021"
          title="Beralih ke Tailwind CSS"
          summary="Mengapa saya akhirnya beralih ke Tailwind CSS? Apa pengaruhnya ke performa blog ini?"
        />
      </>
    )
  } else {
    return (
      <BlogPost
        slug="en-hello-world"
        date="21-01-2021"
        title="Hello World!"
        summary="This is my first english post!"
      />
    )
  }
}

export default function IndexPage() {
  const router = useRouter()
  const { locale } = router

  return (
    <div className="flex flex-col pt-32">
      <h1 className="mb-4 text-3xl tracking-wide font-black md:text-4xl dark:text-white">
        {homeLocale.greetings[locale]}{' '}
        <span role="img" aria-label="melambaikan tangan">
          👋🏻
        </span>
      </h1>
      <p className="text-gray-700 dark:text-gray-100">
        {homeLocale.description_start[locale]}.{' '}
        {homeLocale.description_end[locale]}{' '}
        <a
          href="https://freedomlife.id"
          target="_blank"
          rel="noreferrer"
          className="text-green-700 dark:text-green-300"
        >
          FreedomLife
        </a>
        .
      </p>

      <h2 className="mt-12 font-bold text-2xl dark:text-white">Projects</h2>
      <a
        href="https://freedomlife.id"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="border mt-4 rounded-t-xl border-gray-200 cursor-pointer transition transform hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
          <div className="p-4">
            <h1 className="font-medium text-lg dark:text-white sm:text-xl">
              FreedomLife
            </h1>
            <p className="text-sm text-gray-800 dark:text-gray-300 sm:text-base">
              {locale === 'id'
                ? 'Panduan Baca Alkitab Setahun'
                : 'A 1-Year Bible Reading Guide'}
            </p>
          </div>
        </div>
        <div
          className="rounded-b-xl cursor-pointer"
          style={{
            background:
              'linear-gradient(45deg, rgba(16,185,129,1) 30%, rgba(0,212,255,1) 100%)',
          }}
        >
          <Image
            src="/images/projects/freedomlife.webp"
            width={1000}
            height={400}
            alt="FreedomLife Logo"
            className="rounded-b-xl cursor-pointer"
          />
        </div>
      </a>

      <h2 className="mt-12 font-bold text-2xl dark:text-white">
        {homeLocale.recent_post[locale]}
      </h2>
      <RecentBlogPost locale={locale} />
    </div>
  )
}
