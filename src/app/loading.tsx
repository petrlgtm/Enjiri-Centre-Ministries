export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
        <p className="text-sm font-medium tracking-wider text-foreground/50">
          Loading...
        </p>
      </div>
    </div>
  );
}
