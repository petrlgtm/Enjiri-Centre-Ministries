import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isRecurring",
      title: "Is Recurring",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Worship", value: "worship" },
          { title: "Youth", value: "youth" },
          { title: "Outreach", value: "outreach" },
          { title: "Fellowship", value: "fellowship" },
          { title: "Conference", value: "conference" },
        ],
      },
    }),
    defineField({
      name: "rsvpUrl",
      title: "RSVP URL",
      type: "url",
      description: "External link for event registration",
    }),
  ],
  orderings: [
    {
      title: "Date, New",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
    },
  },
});
