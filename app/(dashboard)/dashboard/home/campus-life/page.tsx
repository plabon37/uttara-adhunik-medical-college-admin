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

import CampusLifeTable, {
  CampusLifeRowData,
} from "@/components/dashboard/home/campus-life/CampusLifeTable";

// =========================================================
// API RESPONSE
// =========================================================

interface CampusLifeApiResponse {
  success?: boolean;

  message?: string;

  data?:
    | CampusLifeRowData
    | CampusLifeRowData[];

  campusLife?:
    | CampusLifeRowData
    | CampusLifeRowData[];
}

// =========================================================
// PAGE
// =========================================================

export default function CampusLifePage() {
  // =======================================================
  // STATE
  // =======================================================

  const [
    campusLife,
    setCampusLife,
  ] = useState<CampusLifeRowData[]>(
    []
  );

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  // =======================================================
  // GET CAMPUS LIFE
  // =======================================================

  const fetchCampusLife =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            "/api/campus-life",
            {
              method: "GET",
              cache: "no-store",
            }
          );

        const responseText =
          await response.text();

        let result:
          | CampusLifeApiResponse
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
            "FETCH CAMPUS LIFE NON-JSON RESPONSE:",
            responseText
          );

          throw new Error(
            "Campus Life API returned an invalid response."
          );
        }

        // =================================================
        // NO DATA
        // =================================================

        if (
          response.status === 404
        ) {
          setCampusLife([]);

          return;
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
              "Failed to fetch Campus Life."
          );
        }

        // =================================================
        // DATA
        // =================================================

        const rawData =
          result.data ??
          result.campusLife ??
          [];

        const normalizedData =
          Array.isArray(
            rawData
          )
            ? rawData
            : rawData
              ? [rawData]
              : [];

        setCampusLife(
          normalizedData
        );
      } catch (error) {
        console.error(
          "FETCH CAMPUS LIFE ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch Campus Life."
        );
      }
    }, []);

  // =======================================================
  // INITIAL FETCH
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const timer =
      window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        void fetchCampusLife();
      }, 0);

    return () => {
      cancelled = true;

      window.clearTimeout(
        timer
      );
    };
  }, [
    fetchCampusLife,
  ]);

  // =======================================================
  // DELETE CAMPUS LIFE
  // =======================================================

  const handleDelete =
    async (id: string) => {
      if (!id) {
        toast.error(
          "Campus Life ID is missing."
        );

        return;
      }

      setDeletingId(id);

      try {
        const response =
          await fetch(
            `/api/campus-life/${id}`,
            {
              method: "DELETE",
            }
          );

        const responseText =
          await response.text();

        let result:
          | {
              success?: boolean;
              message?: string;
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
          console.error(
            "DELETE CAMPUS LIFE NON-JSON RESPONSE:",
            responseText
          );

          throw new Error(
            "Delete Campus Life API returned an invalid response."
          );
        }

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to delete Campus Life."
          );
        }

        setCampusLife(
          (previous) =>
            previous.filter(
              (item) =>
                item._id !== id
            )
        );

        toast.success(
          "Campus Life deleted successfully."
        );
      } catch (error) {
        console.error(
          "DELETE CAMPUS LIFE ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete Campus Life."
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
        w-full
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
        {/* =================================================
            BACK BUTTON
        ================================================= */}

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
            transition
            hover:bg-slate-50
            hover:text-[#008B45]
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Dashboard
        </Link>

        {/* =================================================
            TITLE
        ================================================= */}

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

          <div
            className="
              mt-1
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                Campus Life
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
                Manage the Campus Life
                section and the cards
                displayed on the client
                website.
              </p>
            </div>

            {/* =================================================
                ADD BUTTON
            ================================================= */}

            <Link
              href="/dashboard/home/campus-life/new"
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

              Add Campus Life
            </Link>
          </div>
        </div>
      </div>

      {/* =================================================
          CAMPUS LIFE TABLE
      ================================================= */}

      <CampusLifeTable
        data={campusLife}
        onRefresh={
          fetchCampusLife
        }
        onDelete={
          handleDelete
        }
        deletingId={
          deletingId
        }
      />
    </main>
  );
}