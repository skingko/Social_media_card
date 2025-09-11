import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/', '/static/']
    },
    sitemap: 'https://www.sm-card.com/sitemap.xml',
    host: 'https://www.sm-card.com'
  }
}
