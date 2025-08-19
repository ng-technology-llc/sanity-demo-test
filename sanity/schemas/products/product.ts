import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
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
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'productCategory' } }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price (for showing discounts)',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Variant Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sku',
              title: 'Variant SKU',
              type: 'string',
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Color Name',
                  type: 'string',
                }),
                defineField({
                  name: 'hex',
                  title: 'HEX Code',
                  type: 'string',
                  validation: (Rule) => Rule.regex(/^#([0-9a-f]{3}){1,2}$/i),
                }),
              ],
            }),
            defineField({
              name: 'price',
              title: 'Variant Price',
              type: 'number',
              description: 'Leave empty to use main product price',
            }),
            defineField({
              name: 'inventory',
              title: 'Inventory',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'available',
              title: 'Available',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              size: 'size',
              color: 'color.name',
              inventory: 'inventory',
            },
            prepare(selection) {
              const { title, size, color, inventory } = selection
              const subtitle = [size, color].filter(Boolean).join(' - ')
              return {
                title,
                subtitle: `${subtitle || 'Standard'} (Stock: ${inventory || 0})`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'inventory',
      title: 'Total Inventory',
      type: 'number',
      description: 'Total stock across all variants',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Draft', value: 'draft' },
          { title: 'Out of Stock', value: 'out_of_stock' },
          { title: 'Discontinued', value: 'discontinued' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show in featured products section',
      initialValue: false,
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      readOnly: true,
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
      status: 'status',
    },
    prepare(selection) {
      const { title, price, status } = selection
      return {
        ...selection,
        subtitle: `$${price} - ${status}`,
      }
    },
  },
})