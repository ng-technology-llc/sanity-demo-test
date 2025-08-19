import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: () => '👨‍💼',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
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
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
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
    }),
    defineField({
      name: 'role',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{ type: 'department' }],
    }),
    defineField({
      name: 'level',
      title: 'Seniority Level',
      type: 'string',
      options: {
        list: [
          { title: 'Intern', value: 'intern' },
          { title: 'Junior', value: 'junior' },
          { title: 'Mid-Level', value: 'mid' },
          { title: 'Senior', value: 'senior' },
          { title: 'Lead', value: 'lead' },
          { title: 'Manager', value: 'manager' },
          { title: 'Director', value: 'director' },
          { title: 'Executive', value: 'executive' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'skills',
      title: 'Skills & Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Certification Title',
              type: 'string',
            }),
            defineField({
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
            }),
            defineField({
              name: 'date',
              title: 'Date Obtained',
              type: 'date',
            }),
            defineField({
              name: 'expiryDate',
              title: 'Expiry Date',
              type: 'date',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'degree',
              title: 'Degree',
              type: 'string',
            }),
            defineField({
              name: 'field',
              title: 'Field of Study',
              type: 'string',
            }),
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
            }),
            defineField({
              name: 'year',
              title: 'Graduation Year',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        }),
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url',
        }),
        defineField({
          name: 'website',
          title: 'Personal Website',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
        defineField({
          name: 'remote',
          title: 'Remote Worker',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
            }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency',
              type: 'string',
              options: {
                list: [
                  { title: 'Native', value: 'native' },
                  { title: 'Fluent', value: 'fluent' },
                  { title: 'Professional', value: 'professional' },
                  { title: 'Conversational', value: 'conversational' },
                  { title: 'Basic', value: 'basic' },
                ],
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Team Member',
      type: 'boolean',
      description: 'Show in featured team section',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in team listing (lower numbers appear first)',
    }),
    defineField({
      name: 'active',
      title: 'Active Employee',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
      department: 'department.name',
    },
    prepare(selection) {
      const { title, subtitle, department } = selection
      return {
        ...selection,
        subtitle: `${subtitle} - ${department || 'No Department'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
})