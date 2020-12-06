import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import Link from 'next/link'
import mdxPrism from 'mdx-prism'
import codeTitles from 'remark-code-titles'
import rSlug from 'rehype-slug'
import autolinkHeadings from 'rehype-autolink-headings'
import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

// Components
import components from '~/components/MDXComponents'

// Utilities
import { postFilePaths, POSTS_PATH } from '~/utils/mdxUtils'

export default function PostPage({ source, frontMatter }) {
  const { colorMode } = useColorMode()
  const content = hydrate(source, { components })
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  return (
    <>
      <Head>
        <title>{frontMatter.title} | agall.io</title>
      </Head>
      <Container px="4" py="32" maxW="xl" suppressHydrationWarning={true}>
        {process.browser ? (
          <Stack
            as="article"
            spacing={8}
            alignItems="flex-start"
            m="0 auto 4rem auto"
            maxWidth="700px"
            w="100%"
          >
            <Link href="/blog">
              <Button colorScheme="teal" variant="outline">
                Kembali
              </Button>
            </Link>
            <Flex flexDirection="column" maxWidth="700px" w="100%">
              <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
                {frontMatter.title}
              </Heading>
              <Flex
                justify="space-between"
                align={['initial', 'center']}
                direction={['column', 'row']}
                mt={2}
                w="100%"
                mb={4}
              >
                <Flex align="center">
                  <Avatar
                    size="xs"
                    name="Agallio Samai"
                    src="https://github.com/agallio.png"
                    mr={2}
                  />
                  <Text fontSize="sm" color={textColor[colorMode]}>
                    {frontMatter.author} /{' '}
                    {frontMatter.date
                      ? dayjs(frontMatter.date, 'DD-MM-YYYY').format(
                          'dddd, DD MMM YYYY'
                        )
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
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

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
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

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
