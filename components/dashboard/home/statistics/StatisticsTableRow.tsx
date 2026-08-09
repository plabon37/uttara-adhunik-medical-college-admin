"use client";

import {
  Edit3,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface StatisticsData {
  _id: string;

  backgroundImage: string;

  statisticOneValue: string;
  statisticOneTitle: string;

  statisticTwoValue: string;
  statisticTwoTitle: string;

  statisticThreeValue: string;
  statisticThreeTitle: string;

  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

interface StatisticsTableRowProps {
  statistics: StatisticsData;
  onDelete: () => void;
}

export default function StatisticsTableRow({
  statistics,
  onDelete,
}: StatisticsTableRowProps) {
  const router = useRouter();

  // =========================================
  // DELETE STATISTICS
  // =========================================

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete the Statistics section?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "/api/statistics",
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete Statistics section."
        );
      }

      toast.success(
        "Statistics section deleted successfully."
      );

      onDelete();
    } catch (error) {
      console.error(
        "DELETE STATISTICS ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete Statistics section."
      );
    }
  };

  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50/70">
      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {statistics.backgroundImage ? (
            <Image
              src={
                statistics.backgroundImage
              }
              alt="Statistics background"
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
              No Image
            </div>
          )}
        </div>
      </td>

      {/* =========================================
          STATISTIC ONE
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <div className="min-w-[150px]">
          <p className="text-xl font-bold text-[#008B45]">
            {statistics.statisticOneValue}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-600">
            {statistics.statisticOneTitle}
          </p>
        </div>
      </td>

      {/* =========================================
          STATISTIC TWO
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <div className="min-w-[150px]">
          <p className="text-xl font-bold text-[#008B45]">
            {statistics.statisticTwoValue}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-600">
            {statistics.statisticTwoTitle}
          </p>
        </div>
      </td>

      {/* =========================================
          STATISTIC THREE
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <div className="min-w-[150px]">
          <p className="text-xl font-bold text-[#008B45]">
            {statistics.statisticThreeValue}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-600">
            {statistics.statisticThreeTitle}
          </p>
        </div>
      </td>

      {/* =========================================
          STATUS
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <span
          className={`
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
      </td>

      {/* =========================================
          ACTIONS
      ========================================= */}

      <td className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-end gap-2">
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
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-semibold
              text-slate-600
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            <Edit3 size={15} />

            Edit
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              inline-flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-lg
              border
              border-red-100
              bg-red-50
              px-3
              text-xs
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2 size={15} />

            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}