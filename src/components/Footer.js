import { Flex, IconButton, Link } from '@chakra-ui/react'

import Twitter from './Icons/Twitter'
import GitHub from './Icons/GitHub'
import LinkedIn from './Icons/LinkedIn'
import Email from './Icons/Email'

export default function Footer() {
  return (
    <Flex justifyContent="center" mb={4}>
      <Link href="https://twitter.com/agalliosamai" title="Twitter" isExternal>
        <IconButton
          aria-label="Twitter"
          size="lg"
          color="gray.500"
          icon={<Twitter />}
          variant="ghost"
          mr={2}
        />
      </Link>
      <Link href="https://github.com/agallio" title="GitHub" isExternal>
        <IconButton
          aria-label="GitHub"
          size="lg"
          color="gray.500"
          variant="ghost"
          icon={<GitHub />}
          mr={2}
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/agalliosamai"
        title="LinkedIn"
        isExternal
      >
        <IconButton
          aria-label="LinkedIn"
          size="lg"
          color="gray.500"
          variant="ghost"
          icon={<LinkedIn />}
          mr={2}
        />
      </Link>
      <Link href="mailto:agalliosamai@gmail.com" title="Email" isExternal>
        <IconButton
          aria-label="Email"
          size="lg"
          color="gray.500"
          variant="ghost"
          icon={<Email />}
        />
      </Link>
    </Flex>
  )
}
