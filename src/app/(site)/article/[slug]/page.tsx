import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CalendarDays, Clock3, Facebook, Link as LinkIcon, Linkedin, Share2, Twitter } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { ArticleRichContent } from '@/components/article-rich-content';
import { ReadingProgressBar } from '@/components/reading-progress-bar';
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
  const canonicalUrl = `https://powernews.cc/article/${article.slug}`;

  return (
    <>
      <ReadingProgressBar />

      <article id="article-content" className="container-x py-8 md:py-10">
        <div className="mx-auto max-w-4xl">
          <Link href={`/category/${article.category.slug}`} className="text-sm font-semibold uppercase tracking-wide text-accent">
            {article.category.name}
          </Link>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">{article.title}</h1>
          <p className="mt-4 text-lg text-zinc-600 md:text-xl">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
            <Link href={`/author/${article.author.slug}`} className="font-semibold text-zinc-700">
              {article.author.name}
            </Link>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              {article.readingTime} min read
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <div className="prose-news max-w-none">
              <ArticleRichContent content={article.content} />
            </div>

            <aside className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 lg:sticky lg:top-20">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700">
                <Share2 className="h-4 w-4 text-zinc-500" />
                Share this article
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(article.title)}`}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <Twitter className="h-4 w-4" /> Share on X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <Facebook className="h-4 w-4" /> Share on Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" /> Share on LinkedIn
                </a>
                <a
                  href={canonicalUrl}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <LinkIcon className="h-4 w-4" /> Copy link
                </a>
              </div>
            </aside>
          </div>
        </div>

        <section className="mx-auto mt-12 max-w-5xl border-t border-zinc-200 pt-8">
          <h2 className="text-2xl font-semibold">Related Coverage</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
