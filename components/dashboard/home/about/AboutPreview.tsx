"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

interface AboutPreviewProps {
  data: {
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
  };
}

export default function AboutPreview({
  data,
}: AboutPreviewProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =========================================
          PREVIEW HEADER
      ========================================= */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Live Preview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preview how the About section will
              appear on the website.
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              data.isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {data.isActive
              ? "Published"
              : "Draft"}
          </span>
        </div>
      </div>

      {/* =========================================
          WEBSITE PREVIEW
      ========================================= */}

      <div className="overflow-hidden p-4 sm:p-6">
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8">
            {/* =====================================
                LEFT IMAGES
            ===================================== */}

            <div className="relative min-h-[320px]">
              {/* IMAGE ONE */}

              <div className="absolute left-0 top-8 h-[240px] w-[62%] overflow-hidden bg-slate-100 sm:h-[300px]">
                {data.imageOne ? (
                  <img
                    src={data.imageOne}
                    alt="About UAMC"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2
                      size={40}
                      className="text-slate-300"
                    />
                  </div>
                )}
              </div>

              {/* IMAGE TWO */}

              <div className="absolute right-0 top-0 h-[240px] w-[48%] overflow-hidden bg-slate-100 sm:h-[300px]">
                {data.imageTwo ? (
                  <img
                    src={data.imageTwo}
                    alt="UAMC Campus"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2
                      size={40}
                      className="text-slate-300"
                    />
                  </div>
                )}
              </div>

              {/* LOGO */}

              {data.logo && (
                <div className="absolute left-[38%] top-[115px] z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-lg sm:left-[36%] sm:top-[145px] sm:h-36 sm:w-36">
                  <img
                    src={data.logo}
                    alt="UAMC Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* =====================================
                RIGHT CONTENT
            ===================================== */}

            <div className="flex flex-col justify-center">
              {/* TAGLINE */}

              <div className="flex items-center gap-2 text-sm font-medium text-[#008B45]">
                <GraduationCap
                  size={22}
                  strokeWidth={1.7}
                />

                <span>
                  {data.tagline ||
                    "knowledge meets innovation"}
                </span>
              </div>

              {/* TITLE */}

              <h3 className="mt-5 font-serif text-4xl leading-[1.05] text-slate-800 sm:text-5xl">
                {data.title || "About"}{" "}
                <span className="font-bold text-[#F5B82E]">
                  {data.highlightText ||
                    "UAMC"}
                </span>
              </h3>

              {/* DESCRIPTION ONE */}

              <p className="mt-6 text-sm leading-7 text-slate-500 sm:text-base">
                {data.descriptionOne ||
                  "The first About UAMC description will appear here."}
              </p>

              {/* DESCRIPTION TWO */}

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                {data.descriptionTwo ||
                  "The second About UAMC description will appear here."}
              </p>

              {/* =================================
                  MISSION + VISION
              ================================= */}

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {/* MISSION */}

                <Link
                  href={
                    data.missionLink ||
                    "#"
                  }
                  className="
                    group
                    flex
                    min-h-[100px]
                    items-center
                    gap-4
                    border
                    border-dashed
                    border-[#008B45]
                    px-4
                    py-4
                    transition
                    hover:bg-emerald-50
                  "
                >
                  <GraduationCap
                    size={42}
                    strokeWidth={1.3}
                    className="shrink-0 text-[#008B45]"
                  />

                  <span className="text-sm font-medium leading-6 text-[#008B45]">
                    {data.missionTitle ||
                      "College Mission Statement"}
                  </span>

                  <ArrowRight
                    size={18}
                    className="ml-auto shrink-0 text-[#008B45] opacity-0 transition group-hover:opacity-100"
                  />
                </Link>

                {/* VISION */}

                <Link
                  href={
                    data.visionLink ||
                    "#"
                  }
                  className="
                    group
                    flex
                    min-h-[100px]
                    items-center
                    gap-4
                    border
                    border-dashed
                    border-[#008B45]
                    px-4
                    py-4
                    transition
                    hover:bg-emerald-50
                  "
                >
                  <Building2
                    size={42}
                    strokeWidth={1.3}
                    className="shrink-0 text-[#008B45]"
                  />

                  <span className="text-sm font-medium leading-6 text-[#008B45]">
                    {data.visionTitle ||
                      "College Vision Achievement"}
                  </span>

                  <ArrowRight
                    size={18}
                    className="ml-auto shrink-0 text-[#008B45] opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              </div>

              {/* =================================
                  PROGRAM BUTTON
              ================================= */}

              <div className="mt-7">
                <Link
                  href={
                    data.buttonLink ||
                    "#"
                  }
                  className="
                    inline-flex
                    items-center
                    gap-3
                    bg-[#008B45]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#00763B]
                  "
                >
                  {data.buttonText ||
                    "View Our Program"}

                  <ArrowRight size={19} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            PREVIEW NOTE
        ========================================= */}

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3">
          <Lightbulb
            size={17}
            className="mt-0.5 shrink-0 text-amber-500"
          />

          <p className="text-xs leading-5 text-slate-500">
            This is a live preview. Changes made
            in the form will be reflected here
            before saving.
          </p>
        </div>
      </div>
    </div>
  );
}