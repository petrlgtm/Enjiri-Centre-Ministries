import { defineArrayMember, defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "About Our Church",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    
    // History Section
    defineField({
      name: "historyTitle",
      title: "History Section Title",
      type: "string",
      initialValue: "A Legacy of Faith & Service",
    }),
    defineField({
      name: "historyText",
      title: "History Text",
      type: "portableText",
    }),
    defineField({
      name: "historyImage",
      title: "History Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "historyStats",
      title: "History Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "number" }),
            defineField({ name: "suffix", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Church Timeline",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "year", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    // Vision & Mission Section
    defineField({
      name: "vision",
      title: "Our Vision",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "scripture", type: "string" }),
      ],
    }),
    defineField({
      name: "mission",
      title: "Our Mission",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "scripture", type: "string" }),
      ],
    }),
    defineField({
      name: "commission",
      title: "Our Commission",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 4 }),
        defineField({ name: "scripture", type: "string" }),
      ],
    }),
    defineField({
      name: "statementOfFaith",
      title: "Statement of Faith",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({
          name: "beliefs",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "coreValues",
      title: "Core Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
