import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import mdxPrism from 'mdx-prism'
import codeTitles from 'remark-code-titles'
import rSlug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'

import MDXComponents from '@/components/MDXComponents'

import dayjs from '@/utils/dayjs'
import { postFilePaths, POSTS_PATH } from '@/utils/mdx'

const BlogPost = ({ source, frontMatter, locale }) => {
  const content = hydrate(source, { components: MDXComponents })

  return (
    <>
      <Head>
        <title>{frontMatter.title} | Agallio Samai</title>
      </Head>
      <NextSeo
        title={`${frontMatter.title} | Agallio Samai`}
        description={frontMatter.summary}
        openGraph={{
          url: 'https://agallio.xyz/blog',
          title: frontMatter.title,
          description: frontMatter.summary,
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

      <div className="flex flex-col pt-32">
        <h1 className="font-black text-3xl sm:text-4xl dark:text-white">
          {frontMatter.title}
        </h1>
        <div className="mt-4 flex items-center">
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
        <article className="mt-14 prose dark:prose-dark">{content}</article>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params, locale }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
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
      frontMatter: data,
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
