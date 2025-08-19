import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Product Review',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Reviewer Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      title: 'Review Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'helpful',
      title: 'Helpful Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'images',
      title: 'Review Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Admin approval for display',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'reviewer',
      subtitle: 'product.title',
      rating: 'rating',
      approved: 'approved',
    },
    prepare(selection) {
      const { title, subtitle, rating, approved } = selection
      return {
        title: `${title} - ${rating}★`,
        subtitle: `${subtitle} ${approved ? '✓' : '⏳'}`,
      }
    },
  },
})