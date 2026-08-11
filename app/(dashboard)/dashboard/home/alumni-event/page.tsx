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

import AlumniEventTable, {
  AlumniEventRowData,
} from "@/components/dashboard/home/alumni-event/AlumniEventTable";

// =========================================================
// API RESPONSE
// =========================================================

interface AlumniEventApiResponse {
  success?: boolean;

  message?: string;

  data?:
    | AlumniEventRowData
    | AlumniEventRowData[];

  alumniEvents?:
    | AlumniEventRowData
    | AlumniEventRowData[];
}

// =========================================================
// PAGE
// =========================================================

export default function AlumniEventPage() {
  // =======================================================
  // STATE
  // =======================================================

  const [events, setEvents] =
    useState<AlumniEventRowData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // =======================================================
  // GET ALUMNI EVENTS
  // =======================================================

  const fetchAlumniEvents =
    useCallback(async () => {
      setLoading(true);

      try {
        const response =
          await fetch(
            "/api/alumni-events",
            {
              method: "GET",
              cache: "no-store",
            }
          );

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
              "Failed to fetch Alumni Events."
          );
        }

        // =================================================
        // NORMALIZE DATA
        // =================================================

        const rawData =
          result.data ??
          result.alumniEvents ??
          [];

        const normalizedData =
          Array.isArray(rawData)
            ? rawData
            : rawData
              ? [rawData]
              : [];

        // =================================================
        // SORT
        // =================================================

        const sortedData =
          [...normalizedData].sort(
            (a, b) =>
              Number(a.order ?? 0) -
              Number(b.order ?? 0)
          );

        setEvents(
          sortedData
        );
      } catch (error) {
        console.error(
          "FETCH ALUMNI EVENTS ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch Alumni Events."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  // =======================================================
  // INITIAL FETCH
  // =======================================================

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void fetchAlumniEvents();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchAlumniEvents]);

  // =======================================================
  // DELETE ALUMNI EVENT
  // =======================================================

  const handleDelete = async (
    id: string
  ) => {
    if (!id) {
      toast.error(
        "Alumni Event ID is missing."
      );

      return;
    }

    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Alumni Event?"
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      const response =
        await fetch(
          `/api/alumni-events/${id}`,
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
        throw new Error(
          "Delete Alumni Event API returned an invalid response."
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
            "Failed to delete Alumni Event."
        );
      }

      // ===================================================
      // REMOVE FROM TABLE
      // ===================================================

      setEvents(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !== id
          )
      );

      toast.success(
        "Alumni Event deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE ALUMNI EVENT ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete Alumni Event."
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
            gap-4
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
              hover:text-[#008B45]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Dashboard
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

            <div
              className="
                mt-1
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
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
                  Alumni Event
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
                  Manage the Alumni Event
                  section and the events
                  displayed on the client
                  website.
                </p>
              </div>

              {/* ADD BUTTON */}

              <Link
                href="/dashboard/home/alumni-event/new"
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

                Add Alumni Event
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <AlumniEventTable
          data={events}
          loading={loading}
          onRefresh={
            fetchAlumniEvents
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