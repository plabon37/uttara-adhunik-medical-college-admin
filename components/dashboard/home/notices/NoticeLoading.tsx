export default function NoticeLoading() {
  return (
    <div className="p-5">
      {/* Search Skeleton */}

      <div className="mb-6">
        <div className="h-12 w-full max-w-md animate-pulse rounded-xl bg-slate-100" />
      </div>

      {/* Desktop Skeleton */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 lg:block">
        <div className="animate-pulse">
          <div className="grid grid-cols-7 gap-4 bg-slate-50 px-6 py-4">
            {Array.from({ length: 7 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-4 rounded bg-slate-200"
                />
              )
            )}
          </div>

          {Array.from({ length: 5 }).map(
            (_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-7 gap-4 border-t border-slate-200 px-6 py-6"
              >
                {Array.from({ length: 7 }).map(
                  (_, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="h-5 rounded bg-slate-100"
                    />
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Skeleton */}

      <div className="space-y-5 lg:hidden">
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                animate-pulse
                space-y-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <div className="h-6 w-4/5 rounded bg-slate-100" />

              <div className="h-4 w-1/3 rounded bg-slate-100" />

              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 rounded-xl bg-slate-100" />
                <div className="h-16 rounded-xl bg-slate-100" />
              </div>

              <div className="h-6 w-1/2 rounded bg-slate-100" />

              <div className="flex gap-3">
                <div className="h-11 flex-1 rounded-xl bg-slate-100" />
                <div className="h-11 flex-1 rounded-xl bg-slate-100" />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}