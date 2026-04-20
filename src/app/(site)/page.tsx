import Link from 'next/link';
import { ArticleCard } from '@/components/article-card';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { SectionHeading } from '@/components/section-heading';
import { getHomepageData } from '@/lib/content';

export const revalidate = 300;

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <div className="container-x py-8">
      <section className="grid gap-6 border-b border-zinc-200 pb-8 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <ArticleCard article={data.hero} variant="hero" />
        </article>
        <aside className="space-y-4">
          <SectionHeading title="Trending" />
          {data.trending.map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </aside>
      </section>

      <section className="py-10">
        <SectionHeading title="Top Stories" />
        <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.topStories.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-y border-zinc-200 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeading title="Latest News" />
          <div className="mt-4 space-y-4">
            {data.latest.map((article) => (
              <ArticleCard key={article.id} article={article} variant="row" />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <SectionHeading title="Editor's Picks" />
            <div className="mt-4 space-y-4">
              {data.editorsPicks.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
          <NewsletterSignup />
        </div>
      </section>

      <section className="py-10">
        <SectionHeading title="Browse by Category" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-md border border-zinc-200 p-5 transition hover:border-accent hover:bg-blue-50"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm text-zinc-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
