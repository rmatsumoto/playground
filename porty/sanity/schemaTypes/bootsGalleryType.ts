import {defineArrayMember, defineField, defineType} from 'sanity'
export const bootsGalleryType = defineType({
  name: 'bootsGallery',
  title: 'Boots Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Maker',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Model',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Leather',
      type: 'string',
    }),
    defineField({
      name: 'Last',
      type: 'string',
    }),
    defineField({
      name: 'Sole',
      type: 'string',
    }),
    defineField({
      name: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'Image',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              options: {dateFormat: 'YYYY-MM-DD'},
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {media: 'image', title: 'caption', subtitle: 'date'},
            prepare: ({media, title, subtitle}) => ({
              media,
              title: title || 'Untitled',
              subtitle,
            }),
          },
        }),
      ],
    }),
  ],
})