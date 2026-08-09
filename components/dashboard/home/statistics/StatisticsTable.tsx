"use client";

import StatisticsTableRow, {
  StatisticsData,
} from "@/components/dashboard/home/statistics/StatisticsTableRow";

interface StatisticsTableProps {
  statistics: StatisticsData;
  onDelete: () => void;
}

export default function StatisticsTable({
  statistics,
  onDelete,
}: StatisticsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =========================================
          DESKTOP TABLE
      ========================================= */}

      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full min-w-[1100px] border-collapse">
          {/* =======================================
              TABLE HEADER
          ======================================= */}

          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Background
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Statistic 01
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Statistic 02
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Statistic 03
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Status
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                  sm:px-6
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* =======================================
              TABLE BODY
          ======================================= */}

          <tbody>
            <StatisticsTableRow
              statistics={statistics}
              onDelete={onDelete}
            />
          </tbody>
        </table>
      </div>

      {/* =========================================
          MOBILE / TABLET CARD
      ========================================= */}

      <div className="block divide-y divide-slate-200 md:hidden">
        {/* =======================================
            BACKGROUND IMAGE
        ======================================= */}

        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Background Image
          </p>

          <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {statistics.backgroundImage ? (
              <img
                src={
                  statistics.backgroundImage
                }
                alt="Statistics background"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* =======================================
            STATISTIC ONE
        ======================================= */}

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Statistic 01
          </p>

          <p className="mt-2 text-2xl font-bold text-[#008B45]">
            {statistics.statisticOneValue}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {statistics.statisticOneTitle}
          </p>
        </div>

        {/* =======================================
            STATISTIC TWO
        ======================================= */}

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Statistic 02
          </p>

          <p className="mt-2 text-2xl font-bold text-[#008B45]">
            {statistics.statisticTwoValue}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {statistics.statisticTwoTitle}
          </p>
        </div>

        {/* =======================================
            STATISTIC THREE
        ======================================= */}

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Statistic 03
          </p>

          <p className="mt-2 text-2xl font-bold text-[#008B45]">
            {statistics.statisticThreeValue}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {statistics.statisticThreeTitle}
          </p>
        </div>

        {/* =======================================
            STATUS
        ======================================= */}

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </p>

          <span
            className={`
              mt-2
              inline-flex
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                statistics.isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }
            `}
          >
            {statistics.isActive
              ? "Published"
              : "Draft"}
          </span>
        </div>

        {/* =======================================
            ACTIONS
        ======================================= */}

        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Actions
          </p>

          <div className="w-full">
            <StatisticsTableRow
              statistics={statistics}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}