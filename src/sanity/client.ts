import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, useCdn } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token: process.env.SANITY_API_TOKEN,
});
