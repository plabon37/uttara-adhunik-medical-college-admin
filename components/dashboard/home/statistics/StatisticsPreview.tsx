"use client";

import {
  BarChart3,
  Trophy,
} from "lucide-react";

import type { StatisticsFormData } from "./StatisticsForm";

interface StatisticsPreviewProps {
  data: StatisticsFormData;
}

export default function StatisticsPreview({
  data,
}: StatisticsPreviewProps) {
  return (
    <div className="w-full">
      {/* =========================================
          PREVIEW HEADER
      ========================================= */}

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview how the Statistics section
          will appear on the website.
        </p>
      </div>

      {/* =========================================
          STATISTICS PREVIEW
      ========================================= */}

      <div
        className="
          relative
          min-h-[430px]
          overflow-hidden
          rounded-2xl
          bg-slate-900
          shadow-lg
        "
      >
        {/* =======================================
            BACKGROUND IMAGE
        ======================================= */}

        {data.backgroundImage ? (
          <img
            src={data.backgroundImage}
            alt="Statistics background preview"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-slate-800
              via-slate-700
              to-slate-900
            "
          >
            <div className="text-center text-white/60">
              <BarChart3
                size={48}
                className="mx-auto"
                strokeWidth={1.2}
              />

              <p className="mt-3 text-sm">
                Background image preview
              </p>
            </div>
          </div>
        )}

        {/* =======================================
            DARK OVERLAY
        ======================================= */}

        <div className="absolute inset-0 bg-black/60" />

        {/* =======================================
            CONTENT
        ======================================= */}

        <div className="relative z-10 flex min-h-[430px] items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-4xl">
            {/* TOP ICON */}

            <div className="mb-10 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm">
                <Trophy
                  size={25}
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* =================================
                STATISTICS GRID
            ================================= */}

            <div className="grid grid-cols-1 divide-y divide-white/30 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {/* =================================
                  STATISTIC ONE
              ================================= */}

              <div className="px-5 py-6 text-center sm:px-7 sm:py-3">
                <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {data.statisticOneValue ||
                    "90%"}
                </p>

                <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-white/80 sm:text-base">
                  {data.statisticOneTitle ||
                    "Post-Graduation Success Rate"}
                </p>
              </div>

              {/* =================================
                  STATISTIC TWO
              ================================= */}

              <div className="px-5 py-6 text-center sm:px-7 sm:py-3">
                <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {data.statisticTwoValue ||
                    "Top 10"}
                </p>

                <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-white/80 sm:text-base">
                  {data.statisticTwoTitle ||
                    "Colleges That Create Futures"}
                </p>
              </div>

              {/* =================================
                  STATISTIC THREE
              ================================= */}

              <div className="px-5 py-6 text-center sm:px-7 sm:py-3">
                <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {data.statisticThreeValue ||
                    "No. 1"}
                </p>

                <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-white/80 sm:text-base">
                  {data.statisticThreeTitle ||
                    "In The Nation For Materials R&D"}
                </p>
              </div>
            </div>

            {/* =================================
                ACTIVE STATUS
            ================================= */}

            <div className="mt-10 flex justify-center">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-medium
                  ${
                    data.isActive
                      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                      : "border-white/20 bg-white/10 text-white/60"
                  }
                `}
              >
                <span
                  className={`
                    h-2
                    w-2
                    rounded-full
                    ${
                      data.isActive
                        ? "bg-emerald-400"
                        : "bg-white/40"
                    }
                  `}
                />

                {data.isActive
                  ? "Published"
                  : "Draft"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}