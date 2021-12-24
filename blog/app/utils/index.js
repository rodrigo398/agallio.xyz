export { animate } from './animate'
export { default as dayjs } from './dayjs'
export { getDatabase, getPage, getBlocks } from './notion'

export function getReadingTime({ isIndonesian, text }) {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time > 0 ? `${time} min read` : '< 1 min read'
}
