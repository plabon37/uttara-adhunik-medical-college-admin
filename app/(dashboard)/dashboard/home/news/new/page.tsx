"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import NewsForm, {
  NewsFormData,
} from "@/components/dashboard/home/news/NewsForm";

import NewsPreview from "@/components/dashboard/home/news/NewsPreview";

// =========================================================
// DEFAULT FORM DATA
// =========================================================

const defaultFormData: NewsFormData = {
  title: "",

  category: "",

  description: "",

  image: "",

  author: "UAMC",

  date: new Date()
    .toISOString()
    .split("T")[0],

  isPublished: true,

  order: 0,
};

// =========================================================
// API RESPONSE
// =========================================================

interface NewsCreateResponse {
  success?: boolean;

  message?: string;

  data?: unknown;
}

// =========================================================
// PAGE
// =========================================================

export default function CreateNewsPage() {
  const router =
    useRouter();

  // =======================================================
  // PREVIEW DATA
  // =======================================================

  const [previewData, setPreviewData] =
    useState<NewsFormData>(
      defaultFormData
    );

  // =======================================================
  // CREATE NEWS
  // =======================================================

  const handleCreate = async (
    data: NewsFormData
  ) => {
    try {
      // ===================================================
      // CREATE API
      // ===================================================

      const response =
        await fetch(
          "/api/news",
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
        | NewsCreateResponse
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
          "CREATE NEWS NON-JSON RESPONSE:",
          responseText
        );

        throw new Error(
          "News API returned an invalid response."
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
            "Failed to create News."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      toast.success(
        "News created successfully."
      );

      // ===================================================
      // REDIRECT
      // ===================================================

      router.push(
        "/dashboard/home/news"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE NEWS ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create News."
      );

      // Important:
      // Re-throw so NewsForm knows
      // that submission failed.
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
            href="/dashboard/home/news"
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
              hover:bg-[#EAF5EE]
              hover:text-[#008B45]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to News
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
              Create News
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
              Add a news article that
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
            xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
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
            <NewsForm
              initialData={
                defaultFormData
              }
              onChange={
                setPreviewData
              }
              onSubmit={
                handleCreate
              }
              submitLabel="Create News"
              title="News Information"
              description="Manage the news title, category, description, image and publishing settings."
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
            <NewsPreview
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