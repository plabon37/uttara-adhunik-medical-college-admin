"use client";

import {
  ArrowLeft,
  Building2,
  Loader2,
} from "lucide-react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import DepartmentForm, {
  DepartmentFormData,
} from "@/components/dashboard/home/departments/DepartmentForm";

import DepartmentPreview from "@/components/dashboard/home/departments/DepartmentPreview";

import type {
  DepartmentData,
} from "@/components/dashboard/home/departments/DepartmentTableRow";

// =========================================================
// PAGE
// =========================================================

export default function EditDepartmentPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  // =======================================================
  // DEPARTMENT
  // =======================================================

  const [
    department,
    setDepartment,
  ] = useState<DepartmentData | null>(
    null
  );

  // =======================================================
  // PREVIEW DATA
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
  // LOADING
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH DEPARTMENT
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadDepartment =
      async () => {
        try {
          const response =
            await fetch(
              `/api/departments/${id}`,
              {
                cache: "no-store",
              }
            );

          const data =
            await response.json();

          if (cancelled) {
            return;
          }

          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
                "Failed to fetch Department."
            );
          }

          const departmentData =
            data.data as DepartmentData;

          setDepartment(
            departmentData
          );

          setPreviewData({
            name:
              departmentData.name ||
              "",

            slug:
              departmentData.slug ||
              "",

            image:
              departmentData.image ||
              "",

            description:
              departmentData.description ||
              "",

            isPopular:
              departmentData.isPopular ??
              false,

            isActive:
              departmentData.isActive ??
              true,

            order:
              departmentData.order ??
              0,
          });

          setLoading(false);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "FETCH DEPARTMENT ERROR:",
            error
          );

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to fetch Department."
          );

          setLoading(false);
        }
      };

    if (id) {
      loadDepartment();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =======================================================
  // UPDATE PREVIEW DATA
  // =======================================================

  const handleDataChange = (
    data: DepartmentFormData
  ) => {
    setPreviewData(data);
  };

  // =======================================================
  // UPDATE SUCCESS
  // =======================================================

  const handleSuccess = (
    updatedData: DepartmentData
  ) => {
    setDepartment(
      updatedData
    );

    setPreviewData({
      name:
        updatedData.name ||
        "",

      slug:
        updatedData.slug ||
        "",

      image:
        updatedData.image ||
        "",

      description:
        updatedData.description ||
        "",

      isPopular:
        updatedData.isPopular ??
        false,

      isActive:
        updatedData.isActive ??
        true,

      order:
        updatedData.order ??
        0,
    });

    router.push(
      "/dashboard/home/departments"
    );

    router.refresh();
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          w-full
          items-center
          justify-center
          p-6
        "
      >
        <div className="text-center">
          <Loader2
            size={38}
            className="
              mx-auto
              animate-spin
              text-[#008B45]
            "
          />

          <p
            className="
              mt-4
              text-sm
              font-medium
              text-slate-500
            "
          >
            Loading Department...
          </p>
        </div>
      </div>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (!department) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          w-full
          flex-col
          items-center
          justify-center
          p-6
          text-center
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-500
          "
        >
          <Building2 size={30} />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-slate-800
          "
        >
          Department Not Found
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          The Department you are trying
          to edit could not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/departments"
            )
          }
          className="
            mt-6
            inline-flex
            min-h-11
            items-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#00763B]
          "
        >
          <ArrowLeft size={17} />

          Back to Departments
        </button>
      </div>
    );
  }

  // =======================================================
  // PAGE
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

      <div>
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

        {/* TITLE */}

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
              Edit Department
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Update the information and
              settings for this department.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          FORM + LIVE PREVIEW
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
            initialData={
              department
            }
            onDataChange={
              handleDataChange
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