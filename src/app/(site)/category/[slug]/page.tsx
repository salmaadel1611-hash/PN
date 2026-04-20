import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { getArticlesByCategory, getCategoryBySlug } from '@/lib/content';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const pageSize = 8;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} News`,
    description: category.description
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const pageNumber = Number(page);
  const { featured, items, hasNext } = await getArticlesByCategory(slug, pageNumber, pageSize);

  return (
    <div className="container-x py-8">
      <h1 className="font-serif text-4xl">{category.name}</h1>
      <p className="mt-2 text-zinc-600">{category.description}</p>

      <section className="mt-8 border-b border-zinc-200 pb-8">
        {featured && <ArticleCard article={featured} variant="hero" />}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      <div className="mt-8 flex items-center justify-between text-sm">
        {pageNumber > 1 ? <a href={`?page=${pageNumber - 1}`}>← Previous</a> : <span />}
        {hasNext ? <a href={`?page=${pageNumber + 1}`}>Next →</a> : <span />}
      </div>
    </div>
  );
}
