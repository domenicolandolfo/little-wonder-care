import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name, e.g. 🌙 or "moon"',
    }),
    defineField({
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'package',
          title: 'Package',
          fields: [
            defineField({ name: 'name', title: 'Package Name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', description: 'e.g. "$150", "From $1,200"' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({
              name: 'features',
              title: 'Included Features',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Each item is one bullet point in the features list.',
            }),
            defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Book Now' }),
            defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string', initialValue: '/contact' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', icon: 'icon' },
    prepare({ title, icon }) {
      return { title: `${icon ?? ''} ${title}`.trim() };
    },
  },
});
