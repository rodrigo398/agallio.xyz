import { useEffect, useState } from 'react'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'

import Header from './components/header'
import Footer from './components/footer'

import tailwind from './tailwind.css'

export function meta() {
  return {
    title: 'Agallio Samai',
    description: '🇮🇩 A musician who codes',
    'og:url': 'https://agallio.xyz',
    'og:type': 'website',
    'og:locale': 'en',
    'og:site_name': 'Agallio Samai',
    'og:image': 'http://agallio.xyz/images/og-image.png',
    'og:image:alt': 'Agallio Samai',
    'twitter:card': 'summary_large_image',
  }
}

export function links() {
  return [
    { rel: 'manifest', href: '/manifest.webmanifest' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0369a1' },
    { name: 'msapplication-TileColor', content: '#2b5797' },
    {
      rel: 'preload',
      href: '/fonts/inter-var-latin.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    { rel: 'stylesheet', href: tailwind },
  ]
}

export default function App() {
  // To handle client-side routing unintended theme changes.
  useEffect(() => {
    if (
      localStorage.theme === '"dark"' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                localStorage.theme === '"dark"' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
              ) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="max-w-lg mx-auto px-6 py-10 md:max-w-2xl">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

const textArray = [
  'Nothing',
  'What are you doing?',
  'Searching for what?',
  'There is nothing here',
  'Why do you search for nothing?',
  'This page does not exists',
]

export function CatchBoundary() {
  const caught = useCatch()
  const [text, setText] = useState(textArray[0])

  useEffect(() => {
    setText(textArray[Math.floor(Math.random() * (6 - 0) + 0)])
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                localStorage.theme === '"dark"' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
              ) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="max-w-lg mx-auto px-6 py-10 md:max-w-2xl">
          <Header />
          <h1 className="text-black dark:text-white mb-2 text-3xl font-bold">
            {caught.status} {caught.statusText}
          </h1>
          <p>{text}</p>
          <p className="mt-4 leading-relaxed font-medium text-black dark:text-white">
            <Link to="/">
              <button className="hover:underline">← Go back</button>
            </Link>
          </p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
