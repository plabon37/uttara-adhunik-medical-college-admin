"use client";

import { ArrowRight, Image as ImageIcon } from "lucide-react";

import type { AdmissionFormData } from "./AdmissionForm";

// =================================================
// PROPS
// =================================================

interface AdmissionPreviewProps {
  data: AdmissionFormData;
}

// =================================================
// COMPONENT
// =================================================

export default function AdmissionPreview({
  data,
}: AdmissionPreviewProps) {
  const titlePrefix = data.titlePrefix || "UAMC";
  const title = data.title || "Admission";
  const description =
    data.description ||
    "Your Admission section description will appear here.";
  const buttonText = data.buttonText || "Learn More";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =================================================
          PREVIEW HEADER
      ================================================= */}

      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Live Preview
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Preview how the Admission section will appear on the website.
          </p>
        </div>

        {/* STATUS */}

        <span
          className={`inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
            data.isActive
              ? "bg-emerald-50 text-[#008B45] ring-1 ring-inset ring-emerald-600/20"
              : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10"
          }`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              data.isActive ? "bg-[#008B45]" : "bg-slate-400"
            }`}
          />

          {data.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* =================================================
          WEBSITE PREVIEW
      ================================================= */}

      <div className="p-4 sm:p-6">
        <div className="relative min-h-[430px] overflow-hidden bg-[#004F2B]">
          {/* =================================================
              BACKGROUND IMAGE
          ================================================= */}

          {data.backgroundImage ? (
            <img
              src={data.backgroundImage}
              alt="Admission section preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#005B32]">
              <div className="flex flex-col items-center text-center text-white/60">
                <ImageIcon size={42} strokeWidth={1.4} />

                <p className="mt-3 text-sm">
                  Background image preview
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              IMAGE OVERLAY
          ================================================= */}

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-[#004F2B]/35" />

          {/* =================================================
              PREVIEW CONTENT
          ================================================= */}

          <div className="relative z-10 flex min-h-[430px] items-center justify-center px-6 py-16 text-center sm:px-10">
            <div className="w-full max-w-[850px]">
              {/* =================================================
                  TITLE
              ================================================= */}

              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                <span className="text-[#FFC72C]">
                  {titlePrefix}
                </span>

                <span className="ml-3 text-white">
                  {title}
                </span>
              </h1>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="mx-auto mt-6 max-w-[760px] text-sm leading-7 text-white/90 sm:text-base lg:text-lg">
                {description}
              </p>

              {/* =================================================
                  BUTTON
              ================================================= */}

              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={(event) => event.preventDefault()}
                  className="group inline-flex items-center gap-3 bg-[#FFC72C] px-7 py-3.5 text-sm font-bold text-[#111111] transition-all duration-200 hover:bg-[#FFD84D] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFC72C]/50 sm:px-8 sm:py-4 sm:text-base"
                >
                  <span>{buttonText}</span>

                  <ArrowRight
                    size={20}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}