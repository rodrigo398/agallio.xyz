import { useTheme } from 'next-themes'
import Link from 'next/link'

import AIcon from './icons/AIcon'

export default function Header({ isMounted }) {
  const { theme, setTheme } = useTheme()

  const toggleMode = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center justify-center p-12 mb-6">
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
        <Link href="/" passHref>
          <button className="absolute">
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
