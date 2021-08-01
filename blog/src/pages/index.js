import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import ExternalLink from '@/components/ExternalLink'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

export default function IndexPage({ posts }) {
  const filteredPosts = posts.filter((post) => !post.filePath.startsWith('id'))

  return (
    <div>
      <div className="tracking-wide">
        <h1 className="text-3xl font-bold">Agallio Samai</h1>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          <span role="img" aria-label="Indonesia flag">
            🇮🇩
          </span>{' '}
          A musician who codes
        </p>

        <div className="mt-4 flex">
          <h2 className="mr-6 leading-relaxed font-medium text-lg text-black dark:text-white">
            <a
              className="hover:underline"
              href="https://poly.work/agallio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Timeline →
            </a>
          </h2>
          <h2 className="leading-relaxed font-medium text-lg text-black dark:text-white">
            <a
              className="hover:underline"
              href="https://twitter.com/agalliosamai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter →
            </a>
          </h2>
        </div>
      </div>

      <div
        className="mt-10 pt-10 border-t border-gray-300 dark:border-gray-800"
        style={{ transition: 'var(--transition-default)' }}
      >
        <h2 className="tracking-widest font-bold text-gray-700 dark:text-gray-400">
          PROJECTS
        </h2>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://bed.ina-covid.com">
              ina-covid-bed →
            </ExternalLink>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Covid bed availability for all provinces in Indonesia
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://freedomlife.id">
              freedomlife →
            </ExternalLink>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            An annual bible reading guide app
          </p>
        </div>
      </div>

      <div
        className="mt-10 pt-10 border-t border-gray-300 dark:border-gray-800"
        style={{ transition: 'var(--transition-default)' }}
      >
        <h2 className="tracking-widest font-bold text-gray-700 dark:text-gray-400">
          EXPERIENCES
        </h2>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://traveloka.com">
              Traveloka →
            </ExternalLink>{' '}
            <sup className="text-xs tracking-widest ml-2 text-gray-500 dark:text-gray-400">
              NOW
            </sup>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Software Engineer - Web
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://privy.id">PrivyID →</ExternalLink>
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="mr-1">①</span> Lead Frontend Engineer
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="mr-1">②</span> Senior Frontend Engineer
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            Skyshi
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Frontend Engineer</p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            Docotel Group
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Frontend Engineer</p>
        </div>
      </div>

      <div
        className="mt-10 pt-10 border-t border-gray-300 dark:border-gray-800"
        style={{ transition: 'var(--transition-default)' }}
      >
        <h2 className="tracking-widest font-bold text-gray-700 dark:text-gray-400">
          WRITINGS
        </h2>
        {filteredPosts.length > 0
          ? filteredPosts
              .sort(
                (a, b) =>
                  new Date(
                    dayjs(
                      b.data.updated_date || b.data.posted_date,
                      'DD-MM-YYYY'
                    ).toISOString()
                  ) -
                  new Date(
                    dayjs(
                      a.data.updated_date || a.data.posted_date,
                      'DD-MM-YYYY'
                    ).toISOString()
                  )
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={
                    index === 0 || index === filteredPosts.length - 1
                      ? 'my-6'
                      : 'my-8'
                  }
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {dayjs(
                      item.data.updated_date || item.data.posted_date,
                      'DD-MM-YYYY'
                    )
                      .locale('en')
                      .format('DD MMMM YYYY')}
                  </span>
                  <h3 className="leading-snug my-1 font-bold text-xl text-black dark:text-white">
                    <Link
                      href={`/post/${item.filePath.replace(/\.mdx?$/, '')}`}
                      passHref
                    >
                      <span className="cursor-pointer hover:underline">
                        {item.data.title} →
                      </span>
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.data.summary}
                  </p>
                </div>
              ))
          : 'test'}
      </div>
    </div>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)
    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
