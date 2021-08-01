import ExternalLink from './ExternalLink'

export default function Footer() {
  return (
    <div
      className="mt-10 pt-10 border-t border-gray-300 dark:border-gray-800"
      style={{ transition: 'var(--transition-default)' }}
    >
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="mailto:me@agallio.xyz">Email →</ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://poly.work/agallio">Timeline →</ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://twitter.com/agalliosamai">
          Twitter →
        </ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://github.com/agallio">GitHub →</ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://www.linkedin.com/in/agalliosamai/">
          LinkedIn →
        </ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://instagram.com/agallio">
          Instagram →
        </ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://www.youtube.com/channel/UCyX8oVNaFtOi0PI98t7EO6g">
          YouTube →
        </ExternalLink>
      </h4>
      <h4 className="my-2 leading-relaxed font-medium text-lg text-black dark:text-white">
        <ExternalLink href="https://soundcloud.com/agalliosamai">
          Soundcloud →
        </ExternalLink>
      </h4>
    </div>
  )
}
