import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: "Have questions or want to learn more? We'd love to hear from you.",
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      initialValue: 'Send us a Message',
    }),
    defineField({
      name: 'infoHeading',
      title: 'Info Heading',
      type: 'string',
      initialValue: 'Contact Information',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The src URL from a Google Maps embed code',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
})
