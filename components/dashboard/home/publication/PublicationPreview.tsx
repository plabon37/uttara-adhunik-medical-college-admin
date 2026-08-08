"use client";

import {
  Clock3,
  Download,
  FileText,
} from "lucide-react";

interface PublicationPreviewProps {
  title: string;
  category: "Journal" | "Tenders";
  description: string;
  date: string;
  time: string;
  pdf: string;
  isPublished: boolean;
  order: number;
}

export default function PublicationPreview({
  title,
  category,
  description,
  date,
  time,
  pdf,
  isPublished,
  order,
}: PublicationPreviewProps) {
  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (
    value: string
  ) => {
    if (!value) {
      return {
        day: "--",
        month: "---",
        year: "",
      };
    }

    const dateObject =
      new Date(
        `${value}T00:00:00`
      );

    if (
      Number.isNaN(
        dateObject.getTime()
      )
    ) {
      return {
        day: "--",
        month: "---",
        year: "",
      };
    }

    return {
      day: dateObject
        .getDate()
        .toString(),

      month: dateObject.toLocaleDateString(
        "en-US",
        {
          month: "short",
        }
      ),

      year: dateObject
        .getFullYear()
        .toString(),
    };
  };

  const formattedDate =
    formatDate(date);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* ==========================
          HEADER
      ========================== */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-800">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview before saving
        </p>
      </div>

      {/* ==========================
          PREVIEW CONTENT
      ========================== */}

      <div className="bg-white p-6">
        {/* Title */}

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-green-700">
            Publication
          </h2>

          <span className="text-sm font-medium text-slate-500">
            View All ↗
          </span>
        </div>

        {/* Category */}

        <div className="mt-6 flex overflow-x-auto border-b border-slate-200">
          <div
            className={`
              min-w-[140px]
              border-b-2
              px-5
              py-4
              text-center
              text-sm
              font-medium
              ${
                category ===
                "Journal"
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-slate-600"
              }
            `}
          >
            Journal
          </div>

          <div
            className={`
              min-w-[140px]
              border-b-2
              px-5
              py-4
              text-center
              text-sm
              font-medium
              ${
                category ===
                "Tenders"
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-slate-600"
              }
            `}
          >
            Tenders
          </div>
        </div>

        {/* Publication Card */}

        <div className="mt-5 overflow-hidden rounded-2xl bg-slate-100">
          <div className="flex min-h-[150px] items-center gap-5 p-5">
            {/* Date */}

            <div className="flex w-[90px] shrink-0 flex-col items-center">
              <span className="text-3xl font-bold text-slate-700">
                {formattedDate.day}
              </span>

              <span className="mt-2 flex min-w-[82px] items-center justify-center bg-green-600 px-3 py-2 text-sm font-semibold text-white">
                {formattedDate.month}
                {formattedDate.year
                  ? ` ${formattedDate.year}`
                  : ""}
              </span>
            </div>

            {/* Divider */}

            <div className="h-16 w-px bg-slate-300" />

            {/* Content */}

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-lg font-semibold text-slate-700">
                {title ||
                  "Publication Title"}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Clock3
                  size={16}
                />

                <span>
                  {time ||
                    "3.40 PM"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          {/* Badges */}

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {category}
            </span>

            {isPublished ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Published
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Unpublished
              </span>
            )}

            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              Order #{order}
            </span>
          </div>

          {/* Description */}

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {description ||
              "Publication description will appear here."}
          </p>

          {/* PDF */}

          <div className="mt-4">
            {pdf ? (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-green-700
                  transition
                  hover:bg-green-100
                "
              >
                <Download
                  size={16}
                />

                Download PDF
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                <FileText
                  size={16}
                />

                PDF not uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}