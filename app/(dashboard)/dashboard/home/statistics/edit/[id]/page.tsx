"use client";

import {
  ArrowLeft,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import StatisticsForm, {
  StatisticsFormData,
} from "@/components/dashboard/home/statistics/StatisticsForm";

import StatisticsPreview from "@/components/dashboard/home/statistics/StatisticsPreview";

import type { StatisticsData } from "@/components/dashboard/home/statistics/StatisticsTableRow";

export default function EditStatisticsPage() {
  const router = useRouter();

  const params = useParams();

  const id = params?.id as string;

  // =========================================
  // EXISTING STATISTICS
  // =========================================

  const [statistics, setStatistics] =
    useState<StatisticsData | null>(
      null
    );

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
  // LOADING
  // =========================================

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH STATISTICS
  // =========================================

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    const loadStatistics = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/statistics",
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (cancelled) {
          return;
        }

        // =====================================
        // API ERROR
        // =====================================

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch Statistics section."
          );
        }

        // =====================================
        // SUCCESS
        // =====================================

        const statisticsData =
          data.data as StatisticsData;

        setStatistics(
          statisticsData
        );

        // =====================================
        // SET FORM DATA
        // =====================================

        setFormData({
          backgroundImage:
            statisticsData.backgroundImage ||
            "",

          statisticOneValue:
            statisticsData.statisticOneValue ||
            "",

          statisticOneTitle:
            statisticsData.statisticOneTitle ||
            "",

          statisticTwoValue:
            statisticsData.statisticTwoValue ||
            "",

          statisticTwoTitle:
            statisticsData.statisticTwoTitle ||
            "",

          statisticThreeValue:
            statisticsData.statisticThreeValue ||
            "",

          statisticThreeTitle:
            statisticsData.statisticThreeTitle ||
            "",

          isActive:
            statisticsData.isActive ??
            true,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH STATISTICS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch Statistics section."
        );

        router.push(
          "/dashboard/home/statistics"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  // =========================================
  // SUCCESS
  // =========================================

  const handleSuccess = (
    updatedData: StatisticsData
  ) => {
    setStatistics(updatedData);

    setFormData({
      backgroundImage:
        updatedData.backgroundImage ||
        "",

      statisticOneValue:
        updatedData.statisticOneValue ||
        "",

      statisticOneTitle:
        updatedData.statisticOneTitle ||
        "",

      statisticTwoValue:
        updatedData.statisticTwoValue ||
        "",

      statisticTwoTitle:
        updatedData.statisticTwoTitle ||
        "",

      statisticThreeValue:
        updatedData.statisticThreeValue ||
        "",

      statisticThreeTitle:
        updatedData.statisticThreeTitle ||
        "",

      isActive:
        updatedData.isActive ??
        true,
    });

    toast.success(
      "Statistics section updated successfully."
    );

    router.push(
      "/dashboard/home/statistics"
    );
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8">
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
            LOADING
        ===================================== */}

        <div className="mt-8 flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col items-center">
            <Loader2
              size={32}
              className="
                animate-spin
                text-[#008B45]
              "
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading Statistics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // DATA NOT FOUND
  // =========================================

  if (!statistics) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8">
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

        <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <BarChart3
            size={42}
            className="text-slate-300"
          />

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            Statistics Not Found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            The Statistics section could
            not be found. Please return to
            the Statistics page and try
            again.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/statistics"
              )
            }
            className="
              mt-6
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#008B45]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#00763B]
            "
          >
            <ArrowLeft size={17} />

            Back to Statistics
          </button>
        </div>
      </div>
    );
  }

  // =========================================
  // EDIT PAGE
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
              Edit Statistics
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Update the Statistics section
              and preview the changes live.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          FORM + LIVE PREVIEW
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
            LEFT - FORM
        =================================== */}

        <div className="min-w-0">
          <StatisticsForm
            initialData={statistics}
            onSuccess={handleSuccess}
            onDataChange={setFormData}
          />
        </div>

        {/* ===================================
            RIGHT - LIVE PREVIEW
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