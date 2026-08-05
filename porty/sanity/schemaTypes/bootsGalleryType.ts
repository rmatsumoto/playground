import {defineField, defineType} from 'sanity'
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'Image',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
})