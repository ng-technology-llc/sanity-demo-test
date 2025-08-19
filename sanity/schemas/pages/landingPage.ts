import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: () => '📱',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for internal use',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero', title: 'Hero Section' },
        { type: 'features', title: 'Features Section' },
        { type: 'testimonials', title: 'Testimonials Section' },
        { type: 'ctaSection', title: 'CTA Section' },
        {
          type: 'object',
          name: 'richContent',
          title: 'Rich Content Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Number', value: 'number' },
                  ],
                },
                {
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: `Content: ${selection.title || 'Rich Content'}`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'stats',
          title: 'Statistics Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'stats',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'number',
                      title: 'Number',
                      type: 'string',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                    defineField({
                      name: 'suffix',
                      title: 'Suffix',
                      type: 'string',
                      description: 'e.g., "+", "%", "K"',
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: `Stats: ${selection.title || 'Statistics'}`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'logos',
          title: 'Logo Cloud',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
            }),
            defineField({
              name: 'logos',
              title: 'Logos',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    },
                    {
                      name: 'link',
                      type: 'url',
                      title: 'Link',
                    },
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: `Logos: ${selection.title || 'Logo Cloud'}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      return {
        title,
        subtitle: `/${subtitle} - ${status}`,
      }
    },
  },
})