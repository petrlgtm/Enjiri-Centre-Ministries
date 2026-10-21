import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface SectionMastheadProps {
  label: string;
  index?: string;
  linkLabel?: string;
  href?: string;
  tone?: "light" | "dark";
}

/** Editorial section opener: square-bullet kicker, optional "see all" link. */
export default function SectionMasthead({
  label,
  index,
  linkLabel,
  href,
  tone = "light",
}: SectionMastheadProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6"
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
          dark ? "text-gold-light" : "text-cream-heading"
        )}
      >
        <span aria-hidden className="inline-block h-2.5 w-2.5 bg-gold" />
        {label}
        {index && (
          <span className={cn("font-mono tracking-normal", dark ? "text-white/40" : "text-cream-muted")}>
            / {index}
          </span>
        )}
      </p>

      {href && linkLabel && (
        <Link
          href={href}
          className={cn(
            "group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
            dark ? "text-white/70 hover:text-gold-light" : "text-cream-body hover:text-gold-dark"
          )}
        >
          {linkLabel}
          <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
