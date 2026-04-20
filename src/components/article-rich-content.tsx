import type { PortableTextComponents } from '@portabletext/react';
import { PortableText } from '@portabletext/react';

interface ArticleRichContentProps {
  content: Array<{ _type: string; children?: Array<{ _type: string; text: string }>; style?: string }>;
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold text-zinc-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-accent/80 bg-zinc-50 px-4 py-3 text-lg italic text-zinc-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p>{children}</p>
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-8 text-zinc-700">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-zinc-700">{children}</ol>
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || '#';
      return (
        <a href={href} className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
  }
};

export function ArticleRichContent({ content }: ArticleRichContentProps) {
  return <PortableText value={content} components={components} />;
}
