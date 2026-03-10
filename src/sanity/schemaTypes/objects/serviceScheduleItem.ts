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
      description: "Select the day of the week",
      options: {
        list: [
          { title: "Sunday", value: "Sunday" },
          { title: "Monday", value: "Monday" },
          { title: "Tuesday", value: "Tuesday" },
          { title: "Wednesday", value: "Wednesday" },
          { title: "Thursday", value: "Thursday" },
          { title: "Friday", value: "Friday" },
          { title: "Saturday", value: "Saturday" },
        ],
      },
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
