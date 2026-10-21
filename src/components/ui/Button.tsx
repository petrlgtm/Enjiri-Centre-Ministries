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
  disabled?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
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
  disabled = false,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-semibold uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

  const variants = {
    primary: "bg-gold text-navy hover:bg-gold-light",
    secondary: "bg-navy-mid text-foreground hover:bg-navy-surface",
    outline: "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
    ghost: "text-gold hover:bg-gold/5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[11px] gap-2",
    md: "px-7 py-3.5 text-[11px] gap-2.5",
    lg: "px-8 py-4 text-[12px] gap-3",
  };

  const disabledStyles = disabled
    ? "opacity-50 pointer-events-none cursor-not-allowed"
    : "";

  const classes = cn(
    baseStyles, 
    variants[variant], 
    sizes[size], 
    fullWidth ? "w-full flex" : "",
    disabledStyles, 
    className
  );

  const inner = (
    <>
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

  if (href && !disabled) {
    return (
      <motion.div 
        whileTap={{ scale: 0.96 }}
        className={fullWidth ? "w-full" : undefined}
      >
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.96 }}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {inner}
    </motion.button>
  );
}
