import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/lato-black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            async
            defer
            data-website-id="006c150d-d681-4d8a-b8c0-5b1342fa4e96"
            src="https://analytics.agallio.xyz/umami.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
