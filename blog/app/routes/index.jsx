import { Link, useLoaderData } from 'remix'

import ExternalLink from '~/components/external-link'

import { dayjs, getDatabase } from '~/utils'

export const loader = async () => {
  const database = await getDatabase(process.env.NOTION_DATABASE_ID)
  const filteredDatabase = database.filter(
    (post) =>
      post.properties.Published.checkbox &&
      !post.properties.Slug.rich_text[0].plain_text.includes('id')
  )

  return filteredDatabase
}

export default function Index() {
  const database = useLoaderData()

  return (
    <div>
      <div className="tracking-wide">
        <h1 className="text-3xl font-bold">Agallio Samai</h1>
        <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-300">
          <span role="img" aria-label="Indonesia flag">
            🇮🇩
          </span>{' '}
          A musician who codes
        </p>

        <div className="mt-4 flex">
          <h2 className="mr-6 leading-relaxed font-medium text-lg text-black dark:text-white">
            <ExternalLink href="https://poly.work/agallio">
              Timeline →
            </ExternalLink>
          </h2>
          <h2 className="leading-relaxed font-medium text-lg text-black dark:text-white">
            <ExternalLink href="https://twitter.com/agalliosamai">
              Twitter →
            </ExternalLink>
          </h2>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-zinc-300 dark:border-zinc-700">
        <h2 className="tracking-widest font-bold text-zinc-700 dark:text-zinc-400">
          PROJECTS
        </h2>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://solagif.agallio.xyz">
              solagif →
            </ExternalLink>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Store GIF inside your Solana wallet!
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://bed.ina-covid.com">
              ina-covid-bed →
            </ExternalLink>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Covid bed availability for all provinces in Indonesia
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://freedomlife.id">
              freedomlife →
            </ExternalLink>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            An annual bible reading guide app
          </p>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-zinc-300 dark:border-zinc-700">
        <h2 className="tracking-widest font-bold text-zinc-700 dark:text-zinc-400">
          EXPERIENCES
        </h2>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://traveloka.com">
              Traveloka →
            </ExternalLink>{' '}
            <sup className="text-xs tracking-widest ml-2 text-zinc-500 dark:text-zinc-400">
              NOW
            </sup>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Software Engineer - Web
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            <ExternalLink href="https://privy.id">PrivyID →</ExternalLink>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="mr-1">①</span> Lead Frontend Engineer
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="mr-1">②</span> Senior Frontend Engineer
          </p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            Skyshi
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">Frontend Engineer</p>
        </div>
        <div className="my-6">
          <h3 className="leading-relaxed font-bold text-xl text-black dark:text-white">
            Docotel Group
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">Frontend Engineer</p>
        </div>
      </div>

      <div
        className="mt-10 pt-10 border-t border-zinc-300 dark:border-zinc-700"
        style={{ transition: 'var(--transition-default)' }}
      >
        <h2 className="tracking-widest font-bold text-zinc-700 dark:text-zinc-400">
          WRITINGS
        </h2>
        {database.map((post) => {
          const slug = post.properties.Slug.rich_text[0].plain_text
          const title = post.properties.Name.title[0].plain_text
          const description =
            post.properties.Description.rich_text[0].plain_text
          const date = dayjs(post.properties.Date.date.start, 'YYYY-MM-DD')
            .locale('en')
            .format('DD MMMM YYYY')

          return (
            <div className="my-6" key={post.id}>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {date}
              </span>
              <h3 className="leading-snug my-1 font-bold text-xl text-black dark:text-white">
                <Link to={`/post/${slug}`}>
                  <span className="cursor-pointer hover:underline">
                    {title} →
                  </span>
                </Link>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
