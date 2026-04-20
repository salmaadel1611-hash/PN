export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      readOnly: true,
      initialValue: () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(180)
    },
    {
      name: 'slug',
      title: 'Slug (SEO URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96)
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Content (Rich text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt (Short description)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.max(300)
    },
    {
      name: 'featured_image',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'published_at',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'updated_at',
      title: 'Updated at',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      description: 'Set automatically when created. Use _updatedAt for system-managed update tracking.'
    },
    {
      name: 'reading_time',
      title: 'Reading time (minutes)',
      type: 'number',
      readOnly: true,
      initialValue: 1,
      validation: (Rule: any) => Rule.min(1),
      description: 'Auto-calculated from content word count by the content pipeline.'
    },
    {
      name: 'is_featured',
      title: 'Is featured',
      type: 'boolean',
      initialValue: false
    }
  ]
};
