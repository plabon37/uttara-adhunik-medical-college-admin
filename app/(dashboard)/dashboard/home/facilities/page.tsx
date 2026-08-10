"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import FacilitiesLoading from "@/components/dashboard/home/facilities/FacilitiesLoading";
import FacilitiesEmpty from "@/components/dashboard/home/facilities/FacilitiesEmpty";
import type {
  FacilitiesPreviewData,
  FacilityItem,
} from "@/components/dashboard/home/facilities/FacilitiesForm";

/* =========================================================
   PAGE
========================================================= */

export default function FacilitiesPage() {
  const router = useRouter();

  const [facilities, setFacilities] =
    useState<FacilitiesPreviewData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  /* =======================================================
     LOAD FACILITIES
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadFacilities = async () => {
      try {
        const response = await fetch(
          "/api/facilities",
          {
            cache: "no-store",
          }
        );

        const data =
          await response.json();

        if (cancelled) {
          return;
        }

        /* -----------------------------------------------
           NOT FOUND
        ------------------------------------------------ */

        if (response.status === 404) {
          setFacilities(null);
          setLoading(false);
          return;
        }

        /* -----------------------------------------------
           API ERROR
        ------------------------------------------------ */

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch Facilities section."
          );
        }

        /* -----------------------------------------------
           SUCCESS
        ------------------------------------------------ */

        setFacilities(data.data);
        setLoading(false);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "FETCH FACILITIES ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch Facilities section."
        );

        setLoading(false);
      }
    };

    loadFacilities();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     DELETE FACILITIES
  ======================================================= */

  const handleDelete = async () => {
    if (!facilities?._id) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete the Facilities section? This action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `/api/facilities?id=${facilities._id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to delete Facilities section."
        );
      }

      toast.success(
        "Facilities section deleted successfully."
      );

      setFacilities(null);
    } catch (error) {
      console.error(
        "DELETE FACILITIES ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete Facilities section."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="w-full">
        <FacilitiesLoading />
      </div>
    );
  }

  /* =======================================================
     EMPTY
  ======================================================= */

  if (!facilities) {
    return (
      <div className="w-full">
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-6
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
              Facilities
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                sm:text-base
              "
            >
              Manage the Facilities section
              of the website.
            </p>
          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap gap-3">
            {/* BACK */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard"
                )
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

            {/* CREATE */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/home/facilities/new"
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

              Create Facilities
            </button>
          </div>
        </div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        <FacilitiesEmpty />
      </div>
    );
  }

  /* =======================================================
     SORT FACILITIES
  ======================================================= */

  const sortedFacilities = [
    ...(facilities.facilities || []),
  ].sort(
    (a, b) =>
      (a.order ?? 0) -
      (b.order ?? 0)
  );

  /* =======================================================
     DATA AVAILABLE
  ======================================================= */

  return (
    <div className="w-full">
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          mb-6
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
            Facilities
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
            "
          >
            Manage the Facilities section
            of the website.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap gap-3">
          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard"
              )
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

          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/home/facilities/edit/${facilities._id}`
              )
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-50
              px-5
              py-3
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            <Edit3 size={17} />

            Edit
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-50
              px-5
              py-3
              text-sm
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleteLoading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={17} />
            )}

            {deleteLoading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="space-y-6">
        {/* =================================================
            OVERVIEW CARD
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              grid
              gap-0
              lg:grid-cols-[280px_1fr]
            "
          >
            {/* IMAGE */}

            <div className="h-[240px] lg:h-full">
              {facilities.image ? (
                <img
                  src={facilities.image}
                  alt={
                    facilities.title ||
                    "Facilities"
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    min-h-[240px]
                    items-center
                    justify-center
                    bg-slate-100
                    text-sm
                    text-slate-400
                  "
                >
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}

            <div className="p-6 sm:p-8">
              {/* TAGLINE */}

              {facilities.tagline && (
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#008B45]
                  "
                >
                  {facilities.tagline}
                </p>
              )}

              {/* TITLE */}

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >
                {facilities.title ||
                  "Our Facilities"}
              </h2>

              {/* STATUS */}

              <div className="mt-4">
                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    ${
                      facilities.isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {facilities.isActive
                    ? "Published"
                    : "Draft"}
                </span>
              </div>

              {/* PROGRAM BUTTON INFO */}

              <div
                className="
                  mt-6
                  rounded-xl
                  bg-slate-50
                  p-4
                "
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Program Button
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {facilities.programButtonText ||
                    "View Our Program"}
                </p>

                <p className="mt-1 break-all text-xs text-slate-400">
                  {facilities.programButtonLink ||
                    "#"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            FACILITIES LIST
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* TABLE HEADER */}

          <div
            className="
              border-b
              border-slate-200
              px-5
              py-5
              sm:px-6
            "
          >
            <h2 className="text-lg font-semibold text-slate-800">
              Facilities List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {sortedFacilities.length}{" "}
              {sortedFacilities.length ===
              1
                ? "facility"
                : "facilities"}{" "}
              configured.
            </p>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedFacilities.map(
                  (
                    facility: FacilityItem,
                    index
                  ) => (
                    <tr
                      key={
                        facility._id ||
                        `facility-${index}`
                      }
                      className="
                        border-b
                        border-slate-100
                        last:border-b-0
                      "
                    >
                      <td className="px-6 py-5">
                        <span
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-emerald-50
                            text-xs
                            font-bold
                            text-[#008B45]
                          "
                        >
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-800">
                          {facility.name ||
                            "—"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium text-slate-700">
                          {facility.title ||
                            "—"}
                        </p>
                      </td>

                      <td className="max-w-[360px] px-6 py-5">
                        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                          {facility.description ||
                            "—"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className="
                            inline-flex
                            rounded-lg
                            bg-blue-50
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-blue-600
                          "
                        >
                          {facility.detailsText ||
                            "View Details"}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE / TABLET CARDS */}

          <div className="grid gap-4 p-4 lg:hidden">
            {sortedFacilities.map(
              (
                facility: FacilityItem,
                index
              ) => (
                <div
                  key={
                    facility._id ||
                    `facility-mobile-${index}`
                  }
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/50
                    p-4
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-emerald-50
                          text-sm
                          font-bold
                          text-[#008B45]
                        "
                      >
                        {index + 1}
                      </span>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {facility.name ||
                            "Unnamed Facility"}
                        </h3>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {facility.title ||
                            "No title"}
                        </p>
                      </div>
                    </div>

                    <span
                      className="
                        shrink-0
                        rounded-lg
                        bg-blue-50
                        px-2.5
                        py-1.5
                        text-xs
                        font-semibold
                        text-blue-600
                      "
                    >
                      {facility.detailsText ||
                        "Details"}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {facility.description ||
                      "No description available."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}