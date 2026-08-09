export default function DepartmentSectionLoading() {
  return (
    <div className="w-full space-y-6">
      {/* =========================================
          HEADER SKELETON
      ========================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />

          <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="h-11 w-36 animate-pulse rounded-xl bg-slate-200" />
      </div>

      {/* =========================================
          CONTENT SKELETON
      ========================================= */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div className="space-y-6 p-6">
          {/* IMAGES */}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="h-56 animate-pulse rounded-2xl bg-slate-200" />

            <div className="h-56 animate-pulse rounded-2xl bg-slate-200" />
          </div>

          {/* TITLE */}

          <div className="space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />

            <div className="h-28 w-full animate-pulse rounded-xl bg-slate-200" />
          </div>

          {/* SEARCH */}

          <div className="space-y-2">
            <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />

            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
          </div>

          {/* COUNT */}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

            <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}