import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "testimony",
  title: "Testimony",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description:
        "The testimony in their own words — keep it heartfelt and authentic (2-4 sentences)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'Full name of the person giving the testimony (e.g. "Grace M.")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        'Their role or connection to the ministry (e.g. "Church Member", "Youth Leader", "Volunteer")',
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description: "Optional headshot photo — helps make the testimony more personal",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the photo for screen readers",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Controls the display order — lower numbers appear first (e.g. 1 = first, 2 = second)",
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
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
