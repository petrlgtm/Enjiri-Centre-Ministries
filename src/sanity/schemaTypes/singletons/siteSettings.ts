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
    defineField({
      name: "defaultHeaderImage",
      title: "Default Page Header Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Fallback background image for page headers (e.g. About, Contact, Charity) — recommended 1920x600px",
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
      name: "sermonsHeaderImage",
      title: "Sermons Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "eventsHeaderImage",
      title: "Events Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "charityHeaderImage",
      title: "Charity Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "blogHeaderImage",
      title: "Blog Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "donateHeaderImage",
      title: "Donate Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "contactHeaderImage",
      title: "Contact Page Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "venueImage",
      title: "Weekly Services Venue Image",
      type: "image",
      options: { hotspot: true },
      description: "Image showing the church venue or congregation for the services section",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "footerMapImage",
      title: "Footer Map Image",
      type: "image",
      options: { hotspot: true },
      description: "Static map or location image shown in the footer",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "globalSeo",
      title: "Global SEO Defaults",
      type: "seo",
      description: "Default SEO settings for pages that don't have their own",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
