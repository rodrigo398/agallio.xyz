import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import mdxPrism from 'mdx-prism'
import codeTitles from 'remark-code-titles'
import rSlug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'
import { Avatar, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

// Components
import components from '~/components/MDXComponents'

// Utilities
import { POSTS_PATH } from '~/utils/mdxUtils'

export default function About({ source, frontMatter }) {
  const content = hydrate(source, { components })

  return (
    <>
      <Head>
        <title>Tentang | Agallio Samai</title>
      </Head>
      <NextSeo
        title="Tentang | Agallio Samai"
        description="Tentang Saya"
        openGraph={{
          url: 'https://agallio.vercel.app/about',
          title: 'Tentang | Agallio Samai',
          description: 'Tentang Saya',
          site_name: 'Agallio Samai',
          images: [
            {
              url: 'http://agallio.vercel.app/images/og-about.png',
              alt: 'Tentang - Agallio Samai',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Container px="4" py="32" maxW="xl" suppressHydrationWarning={true}>
        {process.browser ? (
          <Stack as="article" flexDir="column">
            <Flex alignItems="center" justifyContent="center" flexDir="column">
              <Avatar
                size="2xl"
                src="https://github.com/agallio.png"
                name="Agallio Samai"
                mb={4}
              />
              <Heading mb={2}>{frontMatter.title}</Heading>
              <Text mb={6}>{frontMatter.description}</Text>
            </Flex>
            <main>{content}</main>
          </Stack>
        ) : (
          <div>This page only works in client-side</div>
        )}
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const postFilePath = path.join(POSTS_PATH, 'about.mdx')
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
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
    },
  }
}
