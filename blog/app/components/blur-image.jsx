import { useState } from 'react'

export default function BlurImage({ src, alt, width, height }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`w-full h-full aspect-[${width}/${height}] shadow-md rounded bg-zinc-300 dark:bg-zinc-700 ${
        !loaded ? 'animate-pulse' : ''
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="rounded"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
