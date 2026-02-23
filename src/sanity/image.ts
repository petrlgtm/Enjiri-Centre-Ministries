import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Optimized image URL presets for different contexts.
 * All use auto-format (WebP/AVIF when supported) and appropriate quality.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function heroImage(source: any) {
  return builder
    .image(source)
    .width(1920)
    .height(1080)
    .quality(85)
    .auto("format")
    .fit("crop")
    .url();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cardImage(source: any, width = 800) {
  return builder
    .image(source)
    .width(width)
    .height(Math.round(width * 0.625))
    .quality(80)
    .auto("format")
    .fit("crop")
    .url();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function portraitImage(source: any, width = 600) {
  return builder
    .image(source)
    .width(width)
    .height(Math.round(width * 1.25))
    .quality(80)
    .auto("format")
    .fit("crop")
    .url();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function thumbnailImage(source: any) {
  return builder
    .image(source)
    .width(400)
    .height(225)
    .quality(75)
    .auto("format")
    .fit("crop")
    .url();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logoImage(source: any) {
  return builder
    .image(source)
    .width(200)
    .quality(90)
    .auto("format")
    .fit("max")
    .url();
}
