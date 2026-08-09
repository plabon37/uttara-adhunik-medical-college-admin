"use client";

import {
  Search,
  ArrowRight,
  Building2,
} from "lucide-react";

import type {
  DepartmentFormData,
} from "./DepartmentForm";

// =========================================================
// PROPS
// =========================================================

interface DepartmentPreviewProps {
  data: DepartmentFormData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentPreview({
  data,
}: DepartmentPreviewProps) {
  // =======================================================
  // FALLBACK IMAGE
  // =======================================================

  const imageOne =
    data.image ||
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80";

  const imageTwo =
    data.image ||
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80";

  // =======================================================
  // DEPARTMENT NAME
  // =======================================================

  const departmentName =
    data.name ||
    "Department Name";

  // =======================================================
  // DESCRIPTION
  // =======================================================

  const description =
    data.description ||
    "Explore our academic departments and find the right program for your educational journey.";

  return (
    <div className="w-full">
      {/* ===================================================
          PREVIEW LABEL
      =================================================== */}

      <div className="mb-4 flex items-center justify-between">
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
            Find Your Department
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[#E8F7F0]
            px-3
            py-1
            text-xs
            font-semibold
            text-[#008B45]
          "
        >
          Website Preview
        </span>
      </div>

      {/* ===================================================
          WEBSITE SECTION
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
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            grid
            gap-10
            px-6
            py-10
            sm:px-8
            sm:py-12
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-12
            lg:px-10
            lg:py-14
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
                  w-10
                  bg-[#008B45]
                "
              />

              <span
                className="
                  text-[11px]
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
                mt-5
                max-w-[560px]
                font-serif
                text-4xl
                font-normal
                leading-[1.08]
                text-slate-800
                sm:text-5xl
              "
            >
              Find Your
              <span className="text-[#008B45]">
                {" "}
                Department
              </span>
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-[540px]
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              {description}
            </p>

            {/* =============================================
                SEARCH BOX
            ============================================= */}

            <div className="mt-7">
              <div
                className="
                  flex
                  h-14
                  w-full
                  max-w-[520px]
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  shadow-sm
                "
              >
                <Search
                  size={19}
                  className="shrink-0 text-slate-400"
                />

                <span
                  className="
                    flex-1
                    truncate
                    text-sm
                    text-slate-400
                  "
                >
                  Search for a department...
                </span>

                <button
                  type="button"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#008B45]
                    text-white
                  "
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            {/* =============================================
                POPULAR SEARCHES
            ============================================= */}

            {data.isPopular && (
              <div className="mt-5">
                <p
                  className="
                    text-xs
                    font-semibold
                    text-slate-400
                  "
                >
                  Popular
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className="
                      rounded-full
                      border
                      border-[#008B45]/20
                      bg-[#E8F7F0]
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-[#008B45]
                    "
                  >
                    {departmentName}
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-1.5
                      text-xs
                      text-slate-500
                    "
                  >
                    Medical
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-1.5
                      text-xs
                      text-slate-500
                    "
                  >
                    Clinical
                  </span>
                </div>
              </div>
            )}

            {/* =============================================
                FEATURED DEPARTMENT
            ============================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#008B45]
                  text-white
                "
              >
                <Building2 size={18} />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Featured Department
                </p>

                <p
                  className="
                    mt-0.5
                    text-sm
                    font-bold
                    text-slate-700
                  "
                >
                  {departmentName}
                </p>
              </div>
            </div>
          </div>

          {/* ===============================================
              RIGHT IMAGE AREA
          =============================================== */}

          <div
            className="
              relative
              min-h-[390px]
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
                h-[270px]
                w-[72%]
                overflow-hidden
                rounded-[28px]
                border-8
                border-white
                shadow-lg
              "
            >
              <img
                src={imageOne}
                alt="Department preview"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* =============================================
                IMAGE TWO
            ============================================= */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[220px]
                w-[58%]
                overflow-hidden
                rounded-[28px]
                border-8
                border-white
                shadow-lg
              "
            >
              <img
                src={imageTwo}
                alt="Department preview"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* =============================================
                COUNT BADGE
            ============================================= */}

            <div
              className="
                absolute
                bottom-8
                right-4
                z-10
                rounded-2xl
                bg-[#008B45]
                px-6
                py-5
                text-white
                shadow-xl
              "
            >
              <p
                className="
                  font-serif
                  text-3xl
                  font-normal
                  leading-none
                "
              >
                28+
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-white/80
                "
              >
                Departments
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIVE STATUS
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
              text-xs
              text-slate-400
            "
          >
            Department visibility
          </span>

          <span
            className={`
              inline-flex
              items-center
              gap-2
              text-xs
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
                h-2
                w-2
                rounded-full
                ${
                  data.isActive
                    ? "bg-[#008B45]"
                    : "bg-red-500"
                }
              `}
            />

            {data.isActive
              ? "Published"
              : "Draft"}
          </span>
        </div>
      </div>
    </div>
  );
}