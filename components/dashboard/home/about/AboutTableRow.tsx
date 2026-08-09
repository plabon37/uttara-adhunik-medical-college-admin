"use client";

import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface AboutData {
  _id: string;

  tagline: string;
  title: string;
  highlightText: string;

  descriptionOne: string;
  descriptionTwo: string;

  imageOne: string;
  imageTwo: string;
  logo: string;

  missionTitle: string;
  missionLink: string;

  visionTitle: string;
  visionLink: string;

  buttonText: string;
  buttonLink: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

interface AboutTableRowProps {
  about: AboutData;
  onDelete: (id: string) => void;
}

export default function AboutTableRow({
  about,
  onDelete,
}: AboutTableRowProps) {
  const router = useRouter();

  // =========================================
  // DELETE ABOUT
  // =========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the About section?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(
        "/api/about",
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to delete About section."
        );
      }

      toast.success(
        "About section deleted successfully."
      );

      onDelete(about._id);
    } catch (error) {
      console.error(
        "DELETE ABOUT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete About section."
      );
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <tr className="border-t border-slate-200 transition-colors hover:bg-slate-50">
      {/* =========================================
          LOGO
      ========================================= */}

      <td className="px-5 py-4">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
            {about.logo ? (
              <img
                src={about.logo}
                alt="UAMC Logo"
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs text-slate-400">
                No Logo
              </span>
            )}
          </div>
        </div>
      </td>

      {/* =========================================
          ABOUT
      ========================================= */}

      <td className="px-5 py-4">
        <div className="min-w-[200px]">
          <p className="font-semibold text-slate-800">
            {about.title}{" "}
            <span className="text-[#008B45]">
              {about.highlightText}
            </span>
          </p>

          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
            {about.tagline}
          </p>
        </div>
      </td>

      {/* =========================================
          MISSION
      ========================================= */}

      <td className="px-5 py-4">
        <p className="max-w-[180px] text-sm font-medium text-slate-700">
          {about.missionTitle}
        </p>
      </td>

      {/* =========================================
          VISION
      ========================================= */}

      <td className="px-5 py-4">
        <p className="max-w-[180px] text-sm font-medium text-slate-700">
          {about.visionTitle}
        </p>
      </td>

      {/* =========================================
          STATUS
      ========================================= */}

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            about.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {about.isActive
            ? "Published"
            : "Draft"}
        </span>
      </td>

      {/* =========================================
          ACTIONS
      ========================================= */}

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/about/edit/${about._id}`
              )
            }
            className="
              inline-flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
              transition
              hover:bg-blue-100
            "
            title="Edit About"
          >
            <Edit size={17} />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              inline-flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
              transition
              hover:bg-red-100
            "
            title="Delete About"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}