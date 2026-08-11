"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import AlumniEventForm, {
  AlumniEventFormData,
} from "@/components/dashboard/home/alumni-event/AlumniEventForm";

import AlumniEventPreview from "@/components/dashboard/home/alumni-event/AlumniEventPreview";

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: AlumniEventFormData = {
  title:
    "Bridging Cultures: Global Perspectives in",

  date:
    "August 20, 2024",

  time:
    "4:27 am",

  location:
    "Yarra Park, UK",

  image:
    "",

  isPublished:
    true,

  order:
    0,
};

// =========================================================
// API RESPONSE
// =========================================================

interface AlumniEventCreateResponse {
  success?: boolean;

  message?: string;

  data?: unknown;
}

// =========================================================
// PAGE
// =========================================================

export default function AlumniEventNewPage() {
  const router = useRouter();

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [previewData, setPreviewData] =
    useState<AlumniEventFormData>(
      defaultFormData
    );

  // =======================================================
  // CREATE
  // =======================================================

  const handleCreate = async (
    data: AlumniEventFormData
  ) => {
    try {
      // ===================================================
      // POST API
      // ===================================================

      const response =
        await fetch(
          "/api/alumni-events",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              data
            ),
          }
        );

      // ===================================================
      // READ RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | AlumniEventCreateResponse
        | null = null;

      try {
        result =
          responseText
            ? JSON.parse(
                responseText
              )
            : null;
      } catch {
        console.error(
          "CREATE ALUMNI EVENT NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "Alumni Event API returned an invalid response."
        );
      }

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Failed to create Alumni Event."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "Alumni Event created successfully."
      );

      // ===================================================
      // REDIRECT
      // ===================================================

      router.push(
        "/dashboard/home/alumni-event"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE ALUMNI EVENT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create Alumni Event."
      );

      throw error;
    }
  };

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
            PAGE HEADER
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
              Create Alumni Event
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
              Add an Alumni Event that
              will appear on the client
              website.
            </p>
          </div>
        </div>

        {/* =================================================
            FORM + LIVE PREVIEW
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
              LEFT — FORM 50%
          ================================================= */}

          <div
            className="
              min-w-0
            "
          >
            <AlumniEventForm
              initialData={
                defaultFormData
              }

              onChange={(data) => {
                setPreviewData(
                  data
                );
              }}

              onSubmit={
                handleCreate
              }

              submitLabel="Create Alumni Event"

              title="Alumni Event"

              description="
                Manage the event title,
                date, time, location,
                image and publishing
                settings.
              "
            />
          </div>

          {/* =================================================
              RIGHT — LIVE PREVIEW 50%
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