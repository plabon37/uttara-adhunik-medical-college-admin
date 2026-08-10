"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import { toast } from "sonner";

import FacilitiesForm from "@/components/dashboard/home/facilities/FacilitiesForm";

import type {
  FacilitiesPreviewData,
} from "@/components/dashboard/home/facilities/FacilitiesForm";

/* =========================================================
   PAGE
========================================================= */

export default function FacilitiesEditPage() {
  const router = useRouter();

  const params = useParams();

  /* =======================================================
     ID
  ======================================================= */

  const id =
    typeof params?.id === "string"
      ? params.id
      : "";

  /* =======================================================
     FACILITIES DATA
  ======================================================= */

  const [
    facilities,
    setFacilities,
  ] = useState<FacilitiesPreviewData | null>(
    null
  );

  /* =======================================================
     ERROR STATE
  ======================================================= */

  const [
    loadError,
    setLoadError,
  ] = useState<string | null>(
    null
  );

  /* =======================================================
     LOAD FACILITIES
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    /* =====================================================
       INVALID ID

       IMPORTANT:
       Do NOT call setState synchronously
       inside useEffect.
    ===================================================== */

    if (!id) {
      return () => {
        cancelled = true;
      };
    }

    /* =====================================================
       LOAD DATA
    ===================================================== */

    const loadFacilities =
      async () => {
        try {
          const response =
            await fetch(
              `/api/facilities/${id}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          /* ===============================================
             READ RESPONSE
          =============================================== */

          const text =
            await response.text();

          let data:
            | {
                success?: boolean;
                message?: string;
                data?: FacilitiesPreviewData;
              }
            | null = null;

          try {
            data =
              JSON.parse(text);
          } catch {
            throw new Error(
              "Facilities API returned an invalid response."
            );
          }

          /* ===============================================
             CANCELLED
          =============================================== */

          if (cancelled) {
            return;
          }

          /* ===============================================
             NOT FOUND
          =============================================== */

          if (
            response.status ===
            404
          ) {
            toast.error(
              "Facilities section not found."
            );

            router.push(
              "/dashboard/home/facilities"
            );

            return;
          }

          /* ===============================================
             API ERROR
          =============================================== */

          if (
            !response.ok ||
            !data?.success ||
            !data.data
          ) {
            throw new Error(
              data?.message ||
                "Failed to fetch Facilities section."
            );
          }

          /* ===============================================
             SUCCESS
          =============================================== */

          setFacilities(
            data.data
          );

          setLoadError(null);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "FETCH FACILITIES EDIT ERROR:",
            error
          );

          const message =
            error instanceof Error
              ? error.message
              : "Failed to load Facilities section.";

          setLoadError(message);

          toast.error(message);
        }
      };

    loadFacilities();

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  /* =======================================================
     SUBMIT EDIT
  ======================================================= */

  const handleSubmit = async (
    formData: FacilitiesPreviewData
  ) => {
    if (!id) {
      toast.error(
        "Facilities ID is missing."
      );

      return;
    }

    try {
      const response =
        await fetch(
          `/api/facilities/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          }
        );

      /* ===============================================
         READ RESPONSE
      =============================================== */

      const text =
        await response.text();

      let data:
        | {
            success?: boolean;
            message?: string;
          }
        | null = null;

      try {
        data =
          JSON.parse(text);
      } catch {
        throw new Error(
          "Facilities update API returned an invalid response."
        );
      }

      /* ===============================================
         API ERROR
      =============================================== */

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Failed to update Facilities section."
        );
      }

      /* ===============================================
         SUCCESS
      =============================================== */

      toast.success(
        "Facilities section updated successfully."
      );

      router.push(
        "/dashboard/home/facilities"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE FACILITIES ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update Facilities section."
      );

      throw error;
    }
  };

  /* =======================================================
     LOADING

     facilities === null
     এবং loadError === null
     হলে loading দেখাবে।
  ======================================================= */

  const loading =
    facilities === null &&
    loadError === null &&
    Boolean(id);

  /* =======================================================
     INVALID ID
  ======================================================= */

  if (!id) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAF9]
          px-5
          py-10
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <h1
            className="
              text-xl
              font-bold
              text-slate-800
              sm:text-2xl
            "
          >
            Invalid Facilities ID
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            The Facilities ID is
            missing from the URL.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/facilities"
              )
            }
            className="
              mt-6
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
              transition
              hover:bg-[#00763B]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Facilities
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAF9]
          px-5
          py-10
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
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
              bg-emerald-50
            "
          >
            <Loader2
              size={30}
              strokeWidth={2}
              className="
                animate-spin
                text-[#008B45]
              "
            />
          </div>

          <h1
            className="
              mt-5
              text-xl
              font-semibold
              text-slate-800
              sm:text-2xl
            "
          >
            Loading Facilities
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Please wait while we load
            the Facilities data.
          </p>
        </div>
      </main>
    );
  }

  /* =======================================================
     LOAD ERROR
  ======================================================= */

  if (loadError) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAF9]
          px-5
          py-10
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-2xl
            border
            border-red-100
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <h1
            className="
              text-xl
              font-bold
              text-slate-800
              sm:text-2xl
            "
          >
            Failed to Load Facilities
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            {loadError}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/facilities"
              )
            }
            className="
              mt-6
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
              transition
              hover:bg-[#00763B]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Facilities
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     SAFETY CHECK
  ======================================================= */

  if (!facilities) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#F8FAF9]
          px-5
          py-10
        "
      >
        <div
          className="
            w-full
            max-w-lg
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <h1
            className="
              text-xl
              font-bold
              text-slate-800
              sm:text-2xl
            "
          >
            Facilities Not Found
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            The Facilities section
            could not be loaded.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/home/facilities"
              )
            }
            className="
              mt-6
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
              transition
              hover:bg-[#00763B]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Facilities
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     EDIT PAGE
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#F8FAF9]
        px-5
        py-6
        sm:px-8
        lg:px-10
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
          <h1
            className="
              text-2xl
              font-bold
              text-slate-800
              sm:text-3xl
            "
          >
            Edit Facilities
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            Update the Facilities
            section of the website.
          </p>
        </div>

        {/* BACK BUTTON */}

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
            w-fit
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

          Back to Facilities
        </button>
      </div>

      {/* =================================================
          FACILITIES FORM + LIVE PREVIEW
      ================================================= */}

      <FacilitiesForm
        initialData={facilities}
        onSubmit={handleSubmit}
        submitLabel="Update Facilities"
      />
    </main>
  );
}