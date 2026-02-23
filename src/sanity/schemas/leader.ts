import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "leader",
  title: "Leader",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description:
        'Full name with title (e.g. "Evangelist Peter Kalagi", "Pastor Mary")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description:
        'Their position in the ministry (e.g. "President & Founder", "Youth Pastor")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      description:
        "A brief biography — background, ministry journey, and current role. Shown on About page.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Professional headshot or ministry photo — recommended minimum 400x400px",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the photo for screen readers and SEO",
          validation: (rule) =>
            rule.warning("Alt text improves accessibility and SEO"),
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description:
        "Turn on to show this leader in the leadership highlight section on the homepage",
      initialValue: false,
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
