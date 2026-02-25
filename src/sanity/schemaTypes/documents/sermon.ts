import { defineArrayMember, defineField, defineType } from "sanity";
import { MicrophoneIcon } from "@sanity/icons";

export default defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  icon: MicrophoneIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The sermon title as it will appear on the website",
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
      name: "date",
      title: "Date",
      type: "datetime",
      description: "When this sermon was preached",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "speaker",
      title: "Speaker",
      type: "reference",
      to: [{ type: "leader" }],
      description: "Select the speaker from your leaders list",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "string",
      description:
        'If this sermon is part of a series, enter the series name (e.g. "Living by Faith")',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description:
        "A short summary of the sermon (1-3 sentences). Shown on the sermons listing page.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "YouTube or Vimeo link to the sermon video (e.g. https://youtube.com/watch?v=...)",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description: "Direct link to the sermon audio file (MP3 or streaming URL)",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description:
        "Sermon cover image displayed on cards — recommended size 800x450px (16:9 ratio)",
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
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description:
        'Add tags to help people find this sermon (e.g. "faith", "prayer", "healing")',
    }),
    defineField({
      name: "body",
      title: "Sermon Notes",
      type: "portableText",
      description:
        "Full sermon notes or transcript in rich text — shown on the sermon detail page",
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
      speakerName: "speaker.name",
      date: "date",
      media: "thumbnail",
    },
    prepare({ title, speakerName, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString()
        : "No date";
      return {
        title,
        subtitle: `${speakerName || "No speaker"} — ${formattedDate}`,
        media,
      };
    },
  },
});
