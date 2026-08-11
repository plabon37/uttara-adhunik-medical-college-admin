"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft, Loader2 } from "lucide-react";

import { toast } from "sonner";

import NewsForm, {
  NewsFormData,
} from "@/components/dashboard/home/news/NewsForm";

import NewsPreview from "@/components/dashboard/home/news/NewsPreview";

// =========================================================
// API RESPONSE
// =========================================================

interface NewsApiResponse {
  success?: boolean;

  message?: string;

  data?: NewsData;
}

// =========================================================
// NEWS DATA
// =========================================================

interface NewsData {
  _id: string;

  title: string;

  slug: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: string;

  isPublished: boolean;

  order: number;

  createdAt?: string;

  updatedAt?: string;
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultFormData: NewsFormData = {
  title: "",

  category: "",

  description: "",

  image: "",

  author: "UAMC",

  date: "",

  isPublished: true,

  order: 0,
};

// =========================================================
// PAGE
// =========================================================

export default function EditNewsPage() {
  const router =
    useRouter();

  const params =
    useParams<{
      id: string;
    }>();

  const id =
    params?.id;

  // =======================================================
  // STATE
  // =======================================================

  const [formData, setFormData] =
    useState<NewsFormData>(
      defaultFormData
    );

  const [previewData, setPreviewData] =
    useState<NewsFormData>(
      defaultFormData
    );

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [notFound, setNotFound] =
    useState(false);

  // =======================================================
  // FETCH SINGLE NEWS
  // =======================================================

  const fetchNews =
    useCallback(async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // =================================================
        // GET API
        // =================================================

        const response =
          await fetch(
            `/api/news/${id}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        // =================================================
        // READ RESPONSE
        // =================================================

        const responseText =
          await response.text();

        let result:
          | NewsApiResponse
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
            "News API returned an invalid response."
          );
        }

        // =================================================
        // API ERROR
        // =================================================

        if (
          !response.ok ||
          !result?.success ||
          !result.data
        ) {
          if (
            response.status === 404
          ) {
            setNotFound(true);

            return;
          }

          throw new Error(
            result?.message ||
              "Failed to fetch News."
          );
        }

        // =================================================
        // API DATA
        // =================================================

        const news =
          result.data;

        // =================================================
        // NORMALIZE FORM DATA
        // =================================================

        const normalizedData:
          NewsFormData = {
          title:
            news.title ?? "",

          category:
            news.category ?? "",

          description:
            news.description ?? "",

          image:
            news.image ?? "",

          author:
            news.author ||
            "UAMC",

          date:
            news.date ?? "",

          isPublished:
            Boolean(
              news.isPublished
            ),

          order:
            Number(
              news.order ?? 0
            ),
        };

        // =================================================
        // SET INITIAL DATA
        // =================================================

        setFormData(
          normalizedData
        );

        setPreviewData(
          normalizedData
        );
      } catch (error) {
        console.error(
          "FETCH NEWS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch News."
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  // =======================================================
  // INITIAL FETCH
  // =======================================================

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void fetchNews();
      }, 0);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [fetchNews]);

  // =======================================================
  // UPDATE NEWS
  // =======================================================

  const handleUpdate =
    async (
      data: NewsFormData
    ) => {
      if (!id) {
        toast.error(
          "News ID is missing."
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
            `/api/news/${id}`,
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
        // READ RESPONSE
        // =================================================

        const responseText =
          await response.text();

        let result:
          | NewsApiResponse
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
            "UPDATE NEWS NON-JSON RESPONSE:",
            responseText
          );

          throw new Error(
            "News update API returned an invalid response."
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
              "Failed to update News."
          );
        }

        // =================================================
        // SUCCESS
        // =================================================

        setFormData(data);

        setPreviewData(data);

        toast.success(
          "News updated successfully."
        );

        // =================================================
        // REDIRECT
        // =================================================

        router.push(
          "/dashboard/home/news"
        );

        router.refresh();
      } catch (error) {
        console.error(
          "UPDATE NEWS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update News."
        );

        throw error;
      } finally {
        setSubmitting(false);
      }
    };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-50
          px-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            font-medium
            text-slate-500
          "
        >
          <Loader2
            size={22}
            className="
              animate-spin
              text-[#008B45]
            "
          />

          Loading News...
        </div>
      </main>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (notFound) {
    return (
      <main
        className="
          min-h-screen
          bg-slate-50
          px-4
          py-10
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-xl
            flex-col
            items-center
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-12
            text-center
            shadow-sm
          "
        >
          <h1
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            News Not Found
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            The requested news article
            does not exist or has been
            removed.
          </p>

          <Link
            href="/dashboard/home/news"
            className="
              mt-6
              inline-flex
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
            <ArrowLeft
              size={17}
            />

            Back to News
          </Link>
        </div>
      </main>
    );
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
              Edit News
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
              Update the news article,
              image and publishing
              settings.
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
              FORM
          ================================================= */}

          <div
            className="
              min-w-0
            "
          >
            <NewsForm
              key={
                formData.title +
                formData.image +
                formData.date
              }
              initialData={
                formData
              }
              onChange={
                setPreviewData
              }
              onSubmit={
                handleUpdate
              }
              submitLabel={
                submitting
                  ? "Updating News..."
                  : "Update News"
              }
              title="News Information"
              description="Update the news title, category, description, image and publishing settings."
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