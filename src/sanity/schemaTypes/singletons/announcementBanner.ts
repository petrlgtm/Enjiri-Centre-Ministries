import { defineField, defineType } from "sanity";
import { BellIcon } from "@sanity/icons";

export default defineType({
  name: "announcementBanner",
  title: "Announcement Banner",
  type: "document",
  icon: BellIcon,
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      description: "Toggle the announcement banner on or off",
      initialValue: false,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "string",
      description: "The announcement text — keep it short and clear",
      validation: (rule) =>
        rule.max(120).warning("Keep under 120 characters for mobile readability"),
    }),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description: 'Optional link text (e.g. "Learn More", "Register Now")',
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
      description: "Where the link goes — relative or absolute URL",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Info (Blue)", value: "info" },
          { title: "Warning (Amber)", value: "warning" },
          { title: "Celebration (Gold)", value: "celebration" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description:
        "When the banner should automatically hide — leave blank for no expiry",
    }),
  ],
  preview: {
    select: {
      title: "message",
      enabled: "enabled",
    },
    prepare({ title, enabled }) {
      return {
        title: title || "No message",
        subtitle: enabled ? "Active" : "Disabled",
      };
    },
  },
});
