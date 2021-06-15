import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import InfoIcon from './icons/InfoIcon'

const CustomLink = (props) => {
  const router = useRouter()
  const { locale } = router
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} locale={locale}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a
          {...props}
          className={props.type !== 'image' ? 'bouncy-anchor' : ''}
        />
      </Link>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className={props.type !== 'image' ? 'bouncy-anchor' : ''}
      />
    </>
  )
}

const InfoCard = (props) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <InfoIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>
      <div className="w-full py-3 px-4 rounded border-l-[6px] leading-snug bg-gray-100 dark:bg-gray-900 border-green-600 dark:border-green-400 text-gray-700 dark:text-white">
        {props.children}
      </div>
    </div>
  )
}

const MDXComponents = {
  Image,
  a: CustomLink,
  ImageLink: (props) => <CustomLink type="image" {...props} />,
  CustomLink,
  InfoCard,
}

export default MDXComponents
