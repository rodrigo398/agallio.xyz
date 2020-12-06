import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import {
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'

// Components
import BlogItem from '~/components/BlogItem'

// Utilities
import { postFilePaths, POSTS_PATH } from '~/utils/mdxUtils'

export default function Blog({ posts }) {
  const { colorMode } = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400',
  }

  return (
    <>
      <Head>
        <title>Blog | agall.io</title>
      </Head>
      <Container px="4" py="32" maxW="xl">
        <Stack
          as="main"
          m="0 auto 4rem auto"
          spacing={8}
          justifyContent="center"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading letterSpacing="tight" mb={3} as="h1" size="2xl">
              Blog
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              Halaman ini berisi tulisan-tulisan saya dari pengalaman saya di
              dunia web engineering, juga dari dunia musik. Tulisan-tulisan ini
              berisi pendapat saya pribadi.
            </Text>
          </Flex>

          <Flex flexDirection="column" w="100%" mt={8}>
            {posts
              .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
              .map((item, index) => (
                <BlogItem key={index} {...item} />
              ))}
          </Flex>
        </Stack>
      </Container>
    </>
  )
}

export function getStaticProps() {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
      const { content, data } = matter(source)

      return {
        content,
        data,
        filePath,
      }
    })
    .filter((item) => item.filePath !== 'about.mdx')

  return { props: { posts } }
}
