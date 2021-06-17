import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
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

import aboutLocale from '@/locales/about'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

const BlogPost = ({ source, frontMatter, locale }) => {
  const getReadingTime = () => {
    const {
      readingTime: { text },
    } = frontMatter

    if (locale === 'id') {
      return `${text.split(' ')[0]} menit membaca`
    } else {
      return text
    }
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
          site_name: aboutLocale.seo[locale].openGraph.site_name,
          images: aboutLocale.seo[locale].openGraph.images,
        }}
        twitter={aboutLocale.seo[locale].twitter}
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
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-800 dark:text-gray-300">
              {frontMatter.author} /{' '}
              {frontMatter.date
                ? dayjs(frontMatter.date, 'DD-MM-YYYY')
                    .locale(locale === 'id' ? 'id' : 'en')
                    .format('dddd, DD MMMM YYYY')
                : '-'}
            </p>
          </div>
          <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
            {getReadingTime()}
          </p>
        </div>
        <p className="block mt-2 text-sm text-gray-500 dark:text-gray-400 sm:hidden">
          {getReadingTime()}
        </p>
        <article className="max-w-2xl mt-14 prose dark:prose-dark">
          <MDXRemote {...source} components={MDXComponents} />
        </article>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params, locale }) => {
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
      locale,
    },
  }
}

export const getStaticPaths = async () => {
  const idPaths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug }, locale: 'id' }))
  const enPaths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug }, locale: 'en' }))

  return {
    paths: [...idPaths, ...enPaths],
    fallback: false,
  }
}

export default BlogPost
