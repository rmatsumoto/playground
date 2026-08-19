import {defineArrayMember, defineField, defineType} from 'sanity'

type PortableTextBlock = {
  _type: string
  children?: {text?: string}[]
}

const scoreTypes = [
  {title: 'Build Quality', value: 'build_quality'},
  {title: 'Leather', value: 'leather'},
  {title: 'Comfort', value: 'comfort'},
  {title: 'Break In', value: 'break_in'},
  {title: 'Value', value: 'value'},
  {title: 'Aethetic', value: 'aethetic'},
]

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
      name: 'scores',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bootsScore',
          title: 'Boots Score',
          fields: [
            defineField({
              name: 'score',
              type: 'number',
            }),
            defineField({
              name: 'type',
              type: 'string',
              options: {
                list: scoreTypes,
              },
            }),
            defineField({
              name: 'description',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
          preview: {
            select: {score: 'score', type: 'type', description: 'description'},
            prepare: ({score, type, description}) => {
              const blocks: PortableTextBlock[] = Array.isArray(description) ? description : []
              const text = blocks
                .filter((block) => block._type === 'block')
                .map((block) => (block.children || []).map((child) => child.text || '').join(''))
                .join(' ')
                .trim()

              const typeTitle = scoreTypes.find((option) => option.value === type)?.title || type

              return {
                title: [score, typeTitle].filter((part) => part !== undefined).join(' - ') || 'No score',
                subtitle: text.length > 50 ? `${text.slice(0, 50)}...` : text,
              }
            },
          },
        }),
      ]
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