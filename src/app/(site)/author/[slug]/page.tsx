import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { getArticlesByAuthor, getAuthorBySlug } from '@/lib/content';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthor(slug);

  return (
    <div className="container-x py-8">
      <section className="flex flex-col items-start gap-5 border-b border-zinc-200 pb-8 sm:flex-row">
        <div className="relative h-20 w-20 overflow-hidden rounded-full">
          <Image src={author.image} alt={author.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{author.name}</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">{author.bio}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </div>
  );
}
