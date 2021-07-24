import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Zoom from 'react-medium-image-zoom'

const CustomLink = (props) => {
  const router = useRouter()
  const { locale } = router
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} locale={props.locale || locale}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  }

  return (
    <>
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {props.children}
      </a>
    </>
  )
}

const ImageComponent = (props) => {
  const { theme } = useTheme()

  return (
    <Zoom
      overlayBgColorEnd={
        theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'
      }
      overlayBgColorStart={
        theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'
      }
    >
      <Image {...props} alt={props.alt} />
    </Zoom>
  )
}

const MDXComponents = {
  Image: ImageComponent,
  a: CustomLink,
  CustomLink,
}

export default MDXComponents
