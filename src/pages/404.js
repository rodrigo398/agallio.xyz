import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col pt-32 items-center justify-center">
      <h1 className="mb-4 text-3xl tracking-wide font-black md:text-4xl dark:text-white">
        404 - Not Found
      </h1>
      <Link href="/">
        <a className="w-40 py-2 border border-green-600 sm:w-40 rounded-lg text-green-600 transition transform text-center hover:text-white hover:border-green-600 hover:bg-green-600 dark:text-green-200 dark:border-green-200 dark:hover:bg-green-900">
          Return Home
        </a>
      </Link>
    </div>
  )
}
