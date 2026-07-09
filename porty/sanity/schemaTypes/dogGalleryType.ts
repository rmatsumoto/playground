import {defineField, defineType} from 'sanity'
export const dogGalleryType = defineType({
  name: 'dogGallery',
  title: 'Dog Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})