import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Framework', value: 'framework' },
          { title: 'Language', value: 'language' },
          { title: 'Tool', value: 'tool' },
        ],
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'HEX color code',
      validation: (Rule) => Rule.regex(/^#([0-9a-f]{3}){1,2}$/i),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon',
    },
  },
})