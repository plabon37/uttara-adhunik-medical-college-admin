"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import AdmissionForm, {
  AdmissionFormData,
} from "@/components/dashboard/home/admission/AdmissionForm";

import AdmissionPreview from "@/components/dashboard/home/admission/AdmissionPreview";

import AdmissionLoading from "@/components/dashboard/home/admission/AdmissionLoading";

import AdmissionEmpty from "@/components/dashboard/home/admission/AdmissionEmpty";

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface AdmissionResponse {
  success?: boolean;

  message?: string;

  data?: AdmissionData;
}

// =========================================================
// ADMISSION DATA
// =========================================================

interface AdmissionData {
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
// ROUTE PARAMS
// =========================================================

interface EditAdmissionPageProps {
  params: Promise<{
    id: string;
  }>;
}

// =========================================================
// PAGE
// =========================================================

export default function EditAdmissionPage({
  params,
}: EditAdmissionPageProps) {
  // =======================================================
  // NEXT ROUTER
  // =======================================================

  const router =
    useRouter();

  // =======================================================
  // NEXT.JS 16 PARAMS
  // =======================================================

  const {
    id,
  } = use(params);

  // =======================================================
  // ADMISSION DATA
  // =======================================================

  const [
    admission,
    setAdmission,
  ] = useState<AdmissionData | null>(
    null
  );

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [
    previewData,
    setPreviewData,
  ] = useState<AdmissionFormData | null>(
    null
  );

  // =======================================================
  // LOADING
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // ERROR
  // =======================================================

  const [
    error,
    setError,
  ] = useState("");

  // =======================================================
  // FETCH ADMISSION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadAdmission =
      async () => {
        try {
          // =================================================
          // FETCH FROM SAME ADMIN PROJECT
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

          let result:
            | AdmissionResponse
            | null = null;

          // =================================================
          // PARSE JSON
          // =================================================

          try {
            result =
              JSON.parse(
                responseText
              );
          } catch {
            throw new Error(
              `Admission API returned an invalid response. HTTP ${response.status}`
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

            setError("");

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
            !result?.success ||
            !result.data
          ) {
            throw new Error(
              result?.message ||
                "Failed to fetch Admission section."
            );
          }

          // =================================================
          // ID CHECK
          // =================================================

          if (
            result.data._id &&
            result.data._id !== id
          ) {
            console.warn(
              "Admission ID in URL does not match the returned Admission document."
            );
          }

          // =================================================
          // SET DATA
          // =================================================

          if (!cancelled) {
            setAdmission(
              result.data
            );

            setError("");

            setLoading(
              false
            );
          }
        } catch (
          fetchError
        ) {
          // =================================================
          // CONSOLE ERROR
          // =================================================

          console.error(
            "EDIT ADMISSION FETCH ERROR:",
            fetchError
          );

          // =================================================
          // STATE UPDATE
          // =================================================

          if (!cancelled) {
            setAdmission(
              null
            );

            setError(
              fetchError instanceof Error
                ? fetchError.message
                : "Failed to fetch Admission section."
            );

            setLoading(
              false
            );
          }
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
  }, [id]);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <AdmissionLoading />
    );
  }

  // =======================================================
  // ERROR
  // =======================================================

  if (error) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAF9]
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-[520px]
            rounded-2xl
            border
            border-red-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          {/* ERROR ICON */}

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            !
          </div>

          {/* TITLE */}

          <h1
            className="
              mt-5
              text-xl
              font-semibold
              text-gray-900
            "
          >
            Failed to Load Admission
          </h1>

          {/* MESSAGE */}

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            {error}
          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-6
              flex
              justify-center
              gap-3
            "
          >
            {/* BACK */}

            <Link
              href="/dashboard/home/admission"
              className="
                rounded-xl
                border
                border-gray-200
                px-5
                py-2.5
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Back
            </Link>

            {/* TRY AGAIN */}

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="
                rounded-xl
                bg-[#008B45]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#00763B]
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!admission) {
    return (
      <AdmissionEmpty />
    );
  }

  // =======================================================
  // FORM DATA
  // =======================================================

  const initialFormData: AdmissionFormData =
    {
      backgroundImage:
        admission.backgroundImage ||
        "",

      titlePrefix:
        admission.titlePrefix ||
        "UAMC",

      title:
        admission.title ||
        "Admission",

      description:
        admission.description ||
        "",

      buttonText:
        admission.buttonText ||
        "Learn More",

      buttonLink:
        admission.buttonLink ||
        "/admission",

      isActive:
        admission.isActive ??
        true,
    };

  // =======================================================
  // SUCCESS
  // =======================================================

  const handleSuccess = () => {
    router.push(
      "/dashboard/home/admission"
    );

    router.refresh();
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#F8FAF9]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
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
            {/* BACK */}

            <Link
              href="/dashboard/home/admission"
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-gray-500
                transition
                hover:text-[#008B45]
              "
            >
              <ArrowLeft
                size={17}
              />

              Back to Admission
            </Link>

            {/* TITLE */}

            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
              "
            >
              Edit Admission
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-gray-500
              "
            >
              Update the Admission
              section content and
              website appearance.
            </p>
          </div>

          {/* ACTIVE STATUS */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              bg-white
              px-4
              py-2
              text-sm
              shadow-sm
              ring-1
              ring-gray-200
              sm:self-auto
            "
          >
            <span
              className={`
                h-2
                w-2
                rounded-full
                ${
                  admission.isActive
                    ? "bg-[#008B45]"
                    : "bg-gray-400"
                }
              `}
            />

            <span
              className="
                font-medium
                text-gray-600
              "
            >
              {admission.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-6
            xl:grid-cols-[minmax(0,1fr)_minmax(500px,0.9fr)]
          "
        >
          {/* =================================================
              FORM
          ================================================= */}

          <div>
            <AdmissionForm
              initialData={
                initialFormData
              }
              admissionId={
                admission._id
              }
              onDataChange={
                setPreviewData
              }
              onSuccess={
                handleSuccess
              }
            />
          </div>

          {/* =================================================
              PREVIEW
          ================================================= */}

          <div
            className="
              xl:sticky
              xl:top-6
            "
          >
            <AdmissionPreview
              data={
                previewData ||
                initialFormData
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}