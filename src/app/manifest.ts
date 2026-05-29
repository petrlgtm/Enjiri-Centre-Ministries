import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Enjiri Center Ministries International',
    short_name: 'Enjiri Center',
    description: 'Reaching the world with the love of Christ through worship, outreach, teachings, and service.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0f1a',
    theme_color: '#0c0f1a',
    icons: [
      {
        src: '/icon.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
      {
        src: '/apple-icon.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
    ],
  }
}
