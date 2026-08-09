"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import AboutForm from "@/components/dashboard/home/about/AboutForm";
import AboutPreview from "@/components/dashboard/home/about/AboutPreview";
import type { AboutData } from "@/components/dashboard/home/about/AboutTableRow";

export default function EditAboutPage() {
  const router = useRouter();
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  const [about, setAbout] =
    useState<AboutData | null>(null);

  const [previewData, setPreviewData] =
    useState<AboutData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH ABOUT
  // =========================================

  useEffect(() => {
    if (!id) {
      return;
    }

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

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch About section."
          );
        }

        setAbout(data.data);
        setPreviewData(data.data);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH ABOUT FOR EDIT ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load About section."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAbout();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =========================================
  // LIVE PREVIEW CHANGE
  // =========================================

  const handlePreviewChange = useCallback(
    (data: {
      tagline: string;
      title: string;
      highlightText: string;
      descriptionOne: string;
      descriptionTwo: string;
      imageOne: string;
      imageTwo: string;
      logo: string;
      missionTitle: string;
      missionLink: string;
      visionTitle: string;
      visionLink: string;
      buttonText: string;
      buttonLink: string;
      isActive: boolean;
    }) => {
      setPreviewData((previous) => {
        if (!previous) {
          return null;
        }

        return {
          ...previous,
          ...data,
        };
      });
    },
    []
  );

  // =========================================
  // SUCCESS
  // =========================================

  const handleSuccess = useCallback(
    (updatedData: AboutData) => {
      setAbout(updatedData);
      setPreviewData(updatedData);

      toast.success(
        "About section updated successfully."
      );

      router.push(
        "/dashboard/home/about"
      );
    },
    [router]
  );

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center p-6">
        <div className="flex flex-col items-center">
          <Loader2
            size={32}
            className="animate-spin text-[#008B45]"
          />

          <p className="mt-3 text-sm text-slate-500">
            Loading About section...
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // NOT FOUND
  // =========================================

  if (!about || !previewData) {
    return (
      <div className="flex min-h-[500px] w-full flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-semibold text-slate-800">
          About Section Not Found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The About section could not be loaded.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/about"
            )
          }
          className="
            mt-5
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
          <ArrowLeft size={17} />

          Back to About
        </button>
      </div>
    );
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="mx-auto w-full max-w-[1800px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* =========================================
            BACK BUTTON
        ========================================= */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/home/about"
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-[#008B45]
          "
        >
          <ArrowLeft size={17} />

          Back to About
        </button>

        {/* =========================================
            HEADER
        ========================================= */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Edit About UAMC
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Update the About section of the
            website.
          </p>
        </div>

        {/* =========================================
            FORM + PREVIEW
        ========================================= */}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
          {/* FORM */}

          <div className="min-w-0">
            <AboutForm
              initialData={about}
              onDataChange={handlePreviewChange}
              onSuccess={handleSuccess}
            />
          </div>

          {/* LIVE PREVIEW */}

          <div className="min-w-0 xl:sticky xl:top-6">
            <AboutPreview
              data={previewData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}