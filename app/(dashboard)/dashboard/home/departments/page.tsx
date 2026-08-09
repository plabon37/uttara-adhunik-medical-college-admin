"use client";

import {
  ArrowLeft,
  Building2,
  Plus,
} from "lucide-react";

import {
  startTransition,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DepartmentLoading from "@/components/dashboard/home/departments/DepartmentLoading";
import DepartmentEmpty from "@/components/dashboard/home/departments/DepartmentEmpty";
import DepartmentTable from "@/components/dashboard/home/departments/DepartmentTable";

import type {
  DepartmentData,
} from "@/components/dashboard/home/departments/DepartmentTableRow";

// =========================================================
// PAGE
// =========================================================

export default function DepartmentsPage() {
  const router = useRouter();

  // =======================================================
  // STATE
  // =======================================================

  const [departments, setDepartments] =
    useState<DepartmentData[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // LOAD DEPARTMENTS
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadDepartments = async () => {
      try {
        const response = await fetch(
          "/api/departments",
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        // =================================================
        // COMPONENT UNMOUNTED
        // =================================================

        if (cancelled) {
          return;
        }

        // =================================================
        // API ERROR
        // =================================================

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch Departments."
          );
        }

        // =================================================
        // SUCCESS
        // =================================================

        startTransition(() => {
          setDepartments(
            Array.isArray(data.data)
              ? data.data
              : []
          );

          setLoading(false);
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH DEPARTMENTS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch Departments."
        );

        startTransition(() => {
          setDepartments([]);
          setLoading(false);
        });
      }
    };

    loadDepartments();

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // DELETE CALLBACK
  // =======================================================

  const handleDelete = (
    id: string
  ) => {
    setDepartments(
      (currentDepartments) =>
        currentDepartments.filter(
          (department) =>
            department._id !== id
        )
    );
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {/* ================================================
            BACK BUTTON
        ================================================ */}

        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="
            mb-6
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

          Back
        </button>

        {/* ================================================
            LOADING
        ================================================ */}

        <DepartmentLoading />
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (
    departments.length === 0
  ) {
    return (
      <div
        className="
          w-full
          space-y-6
          p-4
          sm:p-6
          lg:p-8
        "
      >
        {/* ================================================
            BACK BUTTON
        ================================================ */}

        <button
          type="button"
          onClick={() =>
            router.back()
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

          Back
        </button>

        {/* ================================================
            HEADER
        ================================================ */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* LEFT */}

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
                <Building2 size={22} />
              </div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  sm:text-3xl
                "
              >
                Departments
              </h1>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                sm:text-base
              "
            >
              Manage all academic departments
              available on the website.
            </p>
          </div>

          {/* CREATE BUTTON */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/departments/new"
              )
            }
            className="
              inline-flex
              min-h-11
              w-fit
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

        {/* ================================================
            EMPTY STATE
        ================================================ */}

        <DepartmentEmpty />
      </div>
    );
  }

  // =======================================================
  // DATA AVAILABLE
  // =======================================================

  return (
    <div
      className="
        w-full
        space-y-6
        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* =================================================
            LEFT
        ================================================= */}

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
              <Building2 size={22} />
            </div>

            <h1
              className="
                text-2xl
                font-bold
                text-slate-800
                sm:text-3xl
              "
            >
              Departments
            </h1>
          </div>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            Manage all academic departments
            available on the website.
          </p>
        </div>

        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.back()
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
              font-semibold
              text-slate-600
              shadow-sm
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            <ArrowLeft size={17} />

            Back
          </button>

          {/* CREATE */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/departments/new"
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

            Create Department
          </button>
        </div>
      </div>

      {/* ===================================================
          DEPARTMENT COUNT
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            Total Departments
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-800
            "
          >
            {departments.length}
          </p>
        </div>

        <div
          className="
            w-fit
            rounded-xl
            bg-[#E8F7F0]
            px-4
            py-2
            text-sm
            font-semibold
            text-[#008B45]
          "
        >
          Active academic programs
        </div>
      </div>

      {/* ===================================================
          TABLE
      =================================================== */}

      <DepartmentTable
        departments={departments}
        onDelete={handleDelete}
      />
    </div>
  );
}