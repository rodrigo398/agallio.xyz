import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react'
import { css, Global } from '@emotion/react'

// Components
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import SEO from '~/components/SEO'

// Styles
import theme from '~/styles/theme'
import { prismLightTheme, prismDarkTheme } from '~/styles/prism'

const GlobalStyles = () => {
  const { colorMode } = useColorMode()
  return (
    <Global
      styles={css`
        ${colorMode === 'light' ? prismLightTheme : prismDarkTheme}

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: ${colorMode === 'light' ? 'white' : 'black'};
          color: ${colorMode === 'light' ? 'black' : 'white'};
        }
      `}
    />
  )
}

export default function App({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: false }}>
        <GlobalStyles />
        <SEO />
        {router.pathname !== '/_error' ? (
          <>
            <Header />
            <Component {...pageProps} />
            <Footer />{' '}
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
