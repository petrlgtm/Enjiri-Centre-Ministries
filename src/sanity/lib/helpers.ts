import { client } from "@/sanity/client";

export async function fetchSanity<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
