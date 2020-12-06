import Link from 'next/link'
import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'
import dayjs from 'dayjs'

export default function BlogItem({ filePath, data }) {
  const { colorMode } = useColorMode()
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.300',
  }
  const dateTextColor = {
    light: 'gray.500',
    dark: 'gray.400',
  }

  return (
    <Link as={`/blog/${filePath.replace(/\.mdx?$/, '')}`} href="/blog/[slug]">
      <Box
        p={4}
        mb={8}
        cursor="pointer"
        display="block"
        width="100%"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Flex
          w="100%"
          justifyContent="space-between"
          flexDir={['column', 'row']}
        >
          <Heading size="md" as="h3" mb={2} fontWeight="medium">
            {data.title}
          </Heading>
        </Flex>
        <Text color={secondaryTextColor[colorMode]} mb={2}>
          {data.summary}
        </Text>
        <Text fontSize="sm" color={dateTextColor[colorMode]}>
          {dayjs(data.date, 'DD-MM-YYYY').format('dddd, DD MMM YYYY')}
        </Text>
      </Box>
    </Link>
  )
}
