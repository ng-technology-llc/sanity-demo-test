import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'department',
  title: 'Department',
  type: 'document',
  icon: () => '👥',
  fields: [
    defineField({
      name: 'name',
      title: 'Department Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'head',
      title: 'Department Head',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'head.name',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `Head: ${subtitle}` : 'No head assigned',
      }
    },
  },
})