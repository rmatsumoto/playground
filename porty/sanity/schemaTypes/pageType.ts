import {defineArrayMember, defineField, defineType} from 'sanity'

type SlugDoc = {slug?: {current?: string}}

// The homepage-only sections are noise on every other page, so hide them there.
const isNotHomepage = (document: unknown) =>
  (document as SlugDoc | undefined)?.slug?.current !== 'homepage'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'homepage', title: 'Homepage sections'},
  ],
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subTitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'lastUpdated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      group: 'content',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label above the homepage headline, e.g. "Web Operations — 14 Years".',
      type: 'string',
      group: 'homepage',
      hidden: ({document}) => isNotHomepage(document),
    }),
    defineField({
      name: 'practiceIntro',
      title: 'Practice intro',
      description: 'The large statement that opens the Practice section.',
      type: 'text',
      rows: 3,
      group: 'homepage',
      hidden: ({document}) => isNotHomepage(document),
    }),
    defineField({
      name: 'practice',
      title: 'Practice',
      description: 'Capability cards. Numbered automatically in the order listed.',
      type: 'array',
      group: 'homepage',
      hidden: ({document}) => isNotHomepage(document),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'practiceItem',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        }),
      ],
    }),
    defineField({
      name: 'trajectory',
      title: 'Trajectory',
      description: 'Career history, most recent first.',
      type: 'array',
      group: 'homepage',
      hidden: ({document}) => isNotHomepage(document),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trajectoryItem',
          fields: [
            defineField({
              name: 'company',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'company', subtitle: 'role'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
