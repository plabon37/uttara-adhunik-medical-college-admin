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

export interface DepartmentData {
  _id: string;

  name: string;

  slug: string;

  image: string;

  description?: string;

  isPopular: boolean;

  isActive: boolean;

  order: number;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// PROPS
// =========================================================

interface DepartmentTableRowProps {
  department: DepartmentData;

  onDelete: (
    id: string
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentTableRow({
  department,
  onDelete,
}: DepartmentTableRowProps) {
  const router = useRouter();

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${department.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/departments/${department._id}`,
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
            "Failed to delete Department."
        );
      }

      toast.success(
        "Department deleted successfully."
      );

      onDelete(
        department._id
      );
    } catch (error) {
      console.error(
        "DELETE DEPARTMENT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete Department."
      );
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          DESKTOP ROW
      ===================================================== */}

      <div
        className="
          hidden
          grid-cols-[80px_minmax(220px,1fr)_140px_120px_120px_120px]
          items-center
          gap-4
          border-b
          border-slate-100
          px-6
          py-4
          transition
          hover:bg-slate-50
          lg:grid
        "
      >
        {/* IMAGE */}

        <div
          className="
            h-14
            w-20
            overflow-hidden
            rounded-lg
            border
            border-slate-200
            bg-slate-100
          "
        >
          <img
            src={department.image}
            alt={department.name}
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>

        {/* NAME */}

        <div className="min-w-0">
          <h3
            className="
              truncate
              text-sm
              font-semibold
              text-slate-800
            "
          >
            {department.name}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-xs
              text-slate-400
            "
          >
            /{department.slug}
          </p>
        </div>

        {/* POPULAR */}

        <div>
          {department.isPopular ? (
            <span
              className="
                inline-flex
                rounded-full
                bg-amber-50
                px-3
                py-1
                text-xs
                font-semibold
                text-amber-600
              "
            >
              Popular
            </span>
          ) : (
            <span
              className="
                inline-flex
                rounded-full
                bg-slate-100
                px-3
                py-1
                text-xs
                font-semibold
                text-slate-500
              "
            >
              Regular
            </span>
          )}
        </div>

        {/* ACTIVE */}

        <div>
          {department.isActive ? (
            <span
              className="
                inline-flex
                rounded-full
                bg-emerald-50
                px-3
                py-1
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
                py-1
                text-xs
                font-semibold
                text-red-500
              "
            >
              Inactive
            </span>
          )}
        </div>

        {/* ORDER */}

        <div>
          <span
            className="
              text-sm
              font-medium
              text-slate-600
            "
          >
            {department.order}
          </span>
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2">
          {/* VIEW */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/departments/${department._id}`
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
            title="View Department"
          >
            <Eye size={16} />
          </button>

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/departments/edit/${department._id}`
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
            title="Edit Department"
          >
            <Edit3 size={16} />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-red-100
              bg-red-50
              text-red-500
              transition
              hover:bg-red-100
            "
            title="Delete Department"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET CARD
      ===================================================== */}

      <div
        className="
          border-b
          border-slate-100
          p-5
          transition
          hover:bg-slate-50
          lg:hidden
        "
      >
        <div className="flex gap-4">
          {/* IMAGE */}

          <div
            className="
              h-20
              w-24
              shrink-0
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-slate-100
            "
          >
            <img
              src={department.image}
              alt={department.name}
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>

          {/* CONTENT */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {department.name}
            </h3>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-slate-400
              "
            >
              /{department.slug}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {/* POPULAR */}

              {department.isPopular ? (
                <span
                  className="
                    rounded-full
                    bg-amber-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-amber-600
                  "
                >
                  Popular
                </span>
              ) : (
                <span
                  className="
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-slate-500
                  "
                >
                  Regular
                </span>
              )}

              {/* ACTIVE */}

              {department.isActive ? (
                <span
                  className="
                    rounded-full
                    bg-emerald-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-emerald-600
                  "
                >
                  Active
                </span>
              ) : (
                <span
                  className="
                    rounded-full
                    bg-red-50
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    text-red-500
                  "
                >
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE ACTIONS */}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-400">
            Order: {department.order}
          </span>

          <div className="flex items-center gap-2">
            {/* VIEW */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/dashboard/home/departments/${department._id}`
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:border-[#008B45]
                hover:text-[#008B45]
              "
              title="View Department"
            >
              <Eye size={16} />
            </button>

            {/* EDIT */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/dashboard/home/departments/edit/${department._id}`
                )
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:border-[#008B45]
                hover:text-[#008B45]
              "
              title="Edit Department"
            >
              <Edit3 size={16} />
            </button>

            {/* DELETE */}

            <button
              type="button"
              onClick={handleDelete}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-red-100
                bg-red-50
                text-red-500
                transition
                hover:bg-red-100
              "
              title="Delete Department"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}