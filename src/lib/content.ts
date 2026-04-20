import { articles, authors, categories } from '@/data/sample-data';
import { Article } from '@/lib/types';

const sortDesc = (list: Article[]) => [...list].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

export async function getAllArticles() {
  return sortDesc(articles);
}

export async function getAllAuthors() {
  return authors;
}

export async function getAllCategories() {
  return categories;
}

export async function getHomepageData() {
  const sorted = sortDesc(articles);
  const hero = sorted.find((a) => a.featured) ?? sorted[0];
  const withoutHero = sorted.filter((a) => a.id !== hero.id);

  return {
    hero,
    topStories: withoutHero.slice(0, 3),
    latest: sorted.slice(0, 5),
    editorsPicks: sorted.filter((a) => a.category.slug === 'opinion' || a.category.slug === 'economy').slice(0, 3),
    trending: [...sorted].sort((a, b) => b.views - a.views).slice(0, 4),
    categories: categories.filter((c) => ['energy', 'economy', 'companies'].includes(c.slug))
  };
}

export async function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export async function getRelatedArticles(slug: string, categorySlug: string) {
  return sortDesc(articles)
    .filter((a) => a.slug !== slug && (a.category.slug === categorySlug || a.tags.some((t) => ['gas', 'markets', 'policy'].includes(t))))
    .slice(0, 3);
}

export async function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function getArticlesByCategory(slug: string, page = 1, pageSize = 8) {
  const filtered = sortDesc(articles.filter((a) => a.category.slug === slug));
  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    featured,
    items,
    hasNext: start + pageSize < filtered.length
  };
}

export async function getAuthorBySlug(slug: string) {
  return authors.find((a) => a.slug === slug);
}

export async function getArticlesByAuthor(slug: string) {
  return sortDesc(articles.filter((a) => a.author.slug === slug));
}
