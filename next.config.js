module.exports = {
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    localeDetection: false,
  },
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
    ],
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
}
