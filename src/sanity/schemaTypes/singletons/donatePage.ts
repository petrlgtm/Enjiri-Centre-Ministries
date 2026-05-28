import { HeartIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Support Our Mission',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Your generosity helps us continue our work in the community and around the world.',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'portableText',
    }),
    defineField({
      name: 'waysToGiveHeading',
      title: 'Ways to Give Heading',
      type: 'string',
      initialValue: 'Ways to Give',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
})
