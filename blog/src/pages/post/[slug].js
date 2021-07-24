import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import mdxPrism from 'mdx-prism'
import codeTitles from 'remark-code-titles'
import rSlug from 'rehype-slug'

import MDXComponents from '@/components/MDXComponents'
import TranslateIcon from '@/components/icons/TranslateIcon'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

export default function PostPage({ source, frontMatter, slug }) {
  const isIndonesian = slug.includes('id')

  const getReadingTime = () => {
    const {
      readingTime: { text },
    } = frontMatter
    const minute = text.split(' ')[0]

    if (isIndonesian) {
      return `${minute} menit membaca`
    } else {
      return `${minute} ${Number(minute) > 1 ? 'mins' : 'min'} read`
    }
  }

  const formatHref = () => {
    const enSlug = slug.replace('id-', '')
    return `/post/${isIndonesian ? '' : 'id-'}${isIndonesian ? enSlug : slug}`
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} –– Agallio Samai</title>
      </Head>
      <NextSeo
        title={`${frontMatter.title} | Agallio Samai`}
        description={frontMatter.summary}
      />

      <div>
        <h1 className="text-black font-bold leading-tight tracking-wide text-3xl dark:text-white">
          {frontMatter.title}
        </h1>

        <div className="flex flex-col mt-4">
          <div className="flex justify-between">
            <p className="text-gray-800 dark:text-gray-300">
              {frontMatter.posted_date
                ? dayjs(frontMatter.posted_date, 'DD-MM-YYYY')
                    .locale(isIndonesian ? 'id' : 'en')
                    .format('DD MMMM YYYY')
                : '-'}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {getReadingTime()}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {frontMatter.updated_date
              ? ` (${isIndonesian ? 'Diperbarui pada' : 'Updated at'} ${dayjs(
                  frontMatter.updated_date,
                  'DD-MM-YYYY'
                )
                  .locale(isIndonesian ? 'id' : 'en')
                  .format('DD MMMM YYYY')})`
              : ''}
          </p>

          <div
            className="flex items-center justify-between w-full my-6 leading-snug text-gray-700 dark:text-gray-200"
            style={{
              background:
                'linear-gradient(195deg, #0369A1 0%, #0284C7 48.45%, #10B981 100.02%)',
            }}
          >
            <div
              className="py-2 pr-2 pl-3 flex items-center w-full ml-3 justify-between bg-gray-100 dark:bg-gray-900"
              style={{ transition: 'var(--transition-default)' }}
            >
              <span className="text-gray-700 dark:text-gray-300">
                {isIndonesian ? 'Tersedia dalam' : 'Available in'}{' '}
                <Link href={formatHref()} passHref>
                  <button className="text-black dark:text-white hover:underline">{`Bahasa ${
                    isIndonesian ? 'Inggris' : 'Indonesia'
                  }`}</button>
                </Link>
                .
              </span>
              <TranslateIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <article className="prose dark:prose-dark">
            <MDXRemote {...source} components={MDXComponents} />
          </article>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [codeTitles],
      rehypePlugins: [mdxPrism, rSlug],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: { readingTime: readingTime(content), ...data },
      slug: params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
