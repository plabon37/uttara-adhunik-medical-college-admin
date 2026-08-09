"use client";

import {
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

// =========================================================
// TYPE
// =========================================================

export interface DepartmentSectionData {
  _id: string;

  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// PROPS
// =========================================================

interface DepartmentSectionRowProps {
  section: DepartmentSectionData;

  onDelete: (
    id: string
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSectionRow({
  section,
  onDelete,
}: DepartmentSectionRowProps) {
  const router = useRouter();

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete the Department section?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          "/api/department-section",
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to delete Department section."
        );
      }

      toast.success(
        "Department section deleted successfully."
      );

      onDelete(
        section._id
      );
    } catch (error) {
      console.error(
        "DELETE DEPARTMENT SECTION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete Department section."
      );
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      {/* ===================================================
          TOP CONTENT
      =================================================== */}

      <div className="p-5 sm:p-6">
        {/* =================================================
            IMAGES
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2">
          {/* IMAGE ONE */}

          <div
            className="
              h-48
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-slate-100
              sm:h-56
            "
          >
            <img
              src={section.imageOne}
              alt={`${section.title} image one`}
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>

          {/* IMAGE TWO */}

          <div
            className="
              h-48
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-slate-100
              sm:h-56
            "
          >
            <img
              src={section.imageTwo}
              alt={`${section.title} image two`}
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        </div>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="mt-6">
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            {/* LEFT */}

            <div className="min-w-0">
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                  sm:text-2xl
                "
              >
                {section.title}
              </h2>

              <p
                className="
                  mt-2
                  max-w-3xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {section.description}
              </p>
            </div>

            {/* STATUS */}

            <div className="shrink-0">
              {section.isActive ? (
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-emerald-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-emerald-600
                  "
                >
                  Active
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-red-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-red-500
                  "
                >
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* =================================================
              DETAILS
          ================================================= */}

          <div
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* SEARCH */}

            <div
              className="
                rounded-xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Search Placeholder
              </p>

              <p
                className="
                  mt-2
                  truncate
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                {section.searchPlaceholder}
              </p>
            </div>

            {/* POPULAR */}

            <div
              className="
                rounded-xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Popular Searches
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                {section.popularSearches
                  ?.length || 0}{" "}
                searches
              </p>
            </div>

            {/* COUNT */}

            <div
              className="
                rounded-xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Student Count
              </p>

              <p
                className="
                  mt-2
                  text-lg
                  font-bold
                  text-[#008B45]
                "
              >
                {section.studentCount}
              </p>
            </div>

            {/* COUNT TEXT */}

            <div
              className="
                rounded-xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Count Text
              </p>

              <p
                className="
                  mt-2
                  truncate
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                {section.studentCountText}
              </p>
            </div>
          </div>

          {/* =================================================
              POPULAR SEARCH TAGS
          ================================================= */}

          {section.popularSearches?.length >
            0 && (
            <div className="mt-5">
              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Popular Search Terms
              </p>

              <div className="flex flex-wrap gap-2">
                {section.popularSearches.map(
                  (
                    search,
                    index
                  ) => (
                    <span
                      key={`${search}-${index}`}
                      className="
                        rounded-full
                        bg-[#E8F7F0]
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-[#008B45]
                      "
                    >
                      {search}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================
          ACTION BAR
      =================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-end
          gap-2
          border-t
          border-slate-100
          bg-slate-50/70
          px-5
          py-4
          sm:px-6
        "
      >
        {/* VIEW */}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/dashboard/home/departments/section/preview/${section._id}`
            )
          }
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:border-[#008B45]
            hover:text-[#008B45]
          "
        >
          <Eye size={16} />

          Preview
        </button>

        {/* EDIT */}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/dashboard/home/departments/section/edit/${section._id}`
            )
          }
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:border-[#008B45]
            hover:text-[#008B45]
          "
        >
          <Edit3 size={16} />

          Edit
        </button>

        {/* DELETE */}

        <button
          type="button"
          onClick={
            handleDelete
          }
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            text-sm
            font-semibold
            text-red-500
            transition
            hover:bg-red-100
          "
        >
          <Trash2 size={16} />

          Delete
        </button>
      </div>
    </div>
  );
}