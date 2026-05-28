import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Services & Events',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Join us for our weekly services and upcoming special events.',
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'scheduleHeading',
      title: 'Schedule Section Heading',
      type: 'string',
      initialValue: 'Weekly Service Schedule',
    }),
    defineField({
      name: 'eventsHeading',
      title: 'Events Section Heading',
      type: 'string',
      initialValue: 'Upcoming Events',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
})
