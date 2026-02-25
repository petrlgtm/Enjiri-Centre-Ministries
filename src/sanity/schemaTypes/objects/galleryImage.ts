import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Describe the image for screen readers and SEO",
      validation: (rule) =>
        rule.warning("Alt text improves accessibility and SEO"),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the image",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "caption",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No alt text",
        subtitle,
        media,
      };
    },
  },
});
