const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const pages = await globby([
    'src/pages/*.js',
    'src/posts/*.mdx',
    '!src/pages/_*.js',
    '!src/pages/404.js',
    '!src/pages/api',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src', '')
                  .replace('/', '')
                  .replace('pages', '')
                  .replace('posts', '')
                  .replace('.js', '')
                  .replace('.mdx', '')

                const enRoute = path.split('en-')

                let route
                if (path.split('en-').length > 1) {
                  route = `/en/blog/${enRoute[1]}`
                } else if (path !== '/index' && path !== '/about') {
                  route = `/blog${path}`
                } else {
                  route = path === '/index' ? '' : path
                }

                return `
                        <url>
                            <loc>${`https://agallio.xyz${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
