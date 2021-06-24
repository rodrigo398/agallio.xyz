import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'

import BlogPost from '@/components/BlogPost'

import blogLocale from '@/locales/blog'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

export default function Blog({ posts, seo }) {
  return (
    <>
      <Head>
        <title>{seo.en.title}</title>
      </Head>
      <NextSeo {...seo.en} />

      <div className="flex flex-col pt-28">
        <h1 className="mb-4 text-4xl tracking-wide font-black md:text-4xl dark:text-white">
          Blog{' '}
          <span role="img" aria-label="handwriting">
            ✍🏻
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-4 text-gray-700 dark:text-gray-100">
          {blogLocale.description.en}
        </p>

        {posts.filter((item) => !item.filePath.startsWith('id')).length > 0 ? (
          posts
            .filter((item) => !item.filePath.startsWith('id'))
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
              <BlogPost
                key={index}
                slug={item.filePath.replace(/\.mdx?$/, '')}
                title={item.data.title}
                summary={item.data.summary}
                date={item.data.updated_date || item.data.posted_date}
              />
            ))
        ) : (
          <p className="mt-8 text-gray-700">
            No posts available in English yet.
          </p>
        )}
      </div>
    </>
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

  const seo = {
    id: {
      title: 'Blog | Agallio Samai',
      description: 'Tulisan-tulisan saya.',
      openGraph: {
        url: 'https://agallio.xyz/blog',
        title: 'Blog | Agallio Samai',
        description: 'Tulisan-tulisan saya.',
        site_name: 'Agallio Samai',
        images: [
          {
            url: 'http://agallio.xyz/images/og-blog.png',
            alt: 'Blog - Agallio Samai',
          },
        ],
      },
      twitter: {
        cardType: 'summary_large_image',
      },
    },
    en: {
      title: 'Blog | Agallio Samai',
      description: 'My writings.',
      openGraph: {
        url: 'https://agallio.xyz/en/blog',
        title: 'Blog | Agallio Samai',
        description: 'My writings.',
        site_name: 'Agallio Samai',
        images: [
          {
            url: 'http://agallio.xyz/images/og-en-blog.png',
            alt: 'Blog - Agallio Samai',
          },
        ],
      },
      twitter: {
        cardType: 'summary_large_image',
      },
    },
  }

  return { props: { posts, seo } }
}
