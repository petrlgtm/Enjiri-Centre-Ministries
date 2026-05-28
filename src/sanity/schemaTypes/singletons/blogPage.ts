import { DocumentsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'News & Insights',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Stay updated with the latest news, stories, and reflections from Enjiri Center.',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
})
