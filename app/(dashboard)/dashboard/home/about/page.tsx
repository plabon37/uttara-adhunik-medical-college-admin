"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AboutLoading from "@/components/dashboard/home/about/AboutLoading";
import AboutEmpty from "@/components/dashboard/home/about/AboutEmpty";
import AboutTable from "@/components/dashboard/home/about/AboutTable";
import type { AboutData } from "@/components/dashboard/home/about/AboutTableRow";

export default function AboutPage() {
  const router = useRouter();

  const [about, setAbout] =
    useState<AboutData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // LOAD ABOUT
  // =========================================

  useEffect(() => {
    let cancelled = false;

    const loadAbout = async () => {
      try {
        const response = await fetch(
          "/api/about",
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (cancelled) {
          return;
        }

        // =====================================
        // ABOUT NOT FOUND
        // =====================================

        if (response.status === 404) {
          setAbout(null);
          setLoading(false);
          return;
        }

        // =====================================
        // API ERROR
        // =====================================

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch About section."
          );
        }

        // =====================================
        // SUCCESS
        // =====================================

        setAbout(data.data);
        setLoading(false);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH ABOUT ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch About section."
        );

        setLoading(false);
      }
    };

    loadAbout();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================================
  // DELETE CALLBACK
  // =========================================

  const handleDelete = () => {
    setAbout(null);
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
        <AboutLoading />
      </div>
    );
  }

  // =========================================
  // EMPTY
  // =========================================

  if (!about) {
    return (
      <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT SIDE */}

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              About UAMC
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage the About section of the
              website.
            </p>
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-wrap items-center gap-3">
            {/* BACK TO DASHBOARD */}

            <button
              type="button"
              onClick={() =>
                router.push("/dashboard")
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

              Back to Dashboard
            </button>

            {/* CREATE BUTTON */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/home/about/new"
                )
              }
              className="
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
                shadow-sm
                transition
                hover:bg-[#00763B]
                hover:shadow-md
              "
            >
              <Plus size={18} />

              Create About
            </button>
          </div>
        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        <AboutEmpty />
      </div>
    );
  }

  // =========================================
  // DATA AVAILABLE
  // =========================================

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            About UAMC
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Manage the About section of the
            website.
          </p>
        </div>

        {/* =====================================
            RIGHT SIDE BUTTONS
        ===================================== */}

        <div className="flex flex-wrap items-center gap-3">
          {/* ===================================
              BACK TO DASHBOARD
          =================================== */}

          <button
            type="button"
            onClick={() =>
              router.push("/dashboard")
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

            Back to Dashboard
          </button>

          {/* ===================================
              EDIT ABOUT
          =================================== */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/about/edit/${about._id}`
              )
            }
            className="
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
              shadow-sm
              transition
              hover:bg-[#00763B]
              hover:shadow-md
            "
          >
            <Edit3 size={17} />

            Edit About
          </button>
        </div>
      </div>

      {/* =====================================
          ABOUT TABLE
      ===================================== */}

      <AboutTable
        about={about}
        onDelete={handleDelete}
      />
    </div>
  );
}