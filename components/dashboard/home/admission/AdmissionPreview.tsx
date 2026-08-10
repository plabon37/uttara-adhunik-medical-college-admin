"use client";

import {
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

import type {
  AdmissionFormData,
} from "./AdmissionForm";

// =========================================================
// PROPS
// =========================================================

interface AdmissionPreviewProps {
  data: AdmissionFormData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AdmissionPreview({
  data,
}: AdmissionPreviewProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* =================================================
          PREVIEW HEADER
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-gray-200
          px-5
          py-4
          sm:px-6
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Live Preview
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-gray-500
            "
          >
            Preview how the Admission
            section will appear on the
            website.
          </p>
        </div>

        {/* STATUS */}

        <span
          className={`
            rounded-full
            px-3
            py-1.5
            text-xs
            font-semibold
            ${
              data.isActive
                ? "bg-[#E8F7F0] text-[#008B45]"
                : "bg-gray-100 text-gray-500"
            }
          `}
        >
          {data.isActive
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {/* =================================================
          WEBSITE PREVIEW
      ================================================= */}

      <div className="p-4 sm:p-6">
        <div
          className="
            relative
            min-h-[430px]
            overflow-hidden
            bg-[#004F2B]
          "
        >
          {/* =================================================
              BACKGROUND IMAGE
          ================================================= */}

          {data.backgroundImage ? (
            <img
              src={
                data.backgroundImage
              }
              alt="Admission preview"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-[#005B32]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-white/60
                "
              >
                <ImageIcon
                  size={42}
                  strokeWidth={1.4}
                />

                <p
                  className="
                    mt-3
                    text-sm
                  "
                >
                  Background image
                  preview
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              DARK OVERLAY
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-black/45
            "
          />

          {/* =================================================
              GREEN COLOR OVERLAY
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-[#004F2B]/35
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[430px]
              items-center
              justify-center
              px-6
              py-16
              text-center
              sm:px-10
            "
          >
            <div
              className="
                w-full
                max-w-[850px]
              "
            >
              {/* =================================================
                  TITLE
              ================================================= */}

              <h1
                className="
                  font-serif
                  text-4xl
                  font-bold
                  leading-tight
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                <span
                  className="
                    text-[#FFC72C]
                  "
                >
                  {data.titlePrefix ||
                    "UAMC"}
                </span>

                <span
                  className="
                    ml-3
                    text-white
                  "
                >
                  {data.title ||
                    "Admission"}
                </span>
              </h1>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-[760px]
                  text-sm
                  leading-7
                  text-white/90
                  sm:text-base
                  lg:text-lg
                "
              >
                {data.description ||
                  "Your Admission section description will appear here."}
              </p>

              {/* =================================================
                  BUTTON
              ================================================= */}

              <div
                className="
                  mt-9
                  flex
                  justify-center
                "
              >
                <a
                  href={
                    data.buttonLink ||
                    "#"
                  }
                  onClick={(event) =>
                    event.preventDefault()
                  }
                  className="
                    inline-flex
                    items-center
                    gap-3
                    bg-[#FFC72C]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-[#111111]
                    transition
                    hover:bg-[#FFD84D]
                    sm:px-8
                    sm:py-4
                    sm:text-base
                  "
                >
                  {data.buttonText ||
                    "Learn More"}

                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}