import { cn } from "@/lib/utils";

interface SectionDividerProps {
  accent?: boolean;
  className?: string;
}

export default function SectionDivider({
  accent = false,
  className,
}: SectionDividerProps) {
  if (accent) {
    return (
      <div className={cn("flex items-center justify-center", className)} aria-hidden="true">
        <span className="h-px w-full max-w-xs bg-gold/15" />
      </div>
    );
  }

  return <div className={className} aria-hidden="true" />;
}
