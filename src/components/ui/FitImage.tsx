import Image from "next/image";
import { cn } from "@/lib/utils";

interface FitImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Shows the whole photo inside a fixed-ratio frame, over a blurred copy of itself — nothing is cropped. */
export default function FitImage({ src, alt, sizes, priority, className }: FitImageProps) {
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-125 object-cover blur-2xl brightness-75" />
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-contain", className)} />
    </>
  );
}
