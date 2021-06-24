import Link from 'next/link'

import notFoundLocale from '../locales/404'

export default function NotFound() {
  return (
    <div className="flex flex-col pt-32 items-center justify-center">
      <h1 className="mb-4 text-3xl tracking-wide font-black md:text-3xl dark:text-white">
        {notFoundLocale.text.en}
      </h1>
      <Link href="/" locale="en">
        <a className="bouncy-anchor text-xl">{notFoundLocale.button.en}</a>
      </Link>
    </div>
  )
}
