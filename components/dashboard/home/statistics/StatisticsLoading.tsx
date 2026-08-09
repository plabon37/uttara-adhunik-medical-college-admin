export default function StatisticsLoading() {
  return (
    <div className="w-full animate-pulse space-y-6">
      {/* =========================================
          HEADER SKELETON
      ========================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="h-8 w-56 rounded-lg bg-slate-200" />

          <div className="h-4 w-72 rounded-lg bg-slate-200" />
        </div>

        <div className="h-11 w-40 rounded-xl bg-slate-200" />
      </div>

      {/* =========================================
          TABLE SKELETON
      ========================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TABLE HEADER */}

        <div className="hidden grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 md:grid">
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
          <div className="h-4 rounded bg-slate-200" />
        </div>

        {/* TABLE ROW */}

        <div className="grid gap-5 px-5 py-6 md:grid-cols-5 md:items-center md:px-6">
          {/* IMAGE */}

          <div className="h-20 w-full rounded-xl bg-slate-200 md:h-16" />

          {/* STATISTIC ONE */}

          <div className="space-y-2">
            <div className="h-6 w-20 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
          </div>

          {/* STATISTIC TWO */}

          <div className="space-y-2">
            <div className="h-6 w-24 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
          </div>

          {/* STATISTIC THREE */}

          <div className="space-y-2">
            <div className="h-6 w-24 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200" />
          </div>

          {/* ACTIONS */}

          <div className="flex gap-2 md:justify-end">
            <div className="h-9 w-20 rounded-lg bg-slate-200" />
            <div className="h-9 w-20 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}