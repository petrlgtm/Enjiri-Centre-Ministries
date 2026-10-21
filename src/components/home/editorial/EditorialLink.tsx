import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline-light" | "outline-dark" | "ink";
  className?: string;
}

/** Square-cornered call to action used across the editorial home sections. */
export default function EditorialLink({ href, children, variant = "gold", className }: EditorialLinkProps) {
  const variants = {
    gold: "bg-gold text-navy hover:bg-gold-light",
    ink: "bg-cream-heading text-cream hover:bg-gold-dark",
    "outline-light": "border border-white/30 text-white hover:border-gold hover:text-gold-light",
    "outline-dark": "border border-cream-heading/40 text-cream-heading hover:border-gold-dark hover:text-gold-dark",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        variants[variant],
        className
      )}
    >
      {children}
      <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
