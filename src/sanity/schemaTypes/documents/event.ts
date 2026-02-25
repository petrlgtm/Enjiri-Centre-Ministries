import { defineArrayMember, defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Name of the event as it will appear on the website (e.g. "Sunday Worship Service")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "URL-friendly identifier for event detail pages — click Generate to auto-create",
    }),
    defineField({
      name: "date",
      title: "Start Date",
      type: "datetime",
      description: "When the event starts (date and time)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description:
        "When the event ends — leave blank for single-day events without a set end time",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.date as string | undefined;
          if (
            startDate &&
            endDate &&
            new Date(endDate) < new Date(startDate)
          ) {
            return "End date must be after start date";
          }
          return true;
        }),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description:
        'Where the event takes place (e.g. "Enjiri Center, Main Campus" or "Online")',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "A short summary of the event (1-3 sentences). Shown on event cards.",
    }),
    defineField({
      name: "body",
      title: "Full Details",
      type: "portableText",
      description:
        "Rich text for full event details — schedule, what to bring, etc.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Event cover image — recommended size 800x450px (16:9 ratio)",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for screen readers and SEO",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Choose the type of event — used for filtering on the events page",
      options: {
        list: [
          { title: "Worship", value: "worship" },
          { title: "Youth", value: "youth" },
          { title: "Outreach", value: "outreach" },
          { title: "Fellowship", value: "fellowship" },
          { title: "Conference", value: "conference" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Highlight this event on the homepage with a gold accent",
      initialValue: false,
    }),
    defineField({
      name: "isRecurring",
      title: "Is Recurring",
      type: "boolean",
      description:
        'Turn on for weekly events like Sunday Worship — date will show as "Every Sunday"',
      initialValue: false,
    }),
    defineField({
      name: "rsvpUrl",
      title: "RSVP URL",
      type: "url",
      description:
        "External link for event registration (e.g. Google Form or Eventbrite URL)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Add tags to help categorize this event",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Date, Upcoming",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      location: "location",
      media: "image",
    },
    prepare({ title, date, location, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString()
        : "No date";
      return {
        title,
        subtitle: `${formattedDate}${location ? ` — ${location}` : ""}`,
        media,
      };
    },
  },
});
