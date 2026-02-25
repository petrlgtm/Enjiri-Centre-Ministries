import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLinks",
  title: "Social Media Links",
  type: "object",
  fields: [
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      description: "Full Facebook page URL",
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
      description: "YouTube channel URL",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      description: "Instagram profile URL",
    }),
    defineField({
      name: "twitter",
      title: "Twitter / X",
      type: "url",
      description: "Twitter/X profile URL",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",
      description: "TikTok profile URL",
    }),
  ],
});
