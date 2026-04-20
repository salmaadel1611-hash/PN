import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { CalendarDays, Clock3, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { getArticleBySlug, getRelatedArticles } from '@/lib/content';
import { formatDate } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.slug, article.category.slug);

  return (
    <article className="container-x py-8">
      <div className="mx-auto max-w-4xl">
        <Link href={`/category/${article.category.slug}`} className="text-sm font-semibold uppercase tracking-wide text-accent">
          {article.category.name}
        </Link>
        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{article.title}</h1>
        <p className="mt-4 text-xl text-zinc-600">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <Link href={`/author/${article.author.slug}`} className="font-semibold text-zinc-700">
            {article.author.name}
          </Link>
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formatDate(article.publishedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" />{article.readingTime} min read</span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose-news mt-8 max-w-none">
          <PortableText value={article.content} />
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-zinc-200 pt-6">
          <Share2 className="h-4 w-4 text-zinc-500" />
          <a href={`https://twitter.com/intent/tweet?url=https://powernews.cc/article/${article.slug}`} className="text-sm hover:text-accent">Share on X</a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://powernews.cc/article/${article.slug}`} className="text-sm hover:text-accent">Share on LinkedIn</a>
        </div>
      </div>

      <section className="mx-auto mt-12 max-w-5xl border-t border-zinc-200 pt-8">
        <h2 className="text-2xl font-semibold">Related Coverage</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
