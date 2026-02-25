import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export default defineType({
  name: "ministry",
  title: "Ministry",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Name of the ministry (e.g. "Youth Ministry", "Women\'s Fellowship", "Worship Team")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "URL-friendly identifier — click Generate to auto-create from the title",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "A short summary of what this ministry does (1-2 sentences). Shown on the homepage card.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Choose an icon for the ministry card",
      options: {
        list: [
          { title: "User Group", value: "userGroup" },
          { title: "Heart", value: "heart" },
          { title: "Music", value: "music" },
          { title: "Book", value: "book" },
          { title: "Globe", value: "globe" },
          { title: "Star", value: "star" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Ministry photo — recommended size 800x600px. Used as background on the ministry card.",
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
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      description:
        'Button text on the card (e.g. "Learn More", "Join Us"). Defaults to "Learn More" if left blank.',
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "url",
      description:
        'Where the button links to — can be a page on this site (e.g. "/contact") or an external URL',
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Controls the display order — lower numbers appear first (e.g. 1 = first, 2 = second)",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
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
