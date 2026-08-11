"use client";

import Image from "next/image";

import {
  Quote,
  Star,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

export interface StudentFeedbackPreviewData {
  name: string;

  designation: string;

  feedback: string;

  image: string;

  rating: number;

  isPublished: boolean;

  order: number;
}

interface StudentFeedbackPreviewProps {
  data: StudentFeedbackPreviewData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function StudentFeedbackPreview({
  data,
}: StudentFeedbackPreviewProps) {
  // =======================================================
  // SAFE VALUES
  // =======================================================

  const rating = Math.min(
    5,
    Math.max(
      0,
      Number(data.rating) || 0
    )
  );

  const studentName =
    data.name.trim() ||
    "Student Name";

  const designation =
    data.designation.trim() ||
    "Designation";

  const feedback =
    data.feedback.trim() ||
    "Student feedback will appear here...";

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="w-full">
      {/* =================================================
          PREVIEW HEADER
      ================================================= */}

      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
          Live Preview
        </p>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Student Feedback
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          This is how the feedback section will appear.
        </p>
      </div>

      {/* =================================================
          PREVIEW FRAME
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* =================================================
            SECTION
        ================================================= */}

        <section className="relative overflow-hidden bg-[#F7F9F8] px-5 py-10 sm:px-8 sm:py-12">
          {/* =================================================
              DECORATIVE QUOTE
          ================================================= */}

          <div className="pointer-events-none absolute right-5 top-5 text-[#008B45]/10">
            <Quote
              size={80}
              strokeWidth={1}
            />
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="relative z-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#008B45]">
              Testimonials
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Students Feedback
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-slate-500 sm:text-sm">
              You’ll find something to spark your curiosity and enhance your experience.
            </p>
          </div>

          {/* =================================================
              SINGLE PREVIEW CARD
          ================================================= */}

          <div className="relative z-10 mx-auto mt-8 max-w-xl">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] sm:p-6">
              {/* =================================================
                  QUOTE ICON
              ================================================= */}

              <div className="absolute right-5 top-5 text-[#008B45]/15">
                <Quote
                  size={42}
                  strokeWidth={1.5}
                />
              </div>

              {/* =================================================
                  RATING
              ================================================= */}

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={17}
                      strokeWidth={1.8}
                      className={
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }
                    />
                  )
                )}
              </div>

              {/* =================================================
                  FEEDBACK
              ================================================= */}

              <p className="mt-5 min-h-[120px] whitespace-pre-line text-sm leading-7 text-slate-600">
                “{feedback}”
              </p>

              {/* =================================================
                  STUDENT
              ================================================= */}

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                {/* IMAGE */}

                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#EAF5EE]">
                  {data.image ? (
                    <Image
                      src={data.image}
                      alt={studentName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#008B45]">
                      {studentName
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* NAME */}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {studentName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {designation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SLIDER DOTS
          ================================================= */}

          <div className="relative z-10 mt-7 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#008B45]" />

            <span className="h-2 w-2 rounded-full bg-slate-300" />

            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
        </section>
      </div>

      {/* =================================================
          STATUS
      ================================================= */}

      <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="text-xs font-medium text-slate-500">
          Website visibility
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
            data.isPublished
              ? "bg-[#EAF5EE] text-[#008B45]"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {data.isPublished
            ? "PUBLISHED"
            : "DRAFT"}
        </span>
      </div>
    </div>
  );
}