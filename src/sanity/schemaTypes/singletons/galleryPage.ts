import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Gallery',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Visual highlights of our church life, events, and community impact.',
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
