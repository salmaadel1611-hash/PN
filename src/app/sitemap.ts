import type { MetadataRoute } from 'next';
import { getAllArticles, getAllAuthors, getAllCategories } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, authors, categories] = await Promise.all([getAllArticles(), getAllAuthors(), getAllCategories()]);

  return [
    { url: 'https://powernews.cc', lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    ...articles.map((a) => ({ url: `https://powernews.cc/article/${a.slug}`, lastModified: new Date(a.publishedAt), priority: 0.9 })),
    ...authors.map((a) => ({ url: `https://powernews.cc/author/${a.slug}`, lastModified: new Date(), priority: 0.7 })),
    ...categories.map((c) => ({ url: `https://powernews.cc/category/${c.slug}`, lastModified: new Date(), priority: 0.8 }))
  ];
}
