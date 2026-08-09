"use client";

import {
  ArrowLeft,
  Building2,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import DepartmentForm, {
  DepartmentFormData,
} from "@/components/dashboard/home/departments/DepartmentForm";

import DepartmentPreview from "@/components/dashboard/home/departments/DepartmentPreview";

export default function NewDepartmentPage() {
  const router = useRouter();

  // =======================================================
  // LIVE PREVIEW DATA
  // =======================================================

  const [
    previewData,
    setPreviewData,
  ] = useState<DepartmentFormData>({
    name: "",

    slug: "",

    image: "",

    description: "",

    isPopular: false,

    isActive: true,

    order: 0,
  });

  // =======================================================
  // CREATE SUCCESS
  // =======================================================

  const handleSuccess = () => {
    router.push(
      "/dashboard/home/departments"
    );

    router.refresh();
  };

  // =======================================================
  // RENDER
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
          TOP BAR
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

          <div className="mt-5 flex items-center gap-3">
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
                Create Department
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Add a new academic department
                to your website.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          FORM + PREVIEW
      =================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]
          xl:items-start
        "
      >
        {/* =================================================
            FORM
        ================================================= */}

        <div className="min-w-0">
          <DepartmentForm
            onDataChange={
              setPreviewData
            }
            onSuccess={
              handleSuccess
            }
          />
        </div>

        {/* =================================================
            LIVE PREVIEW
        ================================================= */}

        <div
          className="
            min-w-0
            xl:sticky
            xl:top-6
          "
        >
          <DepartmentPreview
            data={previewData}
          />
        </div>
      </div>
    </div>
  );
}