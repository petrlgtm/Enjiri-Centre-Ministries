import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import {
  structure,
  singletonActions,
  singletonNewDocumentOptions,
} from "./src/sanity/structure";

export default defineConfig({
  name: "enjiri-center-ministries",
  title: "Enjiri Center Ministries International",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "shcw5txc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, { schemaType }) => {
      const filtered = singletonActions(schemaType);
      if (filtered) {
        return prev.filter(({ action }) => action && filtered.includes(action));
      }
      return prev;
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (option) => singletonNewDocumentOptions(option.templateId),
        );
      }
      return prev;
    },
  },
});
