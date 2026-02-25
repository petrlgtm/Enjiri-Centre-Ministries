import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "churchName",
      title: "Church Name",
      type: "string",
      description: "The official name displayed in the header, footer, and browser tab",
      validation: (rule) => rule.required(),
      initialValue: "Enjiri Center Ministries International",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        'A short motto or mission phrase shown in the hero (e.g. "Preaching Christ in All Nations")',
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description:
        "SEO meta description — appears in Google search results. Keep under 200 characters.",
      validation: (rule) =>
        rule
          .max(200)
          .warning("Keep under 200 characters for best SEO results"),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Church logo — used in the navbar and footer. PNG with transparent background works best.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the logo for screen readers",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Large background image for the homepage hero section — recommended 1920x1080px minimum",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for screen readers",
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description:
        "Physical church address — displayed in the footer and contact section",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description:
        'Contact phone number with country code (e.g. "+250 000 000 000")',
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Main contact email address for the ministry",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "socialLinks",
      description: "Add links to your social media profiles — leave blank to hide",
    }),
    defineField({
      name: "serviceSchedule",
      title: "Service Schedule",
      type: "array",
      description:
        "Add each weekly service — shown on the homepage and services page",
      of: [defineArrayMember({ type: "serviceScheduleItem" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
