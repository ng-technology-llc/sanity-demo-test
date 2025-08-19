import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'For nested categories',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      parent: 'parent.title',
    },
    prepare(selection) {
      const { title, parent } = selection
      return {
        ...selection,
        subtitle: parent ? `Parent: ${parent}` : 'Top Level',
      }
    },
  },
})