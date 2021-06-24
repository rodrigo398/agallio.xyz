import Link from 'next/link'
import htmr from 'htmr'

import homeLocale from '@/locales/home'

import BlogPost from '@/components/BlogPost'

const RecentBlogPost = () => {
  return (
    <>
      <BlogPost
        slug="fe-engineering-lead"
        date="24-06-2021"
        title="Becoming a Frontend Engineering Lead In My Early 20s"
        summary="The story of my experience as a frontend engineering lead in my early 20s."
      />
      <BlogPost
        slug="switch-to-tailwind"
        date="17-06-2021"
        title="Switch To Tailwind CSS"
        summary="Why did I end up switching to Tailwind CSS? How does it affect the performance of this blog?"
      />
      <BlogPost
        slug="hello-world"
        date="21-01-2021"
        title="Hello World!"
        summary="This is my first english post!"
      />
    </>
  )
}

export default function IndexPage() {
  return (
    <div className="flex flex-col pt-28">
      <h1 className="mb-6 text-3xl tracking-wide font-black md:text-4xl dark:text-white">
        {homeLocale.greetings.en}{' '}
        <span role="img" aria-label="handwaves">
          👋🏻
        </span>
      </h1>
      <p className="text-gray-700 dark:text-gray-100 leading-relaxed sm:text-xl">
        {htmr(homeLocale.description.en)}
      </p>

      <p className="sm:text-xl mt-6">
        <Link href="/about">
          <a className="bouncy-anchor">{homeLocale.cta_about.en} →</a>
        </Link>
      </p>

      {/* <h2 className="mt-12 font-bold text-2xl dark:text-white">Projects</h2>
      <a
        href="https://freedomlife.id"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="border mt-4 rounded-t-xl border-gray-200 cursor-pointer transition transform hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
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
        <div className="rounded-b-xl cursor-pointer border border-t-0 bg-white dark:bg-black dark:border-gray-700">
          <div className="flex items-center justify-center py-16 sm:py-6">
            <Image
              src="/images/projects/freedomlife.png"
              width={45}
              height={45}
              alt="FreedomLife Logo"
              className="rounded-b-xl cursor-pointer"
            />
            <h1 className="ml-[5px] text-4xl font-logo text-gray-800 dark:text-white">
              freedomlife
            </h1>
          </div>
        </div>
      </a> */}

      <h2 className="mt-12 font-bold text-2xl dark:text-white">
        {homeLocale.recent_post.en}
      </h2>
      <RecentBlogPost />
    </div>
  )
}
