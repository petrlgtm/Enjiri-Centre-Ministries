import Image from "next/image";
import { cn, dimensionsFromUrl } from "@/lib/utils";

interface FitImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Shows the whole photo at its natural proportions — the frame takes the photo's shape, so nothing is cropped or padded. */
export default function FitImage({ src, alt, sizes, priority, className }: FitImageProps) {
  const { width, height } = dimensionsFromUrl(src);
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
