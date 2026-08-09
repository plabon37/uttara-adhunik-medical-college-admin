export default function DepartmentLoading() {
  return (
    <div className="w-full space-y-6">
      {/* =========================================
          HEADER SKELETON
      ========================================= */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />

          <div className="h-4 w-72 animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="h-11 w-40 animate-pulse rounded-xl bg-slate-200" />
      </div>

      {/* =========================================
          TABLE SKELETON
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
        {/* TABLE HEADER */}

        <div
          className="
            hidden
            grid-cols-[80px_minmax(200px,1fr)_180px_120px_120px_100px]
            gap-4
            border-b
            border-slate-200
            bg-slate-50
            px-6
            py-4
            lg:grid
          "
        >
          <div className="h-4 animate-pulse rounded bg-slate-200" />

          <div className="h-4 animate-pulse rounded bg-slate-200" />

          <div className="h-4 animate-pulse rounded bg-slate-200" />

          <div className="h-4 animate-pulse rounded bg-slate-200" />

          <div className="h-4 animate-pulse rounded bg-slate-200" />

          <div className="h-4 animate-pulse rounded bg-slate-200" />
        </div>

        {/* TABLE ROWS */}

        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="
                  flex
                  flex-col
                  gap-4
                  px-6
                  py-5
                  lg:grid
                  lg:grid-cols-[80px_minmax(200px,1fr)_180px_120px_120px_100px]
                  lg:items-center
                  lg:gap-4
                "
              >
                {/* IMAGE */}

                <div className="h-14 w-20 animate-pulse rounded-lg bg-slate-200" />

                {/* NAME */}

                <div className="space-y-2">
                  <div className="h-4 w-52 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
                </div>

                {/* POPULAR */}

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />

                {/* ACTIVE */}

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />

                {/* ORDER */}

                <div className="h-4 w-10 animate-pulse rounded bg-slate-200" />

                {/* ACTIONS */}

                <div className="flex gap-2">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />

                  <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}