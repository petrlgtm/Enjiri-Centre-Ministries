import { defineField, defineType } from "sanity";

export default defineType({
  name: "scripture",
  title: "Scripture",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Verse Text",
      type: "text",
      rows: 3,
      description: "The scripture passage text",
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      description: 'Book, chapter, and verse (e.g. "Mark 16:15")',
    }),
  ],
  preview: {
    select: {
      title: "reference",
      subtitle: "text",
    },
  },
});
