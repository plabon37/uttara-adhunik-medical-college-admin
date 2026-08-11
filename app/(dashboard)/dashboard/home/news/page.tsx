"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Plus,
} from "lucide-react";

import { toast } from "sonner";

import NewsTable, {
  NewsRowData,
} from "@/components/dashboard/home/news/NewsTable";

// =========================================================
// API RESPONSE
// =========================================================

interface NewsApiResponse {
  success?: boolean;

  message?: string;

  data?:
    | NewsRowData
    | NewsRowData[];

  news?:
    | NewsRowData
    | NewsRowData[];
}

// =========================================================
// DELETE RESPONSE
// =========================================================

interface NewsDeleteResponse {
  success?: boolean;

  message?: string;

  data?: NewsRowData;
}

// =========================================================
// PAGE
// =========================================================

export default function NewsPage() {
  // =======================================================
  // STATE
  // =======================================================

  const [news, setNews] =
    useState<NewsRowData[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // =======================================================
  // GET NEWS
  // =======================================================

  const fetchNews =
    useCallback(async () => {
      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/news",
            {
              method: "GET",

              cache: "no-store",
            }
          );

        const responseText =
          await response.text();

        let result:
          | NewsApiResponse
          | null = null;

        // =================================================
        // PARSE RESPONSE
        // =================================================

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
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to fetch News."
          );
        }

        // =================================================
        // NORMALIZE DATA
        // =================================================

        const rawData =
          result.data ??
          result.news ??
          [];

        const normalizedData =
          Array.isArray(
            rawData
          )
            ? rawData
            : rawData
              ? [rawData]
              : [];

        // =================================================
        // SORT BY ORDER
        // =================================================

        normalizedData.sort(
          (a, b) =>
            Number(a.order ?? 0) -
            Number(b.order ?? 0)
        );

        setNews(
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

        setNews([]);
      } finally {
        setLoading(false);
      }
    }, []);

  // =======================================================
  // INITIAL FETCH
  // =======================================================
useEffect(() => {
  const timer = window.setTimeout(() => {
    void fetchNews();
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, [fetchNews]);
  // =======================================================
  // DELETE NEWS
  // =======================================================

  const handleDelete =
    async (id: string) => {
      if (!id) {
        toast.error(
          "News ID is missing."
        );

        return;
      }

      // =====================================================
      // CONFIRMATION
      // =====================================================

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this News?"
        );

      if (!confirmed) {
        return;
      }

      setDeletingId(id);

      try {
        // ===================================================
        // DELETE API
        // ===================================================

        const response =
          await fetch(
            `/api/news/${id}`,
            {
              method: "DELETE",
            }
          );

        const responseText =
          await response.text();

        let result:
          | NewsDeleteResponse
          | null = null;

        // ===================================================
        // PARSE RESPONSE
        // ===================================================

        try {
          result =
            responseText
              ? JSON.parse(
                  responseText
                )
              : null;
        } catch {
          throw new Error(
            "Delete News API returned an invalid response."
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
              "Failed to delete News."
          );
        }

        // ===================================================
        // REMOVE FROM TABLE
        // ===================================================

        setNews(
          (previous) =>
            previous.filter(
              (item) =>
                item._id !== id
            )
        );

        toast.success(
          "News deleted successfully."
        );
      } catch (error) {
        console.error(
          "DELETE NEWS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete News."
        );
      } finally {
        setDeletingId(null);
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
            HEADER
        ================================================= */}

        <div
          className="
            mb-6
            flex
            flex-col
            gap-5
          "
        >
          {/* BACK BUTTON */}

          <Link
            href="/dashboard"
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

            Back to Dashboard
          </Link>

          {/* TITLE + ADD */}

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
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
                Latest News
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
                Manage the latest news,
                stories and updates
                displayed on the client
                website.
              </p>
            </div>

            {/* ADD BUTTON */}

            <Link
              href="/dashboard/home/news/new"
              className="
                inline-flex
                w-fit
                shrink-0
                items-center
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
              "
            >
              <Plus
                size={18}
              />

              Add News
            </Link>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <NewsTable
          data={news}
          loading={loading}
          onRefresh={
            fetchNews
          }
          onDelete={
            handleDelete
          }
          deletingId={
            deletingId
          }
        />
      </div>
    </main>
  );
}