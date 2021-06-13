import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'

import BlogPost from '@/components/BlogPost'

import blogLocale from '@/locales/blog'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

export default function Blog({ posts, locale }) {
  return (
    <>
      <Head>
        <title>Blog | Agallio Samai</title>
      </Head>
      <NextSeo
        title="Blog | Agallio Samai"
        description="Tulisan-tulisan saya."
        openGraph={{
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
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="flex flex-col pt-28">
        <h1 className="mb-4 text-4xl tracking-wide font-black md:text-4xl dark:text-white">
          Blog
        </h1>
        <p className="text-lg md:text-xl mb-4 text-gray-700 dark:text-gray-100">
          {blogLocale.description[locale]}
        </p>

        {locale === 'id' ? (
          posts.filter((item) => !item.filePath.startsWith('en')).length > 0 ? (
            posts
              .filter((item) => !item.filePath.startsWith('en'))
              .sort(
                (a, b) =>
                  new Date(dayjs(b.data.date, 'DD-MM-YYYY').toISOString()) -
                  new Date(dayjs(a.data.date, 'DD-MM-YYYY').toISOString())
              )
              .map((item, index) => (
                <BlogPost
                  key={index}
                  slug={item.filePath.replace(/\.mdx?$/, '')}
                  title={item.data.title}
                  summary={item.data.summary}
                  date={item.data.date}
                />
              ))
          ) : (
            <p>Belum ada tulisan dalam Bahasa Indonesia.</p>
          )
        ) : posts.filter((item) => item.filePath.startsWith('en')).length >
          0 ? (
          posts
            .filter((item) => item.filePath.startsWith('en'))
            .sort(
              (a, b) =>
                new Date(dayjs(b.data.date, 'DD-MM-YYYY').toISOString()) -
                new Date(dayjs(a.data.date, 'DD-MM-YYYY').toISOString())
            )
            .map((item, index) => (
              <BlogPost
                key={index}
                slug={item.filePath.replace(/\.mdx?$/, '')}
                title={item.data.title}
                summary={item.data.summary}
                date={item.data.date}
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

export function getStaticProps({ locale }) {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)
    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts, locale } }
}
