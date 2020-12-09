import Link from 'next/link'
import Head from 'next/head'
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'

// Custom Icons
import FreedomLifeIcon from '~/components/icons/FreedomLife'
import PrivyIcon from '~/components/icons/Privy'

export default function Index() {
  return (
    <>
      <Head>
        <title>Beranda | Agallio Samai</title>
      </Head>
      <Container px="4" py={['28', '32']} maxW="xl">
        <Box>
          <Heading textAlign={['left', 'center']} fontWeight="900" mb={4}>
            Hai, Saya Aga! 👋🏻
          </Heading>
          <Text
            fontSize="lg"
            align={['left', 'center']}
            fontWeight="500"
            lineHeight="2.0"
          >
            Saya seorang Web Engineer, Kreator &amp; Musisi.
            <br />
            Saat ini saya sedang bekerja sebagai seorang Principal Frontend
            Engineer di{' '}
            <Button
              as="a"
              size="sm"
              fontSize="0.9em"
              leftIcon={<PrivyIcon />}
              variant="outline"
              href="https://privy.id"
              target="_blank"
            >
              PrivyID
            </Button>{' '}
            juga membangun produk open-source saya{' '}
            <Button
              as="a"
              size="sm"
              fontSize="0.9em"
              leftIcon={<FreedomLifeIcon />}
              variant="outline"
              href="https://freedomlife.id"
              target="_blank"
            >
              FreedomLife
            </Button>
          </Text>

          <Flex
            direction={['column', 'row']}
            justifyContent="center"
            mt={['6', '28']}
          >
            <Link href="/about">
              <Button
                colorScheme="teal"
                minW={['100%', '25%']}
                mb={['3', '0']}
                mr={4}
              >
                Tentang Saya
              </Button>
            </Link>
            <Button
              as="a"
              href="https://twitter.com/agalliosamai"
              target="_blank"
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
              minW={['100%', '25%']}
            >
              Follow Saya Di Twitter
            </Button>
          </Flex>
        </Box>
      </Container>
    </>
  )
}
