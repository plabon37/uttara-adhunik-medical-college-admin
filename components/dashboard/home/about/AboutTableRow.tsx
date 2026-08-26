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

  // =================================================
  // HANDLE EDIT
  // =================================================

  const handleEdit = () => {
    router.push(`/dashboard/home/about/edit/${about._id}`);
  };

  // =================================================
  // HANDLE DELETE
  // =================================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this About section? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/about", {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete the About section."
        );
      }

      toast.success("About section deleted successfully.");

      onDelete(about._id);
    } catch (error) {
      console.error("DELETE ABOUT ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the About section."
      );
    }
  };

  return (
    <tr className="border-t border-slate-200 bg-white transition-colors hover:bg-slate-50/80">
      {/* =================================================
          LOGO
      ================================================= */}

      <td className="px-5 py-4">
        <div className="flex items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {about.logo ? (
              <img
                src={about.logo}
                alt={`${about.title || "About"} logo`}
                className="h-full w-full object-contain p-1"
              />
            ) : (
              <span className="px-1 text-center text-xs text-slate-400">
                No Logo
              </span>
            )}
          </div>
        </div>
      </td>

      {/* =================================================
          ABOUT INFORMATION
      ================================================= */}

      <td className="px-5 py-4">
        <div className="min-w-[220px] max-w-[300px]">
          <p className="text-sm font-semibold text-slate-800">
            {about.title}

            {about.highlightText && (
              <>
                {" "}
                <span className="text-[#008B45]">
                  {about.highlightText}
                </span>
              </>
            )}
          </p>

          {about.tagline && (
            <p className="mt-1 line-clamp-1 text-sm text-slate-500">
              {about.tagline}
            </p>
          )}
        </div>
      </td>

      {/* =================================================
          MISSION
      ================================================= */}

      <td className="px-5 py-4">
        <div className="max-w-[200px]">
          <p className="line-clamp-2 text-sm font-medium leading-6 text-slate-700">
            {about.missionTitle || "—"}
          </p>
        </div>
      </td>

      {/* =================================================
          VISION
      ================================================= */}

      <td className="px-5 py-4">
        <div className="max-w-[200px]">
          <p className="line-clamp-2 text-sm font-medium leading-6 text-slate-700">
            {about.visionTitle || "—"}
          </p>
        </div>
      </td>

      {/* =================================================
          STATUS
      ================================================= */}

      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            about.isActive
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
              : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10"
          }`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              about.isActive
                ? "bg-emerald-500"
                : "bg-slate-400"
            }`}
          />

          {about.isActive ? "Published" : "Draft"}
        </span>
      </td>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          {/* EDIT */}

          <button
            type="button"
            onClick={handleEdit}
            aria-label="Edit About section"
            title="Edit About"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <Edit size={17} />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete About section"
            title="Delete About"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition-all hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}