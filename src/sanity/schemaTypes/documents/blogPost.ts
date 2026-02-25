import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The blog post headline",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "leader" }],
      description: "Select the author from your leaders list",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "When this post was published",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "A short summary for listing pages and social shares (1-2 sentences)",
      validation: (rule) =>
        rule.max(200).warning("Keep under 200 characters for best results"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Featured image for the blog post — recommended size 1200x630px",
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
      name: "body",
      title: "Body",
      type: "portableText",
      description: "The full blog post content in rich text",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Devotional", value: "devotional" },
          { title: "Testimony", value: "testimony" },
          { title: "Event Recap", value: "event-recap" },
          { title: "Announcement", value: "announcement" },
        ],
      },
      description: "Categorize this post for filtering",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Free-form tags for search and discovery",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this post prominently on the blog listing",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      authorName: "author.name",
      date: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, authorName, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString()
        : "Unpublished";
      return {
        title,
        subtitle: `${authorName || "No author"} — ${formattedDate}`,
        media,
      };
    },
  },
});
