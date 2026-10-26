import Image from "next/image";
import { cn } from "@/lib/utils";

interface FitImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Sanity asset URLs carry the original size ("…-1600x1066.jpg"); fall back to 3:2 otherwise. */
function dimensionsOf(src: string) {
  const match = src.match(/-(\d+)x(\d+)\.(?:jpe?g|png|webp|gif)/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1200, height: 800 };
}

/** Shows the whole photo at its natural proportions — the frame takes the photo's shape, so nothing is cropped or padded. */
export default function FitImage({ src, alt, sizes, priority, className }: FitImageProps) {
  const { width, height } = dimensionsOf(src);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn("block h-auto w-full", className)}
    />
  );
}
