"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import StatisticsLoading from "@/components/dashboard/home/statistics/StatisticsLoading";
import StatisticsEmpty from "@/components/dashboard/home/statistics/StatisticsEmpty";
import StatisticsTable from "@/components/dashboard/home/statistics/StatisticsTable";
import type { StatisticsData } from "@/components/dashboard/home/statistics/StatisticsTableRow";

export default function StatisticsPage() {
  const router = useRouter();

  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // LOAD STATISTICS
  // =========================================

  useEffect(() => {
    let cancelled = false;

    const loadStatistics = async () => {
      try {
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
        // NOT FOUND
        // =====================================

        if (response.status === 404) {
          setStatistics(null);
          setLoading(false);
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

        setStatistics(data.data);
        setLoading(false);
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

        setLoading(false);
      }
    };

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================================
  // DELETE CALLBACK
  // =========================================

  const handleDelete = () => {
    setStatistics(null);
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
        <button
          type="button"
          onClick={() =>
            router.push("/dashboard")
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

          Back to Dashboard
        </button>

        <StatisticsLoading />
      </div>
    );
  }

  // =========================================
  // EMPTY
  // =========================================

  if (!statistics) {
    return (
      <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT */}

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Statistics
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage the Statistics section
              of the website.
            </p>
          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap items-center gap-3">
            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard"
                )
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-slate-600
                shadow-sm
                transition
                hover:border-[#008B45]
                hover:text-[#008B45]
              "
            >
              <ArrowLeft size={17} />

              Back to Dashboard
            </button>

            {/* CREATE */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/home/statistics/new"
                )
              }
              className="
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
                shadow-sm
                transition
                hover:bg-[#00763B]
                hover:shadow-md
              "
            >
              <Plus size={18} />

              Create Statistics
            </button>
          </div>
        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        <StatisticsEmpty />
      </div>
    );
  }

  // =========================================
  // DATA AVAILABLE
  // =========================================

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Statistics
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Manage the Statistics section
            of the website.
          </p>
        </div>

        {/* =====================================
            RIGHT BUTTONS
        ===================================== */}

        <div className="flex flex-wrap items-center gap-3">
          {/* BACK TO DASHBOARD */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard"
              )
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-slate-600
              shadow-sm
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            <ArrowLeft size={17} />

            Back to Dashboard
          </button>

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/statistics/edit/${statistics._id}`
              )
            }
            className="
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
              shadow-sm
              transition
              hover:bg-[#00763B]
              hover:shadow-md
            "
          >
            <Edit3 size={17} />

            Edit Statistics
          </button>
        </div>
      </div>

      {/* =====================================
          STATISTICS TABLE
      ===================================== */}

      <StatisticsTable
        statistics={statistics}
        onDelete={handleDelete}
      />
    </div>
  );
}