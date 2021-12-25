import { Fragment, useEffect, useMemo, useState } from 'react'
import { json, Link, redirect, useLoaderData, useParams } from 'remix'
import { highlight, languages } from 'prismjs'

import BlurImage from '~/components/blur-image'
import TranslateIcon from '~/components/icons/translate-icon'

import { dayjs, getDatabase, getPage, getBlocks, getReadingTime } from '~/utils'

export const loader = async ({ params }) => {
  const { slug } = params

  try {
    const database = await getDatabase(process.env.NOTION_DATABASE_ID)

    const pageId = database.find(
      (post) => post.properties.Slug.rich_text[0].plain_text === slug
    ).id

    const page = await getPage(pageId)
    const blocks = await getBlocks(pageId)

    if (!page || !blocks) {
      throw new Response('Not Found', { status: 404 })
    }

    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
    const childBlocks = await Promise.all(
      blocks
        .filter((block) => block.has_children)
        .map(async (block) => {
          return {
            id: block.id,
            children: await getBlocks(block.id),
          }
        })
    )
    const blocksWithChildren = blocks.map((block) => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]['children'] = childBlocks.find(
          (x) => x.id === block.id
        )?.children
      }
      return block
    })

    // return json(
    //   { page, blocks: blocksWithChildren },
    //   {
    //     headers: {
    //       'Cache-Control': 'max-age=3600, stale-while-revalidate=3600',
    //     },
    //   }
    // )
    return { page, blocks: blocksWithChildren }
  } catch {
    throw redirect('/')
  }
}

export function meta({ data }) {
  if (!data) {
    return {
      title: 'Agallio Samai',
      description: '🇮🇩 A musician who codes',
      'og:title': 'Agallio Samai',
      'og:description': '🇮🇩 A musician who codes',
    }
  }

  return {
    title: `${data.page.properties.Name.title[0].plain_text} — Agallio Samai`,
    description: data.page.properties.Description.rich_text[0].plain_text,
    'og:title': data.page.properties.Name.title[0].plain_text,
    'og:description': data.page.properties.Description.rich_text[0].plain_text,
  }
}

export default function Post() {
  const post = useLoaderData()
  const { slug } = useParams()

  const [readingTime, setReadingTime] = useState('')

  const isIndonesian = useMemo(() => slug.includes('id'), [slug])
  const postData = useMemo(
    () => ({
      title: post.page.properties.Name.title[0].plain_text,
      date: post.page.properties.Date.date.start,
      toggleLanguage: post.page.properties.ToggleLanguage.checkbox,
    }),
    [post]
  )

  useEffect(() => {
    const postSectionText = document.getElementById('post').innerText
    setReadingTime(getReadingTime({ isIndonesian, text: postSectionText }))
  }, [])

  return (
    <div>
      <h1 className="font-bold leading-tight tracking-wide text-3xl text-black dark:text-white">
        {postData.title}
      </h1>

      <div className="flex flex-col mt-2">
        <div className="flex justify-between">
          <p className="text-zinc-800 dark:text-zinc-300">
            {dayjs(postData.date, 'YYYY-MM-DD')
              .locale(isIndonesian ? 'id' : 'en')
              .format('DD MMMM YYYY')}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            {readingTime || '———'}
          </p>
        </div>
      </div>

      {postData.toggleLanguage ? (
        <div
          className="flex rounded items-center justify-between w-full my-6 leading-snug text-zinc-700 dark:text-zinc-200"
          style={{
            background:
              'linear-gradient(195deg, #0369A1 0%, #0284C7 48.45%, #10B981 100.02%)',
          }}
        >
          <div className="py-2 pr-2 pl-3 ml-3 flex items-center w-full rounded rounded-l-none justify-between bg-slate-100 dark:bg-slate-800">
            <span className="text-zinc-800 dark:text-zinc-300">
              {isIndonesian ? 'Tersedia dalam' : 'Available in'}{' '}
              <Link
                to={
                  slug.includes('id')
                    ? `/post/${slug.slice(3, slug.length)}`
                    : `/post/id-${slug}`
                }
              >
                <button className="text-black dark:text-white hover:underline">{`Bahasa ${
                  isIndonesian ? 'Inggris' : 'Indonesia'
                }`}</button>
              </Link>
              .
            </span>
            <TranslateIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
      ) : (
        <hr className="my-6 border-zinc-300 dark:border-zinc-600" />
      )}

      <article id="post">
        {post.blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </article>
    </div>
  )
}

function Text({ text, className }) {
  if (!text) return null

  return text.map((value, index) => {
    const {
      annotations: { bold, code, italic, strikethrough, underline },
      text,
    } = value

    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : undefined,
          code
            ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
            : undefined,
          italic ? 'italic' : undefined,
          strikethrough ? 'line-through' : undefined,
          underline ? 'underline' : undefined,
          text.link
            ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
            : undefined,
          className ? className : undefined,
        ]
          .filter((i) => typeof i !== 'undefined')
          .join(' ')}
      >
        {text.link ? (
          <a href={text.link.url} target="_blank" rel="noopener noreferrer">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

function renderBlock(block) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="my-4 leading-7 text-zinc-800 dark:text-zinc-200">
          <Text text={value.text} />
        </p>
      )
    case 'heading_1':
      return value.text.length > 0 ? (
        <h1 className="text-3xl mt-8 mb-4 font-bold">
          {value.text[0].plain_text}
        </h1>
      ) : null
    case 'heading_2':
      return value.text.length > 0 ? (
        <h2 className="text-2xl mt-8 mb-4 font-bold">
          {value.text[0].plain_text}
        </h2>
      ) : null
    case 'heading_3':
      return value.text.length > 0 ? (
        <h3 className="text-xl mt-8 mb-4 font-bold">
          {value.text[0].plain_text}
        </h3>
      ) : null
    case 'image': {
      const src =
        value.type === 'external' ? value.external.url : value.file.url
      const rawCaption = value.caption ? value.caption[0].plain_text : ''
      const caption = rawCaption.replace(/\((.*)\)/g, '')
      const [width, height] = rawCaption
        .match(/\((.*)\)/)
        .pop()
        .split('x')

      return (
        <figure className="my-6">
          <BlurImage src={src} alt={caption} width={width} height={height} />
          {caption && (
            <figcaption className="mt-2 text-xs text-center text-zinc-500 dark:text-zinc-400">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
    case 'code': {
      const { language, text } = value
      const code = text.length > 0 ? text[0].plain_text : ''
      const prismLanguage = languages[language] || languages.javascript

      return (
        <pre className="rounded bg-zinc-800 p-4 overflow-x-auto">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{
              __html: highlight(code, prismLanguage, language),
            }}
          />
        </pre>
      )
    }
    case 'numbered_list_item': {
      const { text, children } = value

      return (
        <li className="mt-4 list-decimal marker:text-zinc-600 marker:dark:text-zinc-400">
          <Text text={text} className={'pl-2'} />
          {children &&
            children.length > 0 &&
            children.map((block, bIndex) => {
              const { type } = block
              const childrenValue = block[type]

              if (type === 'quote') {
                const childrenValueWithoutName = childrenValue.text.filter(
                  (value) => !value.plain_text.includes('—')
                )
                const name = childrenValue.text.filter((value) =>
                  value.plain_text.includes('—')
                )

                return (
                  <blockquote
                    key={bIndex}
                    className="border-l-4 border-zinc-200 ml-7 my-4 pl-4"
                  >
                    {childrenValueWithoutName.map(
                      (subchildValue, subchildIndex) => {
                        const {
                          annotations: {
                            bold,
                            code,
                            italic,
                            strikethrough,
                            underline,
                          },
                          text,
                        } = subchildValue

                        return (
                          <span
                            key={subchildIndex}
                            className={[
                              bold ? 'font-bold' : undefined,
                              code
                                ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                                : undefined,
                              italic ? 'italic' : undefined,
                              strikethrough ? 'line-through' : undefined,
                              underline ? 'underline' : undefined,
                              text.link
                                ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                                : undefined,
                            ]
                              .filter((i) => typeof i !== 'undefined')
                              .join(' ')}
                          >
                            {text.link ? (
                              <a
                                href={text.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {text.content}
                              </a>
                            ) : (
                              text.content
                            )}
                          </span>
                        )
                      }
                    )}

                    {name.map((subchildValue, subchildIndex) => {
                      const {
                        annotations: {
                          bold,
                          code,
                          italic,
                          strikethrough,
                          underline,
                        },
                        text,
                      } = subchildValue

                      return (
                        <figcaption
                          key={subchildIndex}
                          className={[
                            'mt-2',
                            bold ? 'font-bold' : undefined,
                            code
                              ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                              : undefined,
                            italic ? 'italic' : undefined,
                            strikethrough ? 'line-through' : undefined,
                            underline ? 'underline' : undefined,
                            text.link
                              ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                              : undefined,
                          ]
                            .filter((i) => typeof i !== 'undefined')
                            .join(' ')}
                        >
                          {text.link ? (
                            <a
                              href={text.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {text.content}
                            </a>
                          ) : (
                            text.content
                          )}
                        </figcaption>
                      )
                    })}
                  </blockquote>
                )
              }

              return (
                <div key={bIndex} className="pl-7">
                  <p className="mb-4 leading-7 text-zinc-800 dark:text-zinc-200">
                    <Text text={childrenValue.text} />
                  </p>
                </div>
              )
            })}
        </li>
      )
    }
    case 'bulleted_list_item': {
      const { text, children } = value

      return (
        <div className="mt-4 flex relative">
          <div className="absolute w-[0.375em] h-[0.375em] top-[0.6em] rounded-full bg-zinc-600 dark:bg-zinc-400" />
          <div className="pl-6">
            <Text text={text} />
            {children &&
              children.length > 0 &&
              children.map((block, bIndex) => {
                const { type } = block
                const childrenValue = block[type]

                if (type === 'quote') {
                  const childrenValueWithoutName = childrenValue.text.filter(
                    (value) => !value.plain_text.includes('—')
                  )
                  const name = childrenValue.text.filter((value) =>
                    value.plain_text.includes('—')
                  )

                  return (
                    <blockquote
                      key={bIndex}
                      className="border-l-4 border-zinc-200 ml-7 my-4 pl-4"
                    >
                      {childrenValueWithoutName.map(
                        (subchildValue, subchildIndex) => {
                          const {
                            annotations: {
                              bold,
                              code,
                              italic,
                              strikethrough,
                              underline,
                            },
                            text,
                          } = subchildValue

                          return (
                            <span
                              key={subchildIndex}
                              className={[
                                bold ? 'font-bold' : undefined,
                                code
                                  ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                                  : undefined,
                                italic ? 'italic' : undefined,
                                strikethrough ? 'line-through' : undefined,
                                underline ? 'underline' : undefined,
                                text.link
                                  ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                                  : undefined,
                              ]
                                .filter((i) => typeof i !== 'undefined')
                                .join(' ')}
                            >
                              {text.link ? (
                                <a
                                  href={text.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {text.content}
                                </a>
                              ) : (
                                text.content
                              )}
                            </span>
                          )
                        }
                      )}

                      {name.map((subchildValue, subchildIndex) => {
                        const {
                          annotations: {
                            bold,
                            code,
                            italic,
                            strikethrough,
                            underline,
                          },
                          text,
                        } = subchildValue

                        return (
                          <figcaption
                            key={subchildIndex}
                            className={[
                              'mt-2',
                              bold ? 'font-bold' : undefined,
                              code
                                ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                                : undefined,
                              italic ? 'italic' : undefined,
                              strikethrough ? 'line-through' : undefined,
                              underline ? 'underline' : undefined,
                              text.link
                                ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                                : undefined,
                            ]
                              .filter((i) => typeof i !== 'undefined')
                              .join(' ')}
                          >
                            {text.link ? (
                              <a
                                href={text.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {text.content}
                              </a>
                            ) : (
                              text.content
                            )}
                          </figcaption>
                        )
                      })}
                    </blockquote>
                  )
                }

                return (
                  <div key={bIndex} className="">
                    <p className="leading-7 text-zinc-800 dark:text-zinc-200">
                      <Text text={childrenValue.text} />
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      )
    }
    case 'divider':
      return <hr className="my-6 border-zinc-300 dark:border-zinc-600" />
    case 'quote': {
      if (!value.text || value.text.length === 0) return null

      const valueWithoutName = value.text.filter(
        (value) => !value.plain_text.includes('—')
      )
      const name = value.text.filter((value) => value.plain_text.includes('—'))

      return (
        <blockquote className="border-l-4 border-zinc-200 my-4 pl-4">
          {valueWithoutName.map((childValue, childIndex) => {
            const {
              annotations: { bold, code, italic, strikethrough, underline },
              text,
            } = childValue

            return (
              <span
                key={childIndex}
                className={[
                  bold ? 'font-bold' : undefined,
                  code
                    ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                    : undefined,
                  italic ? 'italic' : undefined,
                  strikethrough ? 'line-through' : undefined,
                  underline ? 'underline' : undefined,
                  text.link
                    ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                    : undefined,
                ]
                  .filter((i) => typeof i !== 'undefined')
                  .join(' ')}
              >
                {text.link ? (
                  <a
                    href={text.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text.content}
                  </a>
                ) : (
                  text.content
                )}
              </span>
            )
          })}

          {name.map((childValue, childIndex) => {
            const {
              annotations: { bold, code, italic, strikethrough, underline },
              text,
            } = childValue

            return (
              <figcaption
                key={childIndex}
                className={[
                  'mt-2',
                  bold ? 'font-bold' : undefined,
                  code
                    ? 'font-mono px-2 py-1 rounded text-sm bg-zinc-200 dark:bg-zinc-700'
                    : undefined,
                  italic ? 'italic' : undefined,
                  strikethrough ? 'line-through' : undefined,
                  underline ? 'underline' : undefined,
                  text.link
                    ? 'font-semibold text-emerald-600 hover:underline hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-400'
                    : undefined,
                ]
                  .filter((i) => typeof i !== 'undefined')
                  .join(' ')}
              >
                {text.link ? (
                  <a
                    href={text.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text.content}
                  </a>
                ) : (
                  text.content
                )}
              </figcaption>
            )
          })}
        </blockquote>
      )
    }

    default:
      console.log(type, value)
      return ''
  }
}
