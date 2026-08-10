"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdmissionForm, {
  AdmissionFormData,
} from "@/components/dashboard/home/admission/AdmissionForm";

import AdmissionPreview from "@/components/dashboard/home/admission/AdmissionPreview";

// =========================================================
// DEFAULT FORM DATA
// =========================================================

const defaultFormData: AdmissionFormData = {
  backgroundImage: "",

  titlePrefix: "UAMC",

  title: "Admission",

  description:
    "Uttara Adhunik Medical College (UAMC) was established in 2003 with a vision to provide quality medical education and healthcare services. Founded through the dedicated efforts of medical professionals and social leaders, UAMC is committed to training future doctors while ensuring affordable healthcare for the community.",

  buttonText: "Learn More",

  buttonLink: "/admission",

  isActive: true,
};

// =========================================================
// PAGE
// =========================================================

export default function NewAdmissionPage() {
  // =======================================================
  // ROUTER
  // =======================================================

  const router =
    useRouter();

  // =======================================================
  // PREVIEW STATE
  // =======================================================

  const [
    previewData,
    setPreviewData,
  ] = useState<AdmissionFormData>(
    defaultFormData
  );

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
            PAGE HEADER
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
              Create Admission
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
              Create and configure
              the Admission section
              for the website.
            </p>
          </div>
        </div>

        {/* =================================================
            MAIN CONTENT
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
                previewData
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}