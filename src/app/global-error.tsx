"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#120f0b] text-white font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-4 max-w-md text-lg text-white/60">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            onClick={reset}
            className="mt-8 bg-[#c9a84c] px-8 py-3 text-sm font-semibold text-[#120f0b] transition-all hover:bg-[#c9a84c]/90"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
