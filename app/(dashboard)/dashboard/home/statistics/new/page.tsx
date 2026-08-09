"use client";

import {
  ArrowLeft,
  BarChart3,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import StatisticsForm, {
  StatisticsFormData,
} from "@/components/dashboard/home/statistics/StatisticsForm";

import StatisticsPreview from "@/components/dashboard/home/statistics/StatisticsPreview";

import type { StatisticsData } from "@/components/dashboard/home/statistics/StatisticsTableRow";

export default function NewStatisticsPage() {
  const router = useRouter();

  // =========================================
  // LIVE PREVIEW DATA
  // =========================================

  const [formData, setFormData] =
    useState<StatisticsFormData>({
      backgroundImage: "",

      statisticOneValue: "",
      statisticOneTitle: "",

      statisticTwoValue: "",
      statisticTwoTitle: "",

      statisticThreeValue: "",
      statisticThreeTitle: "",

      isActive: true,
    });

  // =========================================
  // CREATE SUCCESS
  // =========================================

  const handleSuccess = (
    data: StatisticsData
  ) => {
    console.log(
      "STATISTICS CREATED:",
      data
    );

    toast.success(
      "Statistics section created successfully."
    );

    // =======================================
    // GO TO TABLE PAGE
    // =======================================

    router.push(
      "/dashboard/home/statistics"
    );

    // =======================================
    // FORCE REFRESH
    // =======================================

    router.refresh();
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/home/statistics"
          )
        }
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-600
          transition
          hover:text-[#008B45]
        "
      >
        <ArrowLeft size={17} />

        Back to Statistics
      </button>

      {/* =====================================
          HEADER
      ===================================== */}

      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#E8F7F0]
              text-[#008B45]
            "
          >
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Create Statistics
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Add the three statistics shown
              on the website.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          FORM + PREVIEW
      ===================================== */}

      <div
        className="
          grid
          gap-8
          xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          xl:items-start
        "
      >
        {/* ===================================
            FORM
        =================================== */}

        <div className="min-w-0">
          <StatisticsForm
            onSuccess={handleSuccess}
            onDataChange={setFormData}
          />
        </div>

        {/* ===================================
            LIVE PREVIEW
        =================================== */}

        <div
          className="
            min-w-0
            xl:sticky
            xl:top-6
          "
        >
          <StatisticsPreview
            data={formData}
          />
        </div>
      </div>
    </div>
  );
}