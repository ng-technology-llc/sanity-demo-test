import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'carousel',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Author Role/Title',
              type: 'string',
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Author Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      return {
        title: `Testimonials: ${selection.title || 'Untitled'}`,
        subtitle: selection.subtitle,
      }
    },
  },
})