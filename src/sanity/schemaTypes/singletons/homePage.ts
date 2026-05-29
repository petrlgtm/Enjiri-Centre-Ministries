import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      description: "Main heading in the hero section",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "string",
      description: "Subheading text below the main heading",
    }),
    defineField({
      name: "heroImages",
      title: "Hero Background Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
          ],
        }),
      ],
      description: "Multiple background images for the homepage hero carousel",
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA",
      type: "cta",
      description: "Primary call-to-action button in the hero",
    }),
    defineField({
      name: "heroSecondaryText",
      title: "Hero Secondary Text",
      type: "string",
      description: 'Secondary link text below the CTA (e.g. "Plan Your Visit")',
    }),
    defineField({
      name: "heroSecondaryUrl",
      title: "Hero Secondary URL",
      type: "string",
      description: "URL for the secondary link",
    }),
    defineField({
      name: "snapshotItems",
      title: "Snapshot Band Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "highlight",
        }),
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
      description: "Quick stats shown in the snapshot band (e.g. Founded, Members)",
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "text",
      rows: 4,
      description: "Mission statement shown in the mission section",
    }),
    defineField({
      name: "visionText",
      title: "Vision Text",
      type: "text",
      rows: 4,
      description: "Vision statement",
    }),
    defineField({
      name: "donateBandHeading",
      title: "Donate Band Heading",
      type: "string",
      description: "Heading for the donate section",
    }),
    defineField({
      name: "donateBandText",
      title: "Donate Band Text",
      type: "text",
      rows: 3,
      description: "Description text in the donate section",
    }),
    defineField({
      name: "missionValues",
      title: "Mission Values",
      type: "array",
      description: "The four key values shown in the mission section",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string" })],
            }),
            defineField({
              name: "link",
              title: "Link URL",
              type: "string",
              description: "Where this card leads to (e.g. /services, /sermons)",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "visitImage",
      title: "Plan Your Visit Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "ctaImage",
      title: "Call to Action Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
