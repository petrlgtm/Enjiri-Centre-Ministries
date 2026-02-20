"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  priority?: boolean;
}

export default function ParallaxBackground({
  src,
  alt,
  speed = 0.3,
  className = "",
  priority = false,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const viewH = window.innerHeight;
          if (rect.bottom > 0 && rect.top < viewH) {
            const center = rect.top + rect.height / 2 - viewH / 2;
            setOffset(center * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
        priority={priority}
      />
    </div>
  );
}
