import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Color', value: 'color' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Image', value: 'image' },
        ],
      },
      initialValue: 'gradient',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'HEX color code',
      hidden: ({ parent }) => parent?.backgroundType !== 'color',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'buttons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'White', value: 'white' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
      media: 'backgroundImage',
    },
    prepare(selection) {
      return {
        ...selection,
        title: `CTA: ${selection.title}`,
      }
    },
  },
})