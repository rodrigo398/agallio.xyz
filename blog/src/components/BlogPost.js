import Link from 'next/link'
import { useRouter } from 'next/router'

import dayjs from '@/utils/dayjs'

export default function BlogPost({ slug, title, summary, date }) {
  const router = useRouter()
  const { locale } = router
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <div className="p-4 border mt-4 rounded border-gray-200 cursor-pointer transition transform hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900">
        <h1 className="font-medium text-lg leading-snug dark:text-white sm:text-xl">
          {title}
        </h1>
        <p className="text-gray-800 text-sm mt-1 dark:text-gray-300 sm:text-base">
          {summary}
        </p>
        <p className="text-gray-500 text-sm mt-4 dark:text-gray-400">
          {dayjs(date, 'DD-MM-YYYY')
            .locale(locale === 'id' ? 'id' : 'en')
            .format('dddd, DD MMMM YYYY')}
        </p>
      </div>
    </Link>
  )
}
