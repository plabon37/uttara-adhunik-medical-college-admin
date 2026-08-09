"use client";

import {
  ArrowRight,
  Building2,
  Search,
} from "lucide-react";

import type {
  DepartmentSectionFormData,
} from "./DepartmentSectionForm";

// =========================================================
// PROPS
// =========================================================

interface DepartmentSectionPreviewProps {
  data: DepartmentSectionFormData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSectionPreview({
  data,
}: DepartmentSectionPreviewProps) {
  // =======================================================
  // FALLBACK DATA
  // =======================================================

  const title =
    data.title ||
    "Find Your Department";

  const description =
    data.description ||
    "Explore our academic departments and find the right program for your educational journey.";

  const searchPlaceholder =
    data.searchPlaceholder ||
    "Search for a department...";

  const studentCount =
    data.studentCount ||
    "28+";

  const studentCountText =
    data.studentCountText ||
    "Departments";

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="w-full">
      {/* ===================================================
          PREVIEW HEADER
      =================================================== */}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#008B45]
            "
          >
            Live Preview
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              text-slate-800
            "
          >
            Department Section
          </h2>
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1.5
            text-xs
            font-semibold
            ${
              data.isActive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {data.isActive
            ? "Published"
            : "Draft"}
        </span>
      </div>

      {/* ===================================================
          WEBSITE PREVIEW
      =================================================== */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-[#F7F8F5]
          shadow-sm
        "
      >
        {/* =================================================
            MAIN SECTION
        ================================================= */}

        <div
          className="
            grid
            gap-8
            px-6
            py-8
            sm:px-8
            sm:py-10
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-10
            lg:px-10
            lg:py-12
          "
        >
          {/* ===============================================
              LEFT CONTENT
          =============================================== */}

          <div className="flex flex-col justify-center">
            {/* SMALL LABEL */}

            <div className="flex items-center gap-3">
              <span
                className="
                  h-px
                  w-8
                  bg-[#008B45]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#008B45]
                "
              >
                Explore
              </span>
            </div>

            {/* TITLE */}

            <h3
              className="
                mt-4
                font-serif
                text-3xl
                font-normal
                leading-[1.1]
                text-slate-800
                sm:text-4xl
              "
            >
              {title}
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-slate-500
              "
            >
              {description}
            </p>

            {/* SEARCH */}

            <div
              className="
                mt-6
                flex
                h-12
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                shadow-sm
              "
            >
              <Search
                size={17}
                className="
                  shrink-0
                  text-slate-400
                "
              />

              <span
                className="
                  min-w-0
                  flex-1
                  truncate
                  text-xs
                  text-slate-400
                "
              >
                {searchPlaceholder}
              </span>

              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#008B45]
                  text-white
                "
              >
                <ArrowRight size={15} />
              </button>
            </div>

            {/* POPULAR SEARCHES */}

            {data.popularSearches
              ?.length > 0 && (
              <div className="mt-5">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Popular Searches
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {data.popularSearches
                    .slice(0, 5)
                    .map(
                      (
                        search,
                        index
                      ) => (
                        <span
                          key={`${search}-${index}`}
                          className="
                            rounded-full
                            bg-[#E8F7F0]
                            px-2.5
                            py-1.5
                            text-[10px]
                            font-medium
                            text-[#008B45]
                          "
                        >
                          {search}
                        </span>
                      )
                    )}
                </div>
              </div>
            )}
          </div>

          {/* ===============================================
              RIGHT IMAGE AREA
          =============================================== */}

          <div
            className="
              relative
              min-h-[330px]
            "
          >
            {/* =============================================
                IMAGE ONE
            ============================================= */}

            <div
              className="
                absolute
                right-0
                top-0
                h-[220px]
                w-[72%]
                overflow-hidden
                rounded-[24px]
                border-8
                border-white
                bg-slate-200
                shadow-lg
              "
            >
              {data.imageOne ? (
                <img
                  src={data.imageOne}
                  alt="Department section image one"
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
                    w-full
                    items-center
                    justify-center
                    bg-slate-100
                    text-slate-400
                  "
                >
                  <Building2 size={38} />
                </div>
              )}
            </div>

            {/* =============================================
                IMAGE TWO
            ============================================= */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[180px]
                w-[58%]
                overflow-hidden
                rounded-[24px]
                border-8
                border-white
                bg-slate-200
                shadow-lg
              "
            >
              {data.imageTwo ? (
                <img
                  src={data.imageTwo}
                  alt="Department section image two"
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
                    w-full
                    items-center
                    justify-center
                    bg-slate-100
                    text-slate-400
                  "
                >
                  <Building2 size={32} />
                </div>
              )}
            </div>

            {/* =============================================
                STATISTICS BADGE
            ============================================= */}

            <div
              className="
                absolute
                bottom-5
                right-2
                z-10
                rounded-2xl
                bg-[#008B45]
                px-5
                py-4
                text-white
                shadow-xl
              "
            >
              <p
                className="
                  font-serif
                  text-2xl
                  font-normal
                  leading-none
                "
              >
                {studentCount}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  font-medium
                  text-white/80
                "
              >
                {studentCountText}
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER STATUS
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-slate-200
            bg-white
            px-6
            py-3
            sm:px-8
          "
        >
          <span
            className="
              text-[10px]
              text-slate-400
            "
          >
            Website section preview
          </span>

          <span
            className={`
              flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              ${
                data.isActive
                  ? "text-[#008B45]"
                  : "text-red-500"
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${
                  data.isActive
                    ? "bg-[#008B45]"
                    : "bg-red-500"
                }
              `}
            />

            {data.isActive
              ? "Visible on website"
              : "Hidden from website"}
          </span>
        </div>
      </div>
    </div>
  );
}