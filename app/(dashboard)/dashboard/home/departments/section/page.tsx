"use client";

import {
  ArrowLeft,
  Building2,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DepartmentSectionLoading from "@/components/dashboard/home/departments/DepartmentSectionLoading";

import DepartmentSectionEmpty from "@/components/dashboard/home/departments/DepartmentSectionEmpty";

import DepartmentSectionTable from "@/components/dashboard/home/departments/DepartmentSectionTable";

import type {
  DepartmentSectionData,
} from "@/components/dashboard/home/departments/DepartmentSectionRow";

// =========================================================
// PAGE
// =========================================================

export default function DepartmentSectionPage() {
  const router = useRouter();

  // =======================================================
  // STATE
  // =======================================================

  const [
    section,
    setSection,
  ] = useState<DepartmentSectionData | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH SECTION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadSection =
      async () => {
        try {
          const response =
            await fetch(
              "/api/department-section",
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (cancelled) {
            return;
          }

          // ===============================================
          // NOT FOUND
          // ===============================================

          if (
            response.status === 404
          ) {
            setSection(null);
            setLoading(false);
            return;
          }

          // ===============================================
          // API ERROR
          // ===============================================

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Failed to fetch Department section."
            );
          }

          // ===============================================
          // SUCCESS
          // ===============================================

          setSection(
            data.data
          );

          setLoading(false);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "FETCH DEPARTMENT SECTION ERROR:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to fetch Department section."
          );

          setLoading(false);
        }
      };

    loadSection();

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
    if (
      section?._id === id
    ) {
      setSection(null);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
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
        {/* BACK */}

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

        <DepartmentSectionLoading />
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!section) {
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
        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/departments"
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

          Back to Departments
        </button>

        {/* HEADER */}

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
                Department Section
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
              Manage the Find Your Department
              section of the website.
            </p>
          </div>

          {/* CREATE */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/departments/section/new"
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

            Create Section
          </button>
        </div>

        {/* EMPTY */}

        <DepartmentSectionEmpty />
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
      {/* =================================================
          HEADER
      ================================================= */}

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

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  sm:text-3xl
                "
              >
                Department Section
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Manage the Find Your Department
                section of the website.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

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
              router.push(
                "/dashboard/home/departments"
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
            Edit Section
          </button>
        </div>
      </div>

      {/* =================================================
          SECTION TABLE
      ================================================= */}

      <DepartmentSectionTable
        section={section}
        onDelete={handleDelete}
      />
    </div>
  );
}