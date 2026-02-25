import { defineArrayMember, defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export default defineType({
  name: "charityProgram",
  title: "Outreach Program",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        'Name of the outreach program (e.g. "Gospel Crusades", "Community Outreach")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        "URL-friendly identifier — click Generate to auto-create from the title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "A brief summary shown on the outreach listing card (1-2 sentences).",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Choose an icon for the program card",
      options: {
        list: [
          { title: "Globe", value: "globe" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Heart", value: "heart" },
          { title: "User Group", value: "userGroup" },
          { title: "Academic Cap", value: "academicCap" },
          { title: "Star", value: "star" },
        ],
      },
    }),
    defineField({
      name: "gridSpan",
      title: "Grid Span",
      type: "string",
      description:
        'CSS class for grid layout span. e.g. "sm:col-span-2 sm:row-span-2" for a large card. Leave empty for normal size.',
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for the listing grid card (recommended 600x400px).",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "Large hero image on the detail page (recommended 1200x600px).",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "aboutImage",
      title: "About Section Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for the about section on the detail page.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Full Description",
      type: "portableText",
      description:
        "Rich text body for the detail page — replaces the old plain text long description.",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description (Legacy)",
      type: "text",
      rows: 12,
      description:
        "Plain text fallback — use the Body field above for rich text instead.",
      hidden: true,
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "Program Highlights",
      type: "array",
      of: [defineArrayMember({ type: "highlight" })],
    }),
    defineField({
      name: "scripture",
      title: "Scripture Quote",
      type: "scripture",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      description: 'e.g. "Support Gospel Crusades"',
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      description: "Description text for the call-to-action section.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
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
