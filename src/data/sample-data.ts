import { Article, Author, Category } from '@/lib/types';

export const categories: Category[] = [
  { id: 'c1', name: 'Energy', slug: 'energy', description: 'Oil, gas, renewables, and power investments.' },
  { id: 'c2', name: 'Infrastructure', slug: 'infrastructure', description: 'Transport, logistics, and mega projects shaping Egypt.' },
  { id: 'c3', name: 'Economy', slug: 'economy', description: 'Macroeconomics, regulation, and fiscal policy.' },
  { id: 'c4', name: 'Companies', slug: 'companies', description: 'Corporate performance and strategic moves.' },
  { id: 'c5', name: 'Opinion', slug: 'opinion', description: 'Expert perspectives and market analysis.' }
];

export const authors: Author[] = [
  { id: 'a1', name: 'Nadia Fawzy', slug: 'nadia-fawzy', bio: 'Senior correspondent covering petroleum and upstream markets.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop' },
  { id: 'a2', name: 'Omar El Sherif', slug: 'omar-el-sherif', bio: 'Business editor focused on finance and listed companies.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop' }
];

const paragraph = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }] });

export const articles: Article[] = [
  {
    id: 'p1',
    title: 'Egypt Signs New Mediterranean Gas Exploration Blocks with International Majors',
    slug: 'egypt-mediterranean-gas-exploration-blocks',
    excerpt: 'The ministry announced expanded offshore licensing as part of an export-driven gas strategy.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&auto=format&fit=crop',
    publishedAt: '2026-04-18T08:00:00.000Z',
    readingTime: 6,
    featured: true,
    tags: ['gas', 'upstream'],
    category: categories[0],
    author: authors[0],
    views: 1540,
    content: [
      paragraph('Egypt has awarded new offshore blocks to accelerate natural gas production and attract long-term capital.'),
      paragraph('Officials said the agreements include mandatory investment in seismic studies and exploration drilling over the next two years.'),
      paragraph('Analysts view the move as a signal that Cairo is positioning itself as a regional processing and export hub.')
    ]
  },
  {
    id: 'p2',
    title: 'Suez Canal Logistics Corridor Unveils $2.1B Expansion Blueprint',
    slug: 'suez-canal-logistics-corridor-expansion',
    excerpt: 'A multi-phase plan targets port capacity, warehousing, and rail connectivity.',
    image: 'https://images.unsplash.com/photo-1549897164-26d592fe5fce?w=1400&auto=format&fit=crop',
    publishedAt: '2026-04-17T12:30:00.000Z',
    readingTime: 5,
    tags: ['infrastructure', 'logistics'],
    category: categories[1],
    author: authors[1],
    views: 990,
    content: [paragraph('The expansion program is designed to reduce bottlenecks and strengthen multimodal freight operations.')]
  },
  {
    id: 'p3',
    title: 'Egyptian Blue-Chips Rally on Improved FX Liquidity Expectations',
    slug: 'egypt-blue-chips-rally-fx-liquidity',
    excerpt: 'Banking and industrial names led gains as investors priced in easing currency pressures.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&auto=format&fit=crop',
    publishedAt: '2026-04-16T10:15:00.000Z',
    readingTime: 4,
    tags: ['markets', 'equities'],
    category: categories[3],
    author: authors[1],
    views: 1120,
    content: [paragraph('Turnover rose significantly as domestic institutions added exposure to cyclical sectors.')]
  },
  {
    id: 'p4',
    title: 'Power Grid Modernization Program Prioritizes Industrial Zones in Upper Egypt',
    slug: 'power-grid-modernization-upper-egypt',
    excerpt: 'New substations and smart metering projects are planned to reduce outages and losses.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1400&auto=format&fit=crop',
    publishedAt: '2026-04-15T09:00:00.000Z',
    readingTime: 7,
    tags: ['power', 'industry'],
    category: categories[0],
    author: authors[0],
    views: 870,
    content: [paragraph('Officials announced targeted upgrades in key industrial regions as manufacturing demand climbs.')]
  },
  {
    id: 'p5',
    title: 'Policy Watch: How New Incentives Could Reshape Renewable Financing',
    slug: 'policy-watch-renewable-financing-egypt',
    excerpt: 'Tax reforms and land allocation updates may lower project risk for private developers.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&auto=format&fit=crop',
    publishedAt: '2026-04-14T14:30:00.000Z',
    readingTime: 8,
    tags: ['renewables', 'policy'],
    category: categories[4],
    author: authors[0],
    views: 760,
    content: [paragraph('The latest framework gives clearer timelines and more transparent tariff structures.')]
  }
];
