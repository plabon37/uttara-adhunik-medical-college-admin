"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import FacilitiesForm, {
  FacilitiesPreviewData,
} from "@/components/dashboard/home/facilities/FacilitiesForm";

export default function NewFacilitiesPage() {
  const router = useRouter();

  /* =========================================================
     DEFAULT DATA
  ========================================================= */

  const initialData: FacilitiesPreviewData = {
    tagline: "",
    title: "",
    image: "",

    facilities: [
      {
        name: "",
        title: "",
        description: "",
        detailsText: "View Details",
        detailsLink: "#",
        order: 0,
      },
    ],

    programButtonText: "View Our Program",
    programButtonLink: "/programs",

    isActive: true,
  };

  /* =========================================================
     CREATE FACILITIES
  ========================================================= */

  const handleSubmit = async (
    formData: FacilitiesPreviewData
  ) => {
    try {
      const response = await fetch(
        "/api/facilities",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            tagline: formData.tagline,
            title: formData.title,
            image: formData.image,

            facilities:
              formData.facilities.map(
                (facility, index) => ({
                  ...facility,
                  order: index,
                })
              ),

            programButtonText:
              formData.programButtonText,

            programButtonLink:
              formData.programButtonLink,

            isActive:
              formData.isActive,
          }),
        }
      );

      const data =
        await response.json();

      /* =====================================================
         API ERROR
      ===================================================== */

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to create Facilities section."
        );
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      toast.success(
        "Facilities section created successfully."
      );

      router.push(
        "/dashboard/home/facilities"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE FACILITIES ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create Facilities section."
      );

      throw error;
    }
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="w-full">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-6
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
            Create Facilities
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            Create and manage the Facilities
            section of the website.
          </p>
        </div>

        {/* RIGHT */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/facilities"
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
          <ArrowLeft size={17} />

          Back to Facilities
        </button>
      </div>

      {/* =====================================================
          FORM
      ===================================================== */}

      <FacilitiesForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Create Facilities"
      />
    </div>
  );
}