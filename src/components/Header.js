import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import headerLocale from '@/locales/header'

const NavLinks = ({ activeRoute, isExpanded, setExpanded, locale }) => (
  <>
    <Link href="/">
      <button
        aria-label="Home"
        className={`py-2 rounded-lg focus:outline-none ${
          isExpanded
            ? `w-full mb-1 ${
                activeRoute === headerLocale.home[locale]
                  ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'dark:text-green-200'
              }`
            : `w-24 mr-2 transition transform duration-300 ${
                activeRoute === headerLocale.home[locale]
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'hover:bg-green-200 hover:text-green-800 dark:text-green-200 dark:hover:bg-green-900'
              }`
        }`}
        onClick={isExpanded ? () => setExpanded(false) : null}
      >
        {headerLocale.home[locale]}
      </button>
    </Link>

    <Link href="/about">
      <button
        aria-label="About"
        className={`py-2 rounded-lg focus:outline-none ${
          isExpanded
            ? `w-full mb-1 ${
                activeRoute === headerLocale.about[locale]
                  ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'dark:text-green-200'
              }`
            : `w-24 mr-2 transition transform duration-300 ${
                activeRoute === headerLocale.about[locale]
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'hover:bg-green-200 hover:text-green-800 dark:text-green-200 dark:hover:bg-green-900'
              }`
        }`}
        onClick={isExpanded ? () => setExpanded(false) : null}
      >
        {headerLocale.about[locale]}
      </button>
    </Link>

    <Link href="/blog">
      <button
        aria-label="Blog"
        className={`py-2 rounded-lg focus:outline-none ${
          isExpanded
            ? `w-full ${
                activeRoute === headerLocale.blog[locale]
                  ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'dark:text-green-200'
              }`
            : `w-24 transition transform duration-300 ${
                activeRoute === headerLocale.blog[locale]
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'hover:bg-green-200 hover:text-green-800 dark:text-green-200 dark:hover:bg-green-900'
              }`
        }`}
        onClick={isExpanded ? () => setExpanded(false) : null}
      >
        {headerLocale.blog[locale]}
      </button>
    </Link>
  </>
)

const Header = ({ router }) => {
  const { locale } = router
  const [isExpanded, setExpanded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true), [])

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  let activeRoute = ''
  let activePath = ''
  if (router.pathname === '/') {
    activeRoute = headerLocale.home[locale]
    activePath = '/'
  }
  if (router.pathname.startsWith('/about')) {
    activeRoute = headerLocale.about[locale]
    activePath = '/about'
  }
  if (router.pathname.startsWith('/blog')) {
    activeRoute = headerLocale.blog[locale]
    activePath = '/blog'
  }

  const handleI18n = () => {
    setExpanded(false)
    if (locale === 'en') {
      if (router.pathname === '/blog/[slug]') {
        router.push('/blog', '/blog', {
          locale: 'id',
        })
      } else {
        router.push(router.pathname, router.pathname, {
          locale: 'id',
        })
      }
    } else if (locale === 'id') {
      if (router.pathname === '/blog/[slug]') {
        router.push('/blog', '/blog', {
          locale: 'en',
        })
      } else {
        router.push(router.pathname, router.pathname, {
          locale: 'en',
        })
      }
    }
  }

  return (
    <>
      <nav
        className={`z-20 m-0 p-4 fixed left-0 right-0 flex md:hidden ${
          isExpanded ? 'items-start flex-col' : 'items-center flex-row'
        }`}
        style={{ top: -1 }}
      >
        <div
          className="absolute w-full h-full left-0 top-0 bg-white bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-60"
          style={{
            zIndex: -1,
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          }}
        />

        {isExpanded ? (
          <>
            <div className="flex justify-between w-full">
              <button
                aria-label="Close Menu"
                className={`w-8 h-8 mb-4 p-2 bg-green-600 text-white rounded-lg transition transform duration-300 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 dark:text-green-200 focus:outline-none ${
                  isExpanded ? 'block' : 'hidden'
                }`}
                onClick={() => setExpanded(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                aria-label="Toggle Language"
                className="flex items-center justify-center w-8 h-8 border rounded-lg transition transform duration-300 border-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                onClick={handleI18n}
              >
                {locale === 'id' ? (
                  <span role="img" aria-label="Indonesia">
                    🇮🇩
                  </span>
                ) : (
                  <span role="img" aria-label="Inggris">
                    🇺🇸
                  </span>
                )}
              </button>
            </div>
            <NavLinks
              activeRoute={activeRoute}
              isExpanded={isExpanded}
              setExpanded={setExpanded}
              locale={locale}
            />
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            <button
              aria-label="Open Menu"
              className="w-8 h-8 p-2 bg-green-600 text-white rounded-lg transition transform duration-300 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 dark:text-green-200 focus:outline-none"
              onClick={() => setExpanded(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link href={activePath}>
              <p className="dark:text-white">{activeRoute}</p>
            </Link>
            <button
              aria-label="Switch Theme"
              className="w-8 h-8 p-2 bg-green-600 text-white rounded-lg transition transform duration-300 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 dark:text-green-200 focus:outline-none"
              onClick={switchTheme}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMounted && theme === 'light' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            </button>
          </div>
        )}
      </nav>

      <nav
        className="z-20 m-0 py-4 fixed left-0 right-0 hidden md:flex md:items-center"
        style={{ top: -1 }}
      >
        <div
          className="absolute w-full h-full left-0 top-0 border-b border-gray-100 bg-white bg-opacity-60 dark:bg-gray-900 dark:border-gray-700 dark:bg-opacity-80"
          style={{
            zIndex: -1,
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          }}
        />
        <div className="w-full max-w-lg mx-auto flex items-center justify-between">
          <div>
            <NavLinks
              activeRoute={activeRoute}
              isExpanded={isExpanded}
              setExpanded={setExpanded}
              locale={locale}
            />
          </div>
          <div className="flex items-center">
            <button
              aria-label="Toggle Language"
              className="flex items-center justify-center w-8 h-8 mr-4 border rounded-lg transition transform duration-300 border-green-600 hover:bg-green-100 dark:hover:bg-green-900"
              onClick={handleI18n}
            >
              {locale === 'id' ? (
                <span role="img" aria-label="Indonesia">
                  🇮🇩
                </span>
              ) : (
                <span role="img" aria-label="Inggris">
                  🇺🇸
                </span>
              )}
            </button>
            <button
              aria-label="Switch Theme"
              className="w-8 h-8 p-2 bg-green-600 text-white rounded-lg transition transform duration-300 hover:bg-green-700 focus:outline-none"
              onClick={switchTheme}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMounted && theme === 'light' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
