import { siteConfig } from '@/config/site';

export default function sitemap() {
  return [
    {
      url: `${ siteConfig.url }`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
