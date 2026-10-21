import { EarthAmericasIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'charityPage',
  title: 'Charity Page',
  type: 'document',
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Charity Programs',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Making a tangible difference in the lives of those in need through love and action.',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'campaignImage',
      title: 'Featured Campaign Image',
      type: 'image',
      description: 'Photo beside the "I Am A Soul Winner" campaign section',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alternative Text', type: 'string' })],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
})
