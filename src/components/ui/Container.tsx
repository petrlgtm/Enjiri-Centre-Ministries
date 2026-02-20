import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
}

export default function Container({
  children,
  className,
  as: Component = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto px-5 sm:px-8 lg:px-12",
        narrow ? "max-w-5xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
