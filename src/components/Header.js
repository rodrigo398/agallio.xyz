import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  IconButton,
  Text,
  theme,
  useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

const NavLinks = ({ activeRoute, isExpanded, setExpanded }) => (
  <>
    <Link href="/">
      <Button
        colorScheme="teal"
        variant="ghost"
        isActive={activeRoute === 'Beranda'}
        w={isExpanded && '100%'}
        mr="2"
        onClick={() => setExpanded(false)}
        minW="120px"
      >
        Beranda
      </Button>
    </Link>

    <Link href="/about">
      <Button
        colorScheme="teal"
        variant="ghost"
        isActive={activeRoute === 'Tentang'}
        w={isExpanded && '100%'}
        mr="2"
        onClick={() => setExpanded(false)}
        minW="120px"
      >
        Tentang
      </Button>
    </Link>

    <Link href="/blog">
      <Button
        colorScheme="teal"
        variant="ghost"
        isActive={activeRoute === 'Blog'}
        w={isExpanded && '100%'}
        onClick={() => setExpanded(false)}
        minW="120px"
      >
        Blog
      </Button>
    </Link>
  </>
)

export default function Header() {
  const router = useRouter()
  const [isExpanded, setExpanded] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = {
    light: 'rgba(255, 255, 255, 0.6)',
    dark: 'rgba(0, 0, 0, 0.6)',
  }

  let activeRoute = ''
  let activePath = ''
  if (router.pathname === '/') {
    activeRoute = 'Beranda'
    activePath = '/'
  }
  if (router.pathname.startsWith('/about')) {
    activeRoute = 'Tentang'
    activePath = '/about'
  }
  if (router.pathname.startsWith('/blog')) {
    activeRoute = 'Blog'
    activePath = '/blog'
  }

  return (
    <>
      <Box
        m="0"
        p="5px 8px 4px"
        pos="fixed"
        top="-1px"
        left="0"
        right="0"
        zIndex="4"
        d={['flex', 'none']}
        alignItems={isExpanded ? 'flex-start' : 'center'}
        flexDir={isExpanded ? 'column' : 'row'}
        pb={isExpanded ? '16px' : '4px'}
      >
        <Box
          pos="absolute"
          w="100%"
          h="100%"
          left="0"
          top="0"
          zIndex="-1"
          boxShadow="0 1px 0px rgba(0, 0, 0, 0.06)"
          backgroundColor={bgColor[colorMode]}
          style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
        />
        {isExpanded ? (
          <>
            <CloseButton
              ml="1"
              my="3"
              zIndex="3"
              colorScheme="teal"
              display={isExpanded ? 'block' : 'none'}
              onClick={() => setExpanded(false)}
              visibility={isExpanded ? 'visible' : 'hidden'}
            />
            <NavLinks
              activeRoute={activeRoute}
              isExpanded={isExpanded}
              setExpanded={setExpanded}
            />
          </>
        ) : (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            py={2}
          >
            <IconButton
              size="sm"
              aria-label="Open Drawer"
              colorScheme="teal"
              variant={colorMode === 'dark' ? 'solid' : 'ghost'}
              icon={<HamburgerIcon />}
              onClick={() => setExpanded(true)}
              ml={1}
            />
            <Link href={activePath}>
              <a>
                <Text p="2">{activeRoute}</Text>
              </a>
            </Link>
            <IconButton
              size="sm"
              aria-label="Toggle dark mode"
              colorScheme="teal"
              variant={colorMode === 'dark' ? 'solid' : 'ghost'}
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              mr={1}
            />
          </Flex>
        )}
      </Box>

      <Box
        m="0"
        p="5px 8px 4px"
        pos="fixed"
        top="-1px"
        left="0"
        right="0"
        zIndex="4"
        display={['none', 'flex']}
        justifyContent="center"
      >
        <Flex
          py={2}
          pos="relative"
          w="100%"
          justifyContent="center"
          justifySelf="center"
          alignItems="center"
          maxW={theme.breakpoints[3]}
          zIndex="3"
        >
          <NavLinks
            activeRoute={activeRoute}
            isExpanded={isExpanded}
            setExpanded={setExpanded}
          />
          <IconButton
            size="md"
            aria-label="Toggle Color Mode"
            colorScheme="teal"
            variant="ghost"
            isActive
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            ml={2}
          />
        </Flex>
        <Box
          pos="absolute"
          w="100%"
          h="100%"
          left="0"
          top="0"
          zIndex="-1"
          boxShadow="0 1px 0 rgba(0, 0, 0, 0.06)"
          backgroundColor={bgColor[colorMode]}
          style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
        />
      </Box>
    </>
  )
}
