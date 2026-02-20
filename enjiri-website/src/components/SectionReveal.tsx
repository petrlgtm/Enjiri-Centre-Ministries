"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
