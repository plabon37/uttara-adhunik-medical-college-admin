"use client";

import {
  Building2,
  Plus,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function DepartmentEmpty() {
  const router = useRouter();

  return (
    <div
      className="
        flex
        min-h-[420px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-12
        text-center
        shadow-sm
      "
    >
      {/* =========================================
          ICON
      ========================================= */}

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-[#E8F7F0]
          text-[#008B45]
        "
      >
        <Building2 size={32} />
      </div>

      {/* =========================================
          TITLE
      ========================================= */}

      <h2
        className="
          mt-6
          text-xl
          font-bold
          text-slate-800
          sm:text-2xl
        "
      >
        No Departments Found
      </h2>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-6
          text-slate-500
          sm:text-base
        "
      >
        Create your first department to
        display academic programs and
        departments on the website.
      </p>

      {/* =========================================
          CREATE BUTTON
      ========================================= */}

      <button
        type="button"
        onClick={() =>
          router.push(
            "/dashboard/home/departments/new"
          )
        }
        className="
          mt-7
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

        Create Department
      </button>
    </div>
  );
}