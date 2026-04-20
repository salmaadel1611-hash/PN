import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface Props {
  article: Article;
  variant?: 'default' | 'hero' | 'row' | 'compact';
}

export function ArticleCard({ article, variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className="block rounded-md border border-zinc-200 p-4 hover:border-accent">
        <h3 className="line-clamp-2 text-base font-semibold">{article.title}</h3>
        <p className="mt-2 text-xs text-zinc-500">{formatDate(article.publishedAt)} · {article.readingTime} min</p>
      </Link>
    );
  }

  if (variant === 'row') {
    return (
      <Link href={`/article/${article.slug}`} className="grid gap-4 rounded-md border border-zinc-200 p-3 hover:border-accent sm:grid-cols-[160px_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-accent">{article.category.name}</p>
          <h3 className="mt-1 text-xl font-semibold">{article.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  const hero = variant === 'hero';

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-md ${hero ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        <Image src={article.image} alt={article.title} fill className="object-cover transition group-hover:scale-[1.02]" />
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">{article.category.name}</p>
      <h3 className={`${hero ? 'mt-2 text-3xl' : 'mt-1 text-xl'} font-serif leading-tight`}>{article.title}</h3>
      <p className="mt-2 line-clamp-2 text-zinc-600">{article.excerpt}</p>
      <p className="mt-2 text-sm text-zinc-500">{formatDate(article.publishedAt)} · {article.readingTime} min read</p>
    </Link>
  );
}
