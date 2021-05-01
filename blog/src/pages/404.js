import { useRouter } from 'next/router'
import Link from 'next/link'

import notFoundLocale from '../locales/404'

export default function NotFound() {
  const router = useRouter()
  const { locale } = router

  return (
    <div className="flex flex-col pt-32 items-center justify-center">
      <h1 className="mb-4 text-3xl tracking-wide font-black md:text-3xl dark:text-white">
        {notFoundLocale.text[locale]}
      </h1>
      <Link href="/">
        <a className="py-2 px-4 border border-green-600 rounded-lg text-green-600 transition transform text-center hover:text-white hover:border-green-600 hover:bg-green-600 dark:text-green-200 dark:border-green-200 dark:hover:bg-green-900">
          {notFoundLocale.button[locale]}
        </a>
      </Link>
    </div>
  )
}
