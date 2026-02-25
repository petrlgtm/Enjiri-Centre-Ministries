import { defineField, defineType } from "sanity";

export default defineType({
  name: "serviceScheduleItem",
  title: "Service Schedule Item",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Day",
      type: "string",
      description: 'Day of the week (e.g. "Sunday", "Wednesday")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: 'Time range (e.g. "9:00 AM - 12:00 PM")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "serviceName",
      title: "Service Name",
      type: "string",
      description: 'Name of the service (e.g. "Sunday Worship", "Bible Study")',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "serviceName",
      day: "day",
      time: "time",
    },
    prepare({ title, day, time }) {
      return {
        title: title || "Untitled Service",
        subtitle: `${day || ""} — ${time || ""}`,
      };
    },
  },
});
