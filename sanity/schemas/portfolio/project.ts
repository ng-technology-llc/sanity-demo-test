import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'client',
      title: 'Client',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Client Name',
          type: 'string',
        }),
        defineField({
          name: 'logo',
          title: 'Client Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'website',
          title: 'Client Website',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
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
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'Design', value: 'design' },
          { title: 'Branding', value: 'branding' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'summary',
      title: 'Project Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
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
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'technology' }],
        },
      ],
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'challenge',
              title: 'Challenge',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'solution',
              title: 'Solution',
              type: 'text',
              rows: 3,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Project Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'metric',
              title: 'Metric',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
        }),
        defineField({
          name: 'author',
          title: 'Author',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Author Role',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Project Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Project End Date',
      type: 'date',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on_hold' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show in featured projects section',
      initialValue: false,
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Project URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client.name',
      media: 'coverImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, client, status } = selection
      return {
        ...selection,
        subtitle: `${client || 'Personal'} - ${status}`,
      }
    },
  },
})