import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { projectId, dataset } from "./src/sanity/env";
import {
  structure,
  singletonActions,
  singletonNewDocumentOptions,
} from "./src/sanity/structure";

export default defineConfig({
  name: "enjiri-center-ministries",
  title: "Enjiri Center Ministries International",
  projectId,
  dataset,
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
