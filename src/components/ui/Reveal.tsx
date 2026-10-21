"use client";

import { motion, MotionConfig } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}

/** Fade-and-rise on scroll; with prefers-reduced-motion the movement is dropped and only the fade remains. */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];

  return (
    <MotionConfig reducedMotion="user">
      <Tag
        className={className}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}
