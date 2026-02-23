"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: React.ReactNode;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  icon,
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-medium tracking-wide rounded-full transition-all duration-500 cursor-pointer overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold via-gold-light to-gold text-navy shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_8px_35px_rgba(201,168,76,0.5)] hover:scale-[1.03] active:scale-[0.97]",
    secondary:
      "bg-navy-mid text-foreground shadow-[0_4px_20px_rgba(10,10,10,0.3)] hover:shadow-[0_8px_30px_rgba(10,10,10,0.5)] hover:bg-navy-surface hover:scale-[1.03] active:scale-[0.97]",
    outline:
      "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/80 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_30px_rgba(201,168,76,0.12)]",
    ghost:
      "text-gold hover:bg-gold/5 hover:scale-[1.03] active:scale-[0.97]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm gap-2",
    md: "px-7 py-3 text-sm gap-2.5",
    lg: "px-9 py-4 text-[15px] gap-3",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const inner = (
    <>
      {/* Multi-layer shine overlay on hover */}
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100 ease-out" />
        </>
      )}
      {variant === "outline" && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      )}
      <span className="relative flex items-center gap-2.5">
        {icon && (
          <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.96 }}>
        <Link href={href} className={classes}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      onClick={onClick}
      className={classes}
    >
      {inner}
    </motion.button>
  );
}
