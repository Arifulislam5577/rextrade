import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site-config'

const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
] as const satisfies ReadonlyArray<{
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}>

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
