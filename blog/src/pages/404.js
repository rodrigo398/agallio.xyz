import { useEffect, useState } from 'react'
import Link from 'next/link'

const textArray = [
  'Nothing',
  'What are you doing?',
  'Searching for what?',
  'There is nothing here',
  'Why do you search for nothing?',
  'This page does not exists',
]

export default function NotFoundPage() {
  const [text, setText] = useState(textArray[0])

  useEffect(() => {
    setText(textArray[Math.floor(Math.random() * (6 - 0) + 0)])
  }, [])

  return (
    <div>
      <h1 className="text-black dark:text-white mb-2 text-3xl font-bold">
        {text}
      </h1>
      <h4 className="leading-relaxed font-medium text-lg text-black dark:text-white">
        <Link href="/" passHref>
          <button className="hover:underline">← Go back</button>
        </Link>
      </h4>
    </div>
  )
}
