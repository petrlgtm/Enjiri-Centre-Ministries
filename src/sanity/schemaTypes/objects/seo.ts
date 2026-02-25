import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title for search engines — keep under 60 characters",
      validation: (rule) =>
        rule.max(60).warning("Keep under 60 characters for best SEO results"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Description for search engines — keep under 160 characters",
      validation: (rule) =>
        rule
          .max(160)
          .warning("Keep under 160 characters for best SEO results"),
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      description:
        "Image shown when shared on social media — recommended 1200x630px",
    }),
  ],
});
