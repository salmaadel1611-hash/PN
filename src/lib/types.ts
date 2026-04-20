export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  tags: string[];
  category: Category;
  author: Author;
  content: Array<{ _type: string; children?: Array<{ _type: string; text: string }>; style?: string }>;
  views: number;
}
