import {defineArrayMember, defineField, defineType} from 'sanity'

const petTypes = [
  {title: 'Celly', value: 'celly'},
  {title: 'Nanko', value: 'nanko'},
]

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
      name: 'petType',
      title: 'Pet type',
      type: 'string',
      options: {
        list: petTypes,
      },
    }),
    defineField({
      name: 'image',
      title: 'Images',
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
              name: 'comment',
              title: 'Comment',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {media: 'image', comment: 'comment', date: 'date'},
            prepare: ({media, comment, date}) => ({
              media,
              title: comment || 'No comment',
              subtitle: date,
            }),
          },
        }),
      ],
    }),
  ],
})
