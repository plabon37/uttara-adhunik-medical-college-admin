"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Edit3,
  Plus,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import AdmissionLoading from "@/components/dashboard/home/admission/AdmissionLoading";

import AdmissionEmpty from "@/components/dashboard/home/admission/AdmissionEmpty";

import AdmissionTable from "@/components/dashboard/home/admission/AdmissionTable";

// =========================================================
// ADMISSION TYPE
// =========================================================

export interface AdmissionData {
  _id: string;

  backgroundImage: string;

  titlePrefix: string;

  title: string;

  description: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// PAGE
// =========================================================

export default function AdmissionPage() {
  const router =
    useRouter();

  // =======================================================
  // ADMISSION STATE
  // =======================================================

  const [
    admission,
    setAdmission,
  ] = useState<AdmissionData | null>(
    null
  );

  // =======================================================
  // LOADING STATE
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // LOAD ADMISSION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadAdmission =
      async () => {
        try {
          // =================================================
          // FETCH API
          // =================================================

          const response =
            await fetch(
              "/api/admission",
              {
                cache: "no-store",
              }
            );

          // =================================================
          // READ RESPONSE
          // =================================================

          const responseText =
            await response.text();

          let data:
            | {
                success?: boolean;

                message?: string;

                data?: AdmissionData;
              }
            | null = null;

          // =================================================
          // PARSE JSON
          // =================================================

          try {
            data =
              JSON.parse(
                responseText
              );
          } catch {
            throw new Error(
              "Admission API returned an invalid response."
            );
          }

          // =================================================
          // CANCELLED CHECK
          // =================================================

          if (cancelled) {
            return;
          }

          // =================================================
          // NOT FOUND
          // =================================================

          if (
            response.status ===
            404
          ) {
            setAdmission(
              null
            );

            setLoading(
              false
            );

            return;
          }

          // =================================================
          // API ERROR
          // =================================================

          if (
            !response.ok ||
            !data?.success ||
            !data.data
          ) {
            throw new Error(
              data?.message ||
                "Failed to fetch Admission section."
            );
          }

          // =================================================
          // SUCCESS
          // =================================================

          setAdmission(
            data.data
          );

          setLoading(
            false
          );
        } catch (error) {
          // =================================================
          // CANCELLED
          // =================================================

          if (cancelled) {
            return;
          }

          // =================================================
          // CONSOLE
          // =================================================

          console.error(
            "FETCH ADMISSION ERROR:",
            error
          );

          // =================================================
          // TOAST
          // =================================================

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to fetch Admission section."
          );

          // =================================================
          // LOADING OFF
          // =================================================

          setLoading(
            false
          );
        }
      };

    // =====================================================
    // START LOAD
    // =====================================================

    loadAdmission();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // DELETE CALLBACK
  // =======================================================

  const handleDelete = () => {
    setAdmission(
      null
    );
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <AdmissionLoading />
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!admission) {
    return (
      <div
        className="
          w-full
          px-4
          py-6
          sm:px-6
          lg:px-8
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
            <h1
              className="
                text-2xl
                font-bold
                text-slate-800
                sm:text-3xl
              "
            >
              Admission
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                sm:text-base
              "
            >
              Manage the Admission
              section of the website.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard"
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
                font-medium
                text-slate-600
                shadow-sm
                transition
                hover:border-[#008B45]
                hover:text-[#008B45]
              "
            >
              <ArrowLeft
                size={17}
              />

              Back to Dashboard
            </button>

            {/* CREATE */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/home/admission/new"
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
              <Plus
                size={18}
              />

              Create Admission
            </button>
          </div>
        </div>

        {/* =================================================
            EMPTY
        ================================================= */}

        <AdmissionEmpty />
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
        px-4
        py-6
        sm:px-6
        lg:px-8
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
        {/* =================================================
            LEFT
        ================================================= */}

        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-slate-800
              sm:text-3xl
            "
          >
            Admission
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            Manage the Admission
            section of the website.
          </p>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard"
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
              font-medium
              text-slate-600
              shadow-sm
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Dashboard
          </button>

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/admission/edit/${admission._id}`
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
            <Edit3
              size={17}
            />

            Edit Admission
          </button>
        </div>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <AdmissionTable
        admission={
          admission
        }
        onDelete={
          handleDelete
        }
      />
    </div>
  );
}