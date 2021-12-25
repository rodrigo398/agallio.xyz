import { useEffect, useState } from 'react'
import { Link } from 'remix'

import AIcon from './icons/a-icon'

import { animate } from '~/utils'

import useLocalStorage from '~/utils/hooks/useLocalStorage'

export default function Header() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useLocalStorage('theme', '')

  useEffect(() => {
    setIsMounted(true)

    animate()
  }, [])

  const toggleMode = () => {
    if (document.documentElement.classList.value.includes('dark')) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  return (
    <div className="flex items-start justify-between">
      <div className="flex relative items-center justify-center p-12 mb-6">
        <svg className="w-32 h-32 absolute" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(120)">
              <stop
                id="gradientStop1"
                offset="0%"
                stopColor="var(--startColor)"
              />
              <stop
                id="gradientStop2"
                offset="100%"
                stopColor="var(--stopColor)"
              />
            </linearGradient>
          </defs>
          <path id="ulala" d="" fill="url('#gradient')"></path>
        </svg>
        <Link to="/" prefetch="intent">
          <button
            aria-label="Home"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <AIcon />
          </button>
        </Link>
      </div>
      {isMounted && (
        <button
          onClick={toggleMode}
          aria-label="Switch Theme"
          className="text-3xl"
        >
          {theme === 'light' ? (
            <span role="img" aria-label="Dark mode">
              🌚
            </span>
          ) : (
            <span role="img" aria-label="Light mode">
              🌝
            </span>
          )}
        </button>
      )}
    </div>
  )
}
