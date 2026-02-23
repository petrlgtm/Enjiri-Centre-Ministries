import { defineField, defineType } from "sanity";

export default defineType({
  name: "ministry",
  title: "Ministry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Icon identifier (e.g. users, heart, music)",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      description: "Button text (e.g. Learn More, Join Us)",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
  },
});
