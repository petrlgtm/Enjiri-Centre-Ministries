import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Name of the gallery (e.g. "Sunday Worship — January 2026")',
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
      title: "Description",
      type: "text",
      rows: 3,
      description: "A short description of this gallery (1-2 sentences)",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Main image shown on the gallery listing card — recommended 800x600px",
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
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "galleryImage" })],
      description: "Add images to this gallery",
      validation: (rule) => rule.min(1).error("Add at least one image"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Worship", value: "worship" },
          { title: "Events", value: "events" },
          { title: "Outreach", value: "outreach" },
          { title: "Youth", value: "youth" },
          { title: "Community", value: "community" },
        ],
      },
      description: "Category for filtering galleries",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When these photos were taken",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
