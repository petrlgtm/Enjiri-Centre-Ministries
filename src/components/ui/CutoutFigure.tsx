import Image from "next/image";
import { cn, dimensionsFromUrl } from "@/lib/utils";

interface CutoutFigureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** A background-removed figure standing on a soft gold glow — the home hero's treatment for any dark band. Give it a height. */
export default function CutoutFigure({
  src,
  alt,
  width,
  height,
  sizes = "(min-width: 1024px) 40vw, 80vw",
  priority,
  className,
}: CutoutFigureProps) {
  const dims = width && height ? { width, height } : dimensionsFromUrl(src);
  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      <div aria-hidden className="cutout-glow absolute inset-0" />
      <Image
        src={src}
        alt={alt}
        width={dims.width}
        height={dims.height}
        sizes={sizes}
        priority={priority}
        className="relative h-full w-auto max-w-full object-contain object-bottom"
      />
    </div>
  );
}
