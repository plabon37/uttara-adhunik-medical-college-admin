export default function AboutLoading() {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-100" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-5">
        {/* Image Skeleton */}
        <div className="h-52 w-full animate-pulse rounded-2xl bg-slate-100" />

        {/* Text Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />

          <div className="h-4 w-4/6 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-24 animate-pulse rounded-xl bg-slate-100" />

          <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
        </div>

        {/* Button Skeleton */}
        <div className="h-12 w-40 animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}