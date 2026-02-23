import { cn } from "@/lib/utils";

interface SectionDividerProps {
  from?: "dark" | "cream";
  to?: "dark" | "cream";
  accent?: boolean;
  className?: string;
}

const colorMap = {
  dark: "#0a0a0a",
  cream: "#fffbf5",
};

export default function SectionDivider({
  from = "dark",
  to = "dark",
  accent = false,
  className,
}: SectionDividerProps) {
  const fromColor = colorMap[from];
  const toColor = colorMap[to];

  return (
    <div
      className={cn("relative h-12 md:h-16 w-full", className)}
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
      aria-hidden="true"
    >
      {accent && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>
      )}
    </div>
  );
}
