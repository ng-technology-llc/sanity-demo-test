import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'javascript',
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Tags for improved search',
    }),
    defineField({
      name: 'helpful',
      title: 'Helpful Count',
      type: 'number',
      description: 'Number of users who found this helpful',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'notHelpful',
      title: 'Not Helpful Count',
      type: 'number',
      description: 'Number of users who did not find this helpful',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured FAQs section',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category',
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'Related FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category.title',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, category, featured } = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category || 'Uncategorized',
      }
    },
  },
  orderings: [
    {
      title: 'Category and Order',
      name: 'categoryOrder',
      by: [
        { field: 'category.order', direction: 'asc' },
        { field: 'order', direction: 'asc' },
        { field: 'question', direction: 'asc' },
      ],
    },
    {
      title: 'Most Helpful',
      name: 'mostHelpful',
      by: [{ field: 'helpful', direction: 'desc' }],
    },
    {
      title: 'Recently Updated',
      name: 'recentlyUpdated',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
  ],
})