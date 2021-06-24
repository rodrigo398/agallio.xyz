import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import mdxPrism from 'mdx-prism'
import codeTitles from 'remark-code-titles'
import rSlug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'

import MDXComponents from '@/components/MDXComponents'
import TranslateIcon from '@/components/icons/TranslateIcon'

import aboutLocale from '@/locales/about'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

const BlogPost = ({ source, frontMatter, slug }) => {
  const isIndonesian = slug.includes('id')
  const locale = slug.includes('id') ? 'id' : 'en'

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
    return `/blog/${isIndonesian ? '' : 'id-'}${isIndonesian ? enSlug : slug}`
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} | Agallio Samai</title>
      </Head>
      <NextSeo
        title={`${frontMatter.title} | Agallio Samai`}
        description={frontMatter.summary}
        openGraph={{
          url: aboutLocale.seo[locale].openGraph.url,
          title: frontMatter.title,
          description: frontMatter.summary,
          site_name: aboutLocale.seo.en.openGraph.site_name,
          images: aboutLocale.seo[locale].openGraph.images,
        }}
        twitter={aboutLocale.seo.en.twitter}
      />

      <div className="flex flex-col pt-32">
        <h1 className="font-black text-3xl sm:text-4xl dark:text-white">
          {frontMatter.title}
        </h1>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/avatar.webp"
              alt="Agallio Samai"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col ml-3">
              <p className="text-sm text-gray-800 dark:text-gray-300">
                {frontMatter.author} -{' '}
                {frontMatter.posted_date
                  ? dayjs(frontMatter.posted_date, 'DD-MM-YYYY')
                      .locale(isIndonesian ? 'id' : 'en')
                      .format('dddd, DD MMMM YYYY')
                  : '-'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {frontMatter.updated_date
                  ? ` (${
                      isIndonesian ? 'Diperbarui pada' : 'Updated at'
                    } ${dayjs(frontMatter.updated_date, 'DD-MM-YYYY')
                      .locale(isIndonesian ? 'id' : 'en')
                      .format('dddd, DD MMMM YYYY')})`
                  : ''}
              </p>
            </div>
          </div>
          <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
            {getReadingTime()}
          </p>
        </div>
        <p className="block mt-2 text-sm text-gray-500 dark:text-gray-400 sm:hidden">
          {getReadingTime()}
        </p>

        <div className="flex items-center justify-between w-full py-2 px-4 mt-8 mb-6 border-l-[6px] leading-snug bg-gray-100 dark:bg-gray-900 border-green-600 dark:border-green-400 text-gray-700 dark:text-gray-200">
          <span>
            {isIndonesian ? 'Tersedia dalam' : 'Available in'}{' '}
            <Link href={formatHref()}>
              <a className="bouncy-anchor">{`Bahasa ${
                isIndonesian ? 'Inggris' : 'Indonesia'
              }`}</a>
            </Link>
            .
          </span>
          <TranslateIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <article className="max-w-2xl prose dark:prose-dark">
          <MDXRemote {...source} components={MDXComponents} />
        </article>
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
      rehypePlugins: [mdxPrism, rSlug, autolinkHeadings],
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

export default BlogPost
