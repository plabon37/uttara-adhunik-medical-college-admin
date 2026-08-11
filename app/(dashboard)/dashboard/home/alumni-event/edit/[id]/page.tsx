"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";

import { toast } from "sonner";

import AlumniEventForm, {
  AlumniEventFormData,
} from "@/components/dashboard/home/alumni-event/AlumniEventForm";

import AlumniEventPreview from "@/components/dashboard/home/alumni-event/AlumniEventPreview";

// =========================================================
// API RESPONSE
// =========================================================

interface AlumniEventApiResponse {
  success?: boolean;

  message?: string;

  data?: AlumniEventFormData & {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  alumniEvent?: AlumniEventFormData & {
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

// =========================================================
// PAGE
// =========================================================

export default function AlumniEventEditPage() {
  const params = useParams();

  const router = useRouter();

  // =======================================================
  // ID
  // =======================================================

  const rawId = params?.id;

  const id =
    Array.isArray(rawId)
      ? rawId[0]
      : rawId;

  // =======================================================
  // FORM DATA
  // =======================================================

  const [formData, setFormData] =
    useState<AlumniEventFormData | null>(
      null
    );

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [previewData, setPreviewData] =
    useState<AlumniEventFormData | null>(
      null
    );

  // =======================================================
  // FORM KEY
  // =======================================================

  const [formKey, setFormKey] =
    useState(0);

  // =======================================================
  // SUBMITTING
  // =======================================================

  const [submitting, setSubmitting] =
    useState(false);

  // =======================================================
  // LOAD EVENT
  // =======================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    const loadAlumniEvent =
      async () => {
        try {
          // =================================================
          // GET API
          // =================================================

          const response =
            await fetch(
              `/api/alumni-events/${id}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          // =================================================
          // RESPONSE TEXT
          // =================================================

          const responseText =
            await response.text();

          let result:
            | AlumniEventApiResponse
            | null = null;

          try {
            result =
              responseText
                ? JSON.parse(
                    responseText
                  )
                : null;
          } catch {
            throw new Error(
              "Alumni Event API returned an invalid response."
            );
          }

          // =================================================
          // API ERROR
          // =================================================

          if (
            !response.ok ||
            !result?.success
          ) {
            throw new Error(
              result?.message ||
                "Failed to fetch Alumni Event."
            );
          }

          // =================================================
          // DATA
          // =================================================

          const rawData =
            result.data ??
            result.alumniEvent;

          if (!rawData) {
            throw new Error(
              "Alumni Event not found."
            );
          }

          // =================================================
          // NORMALIZE
          // =================================================

          const normalizedData: AlumniEventFormData = {
            title:
              rawData.title ?? "",

            date:
              rawData.date ?? "",

            time:
              rawData.time ?? "",

            location:
              rawData.location ?? "",

            image:
              rawData.image ?? "",

            isPublished:
              Boolean(
                rawData.isPublished
              ),

            order:
              Number(
                rawData.order ?? 0
              ),
          };

          // =================================================
          // UPDATE AFTER ASYNC TASK
          // =================================================

          if (cancelled) {
            return;
          }

          window.setTimeout(() => {
            if (cancelled) {
              return;
            }

            setFormData(
              normalizedData
            );

            setPreviewData(
              normalizedData
            );

            setFormKey(
              (previous) =>
                previous + 1
            );
          }, 0);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "LOAD ALUMNI EVENT ERROR:",
            error
          );

          window.setTimeout(() => {
            if (cancelled) {
              return;
            }

            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to fetch Alumni Event."
            );
          }, 0);
        }
      };

    void loadAlumniEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =======================================================
  // UPDATE EVENT
  // =======================================================

  const handleUpdate = async (
    data: AlumniEventFormData
  ) => {
    if (!id) {
      toast.error(
        "Alumni Event ID is missing."
      );

      return;
    }

    setSubmitting(true);

    try {
      // =================================================
      // PUT API
      // =================================================

      const response =
        await fetch(
          `/api/alumni-events/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      // =================================================
      // RESPONSE
      // =================================================

      const responseText =
        await response.text();

      let result:
        | {
            success?: boolean;
            message?: string;
            data?: unknown;
          }
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch {
        throw new Error(
          "Update Alumni Event API returned an invalid response."
        );
      }

      // =================================================
      // API ERROR
      // =================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Failed to update Alumni Event."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      toast.success(
        "Alumni Event updated successfully."
      );

      // =================================================
      // REDIRECT
      // =================================================

      router.push(
        "/dashboard/home/alumni-event"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE ALUMNI EVENT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update Alumni Event."
      );

      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  // =======================================================
  // NO DATA YET
  // =======================================================

  if (
    !formData ||
    !previewData
  ) {
    return null;
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-slate-50
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
            mb-6
            flex
            flex-col
            gap-4
          "
        >
          {/* BACK */}

          <Link
            href="/dashboard/home/alumni-event"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Alumni Event
          </Link>

          {/* TITLE */}

          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#008B45]
              "
            >
              Homepage
            </p>

            <h1
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              Edit Alumni Event
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              Update the Alumni Event
              information, image and
              publishing settings.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM + PREVIEW
        ================================================= */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-start
            gap-6
            xl:grid-cols-2
          "
        >
          {/* =================================================
              LEFT — FORM
          ================================================= */}

          <div
            className="
              min-w-0
            "
          >
            <AlumniEventForm
              key={formKey}
              initialData={
                formData
              }

              onChange={(data) => {
                setPreviewData(
                  data
                );
              }}

              onSubmit={
                handleUpdate
              }

              submitLabel={
                submitting
                  ? "Updating Alumni Event..."
                  : "Update Alumni Event"
              }

              title="Alumni Event"

              description="
                Update the event title,
                date, time, location,
                image and publishing
                settings.
              "
            />
          </div>

          {/* =================================================
              RIGHT — LIVE PREVIEW
          ================================================= */}

          <div
            className="
              min-w-0
              xl:sticky
              xl:top-6
            "
          >
            <AlumniEventPreview
              data={
                previewData
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}