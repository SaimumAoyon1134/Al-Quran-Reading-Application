export function LoadingSkeleton({
  variant = "card",
  count = 4,
}: {
  variant?: "card" | "list" | "surah";
  count?: number;
}) {
  // simple Tailwind-based skeletons using animate-pulse
  if (variant === "surah") {
    return (
      <div className="reader-shell p-6">
        <div className="mb-6 animate-pulse">
          <div className="h-6 w-40 rounded bg-stone-200" />
          <div className="mt-4 h-10 w-3/4 rounded bg-stone-200" />
          <div className="mt-3 h-8 w-1/3 rounded bg-stone-200" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-md border p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-6 w-16 rounded bg-stone-200" />
                <div className="h-4 w-10 rounded bg-stone-200" />
              </div>
              <div className="h-6 rounded bg-stone-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="reader-shell p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4 animate-pulse">
              <div className="mb-3 h-6 w-28 rounded bg-stone-200" />
              <div className="h-12 rounded bg-stone-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // default card
  return (
    <div className="rounded-lg border p-4 animate-pulse">
      <div className="mb-3 h-6 w-28 rounded bg-stone-200" />
      <div className="h-12 rounded bg-stone-200" />
      <div className="mt-3 h-4 w-1/2 rounded bg-stone-200" />
    </div>
  );
}

export default LoadingSkeleton;
