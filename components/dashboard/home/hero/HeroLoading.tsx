export default function HeroLoading() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Search Skeleton */}

      <div className="border-b border-slate-200 p-5">
        <div className="h-12 w-full max-w-sm animate-pulse rounded-xl bg-slate-200" />
      </div>

      {/* Desktop Loading */}

      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Slide</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-slate-200"
              >
                <td className="px-6 py-5">
                  <div className="h-16 w-24 animate-pulse rounded-lg bg-slate-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-5 w-10 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Loading */}

      <div className="space-y-4 p-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="h-44 w-full animate-pulse rounded-xl bg-slate-200" />

            <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 h-8 w-24 animate-pulse rounded-full bg-slate-200" />

            <div className="mt-5 flex gap-3">
              <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}