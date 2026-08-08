"use client";

import {
  Clock3,
  ExternalLink,
} from "lucide-react";

interface NoticePreviewProps {
  title: string;
  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";
  description: string;
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
}

const categories = [
  "General Notice",
  "Admission Notice",
  "Reports",
  "Job Circular",
];

export default function NoticePreview({
  title,
  category,
  description,
  pdf,
  date,
  time,
  isPublished,
  order,
}: NoticePreviewProps) {
  const formattedDate = date
    ? new Date(`${date}T00:00:00`)
    : null;

  const day = formattedDate
    ? formattedDate.getDate()
    : "--";

  const month = formattedDate
    ? formattedDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
        }
      )
    : "---";

  const year = formattedDate
    ? formattedDate.getFullYear()
    : "----";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =========================
          HEADER
      ========================= */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-800">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview before saving
        </p>
      </div>

      {/* =========================
          NOTICE BOARD
      ========================= */}

      <div className="bg-white p-5 sm:p-6">
        {/* Heading */}

        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl font-bold text-green-700 sm:text-3xl">
            Notice Board
          </h1>

          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-green-700">
            View All
            <ExternalLink size={15} />
          </span>
        </div>

        {/* =========================
            CATEGORY TABS
        ========================= */}

        <div className="mt-6 overflow-x-auto">
          <div className="flex min-w-max rounded-none bg-slate-100 p-1">
            {categories.map((item) => {
              const active =
                item === category;

              return (
                <div
                  key={item}
                  className={`
                    min-w-[150px]
                    px-4
                    py-4
                    text-center
                    text-sm
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-white font-bold text-green-700 shadow-sm"
                        : "text-slate-700"
                    }
                  `}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================
            SINGLE NOTICE PREVIEW
        ========================= */}

        <div className="mt-4">
          <div className="flex min-h-[145px] gap-4 bg-slate-100 p-5">
            {/* Date */}

            <div className="flex w-[95px] shrink-0 flex-col justify-center">
              <span className="text-3xl font-bold text-slate-700">
                {day}
              </span>

              <span className="mt-2 bg-green-600 px-3 py-2 text-center text-sm font-bold text-white">
                {month}{" "}
                {year
                  .toString()
                  .slice(-2)}
              </span>
            </div>

            {/* Content */}

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="line-clamp-2 text-base font-medium leading-6 text-slate-700 sm:text-lg">
                {title ||
                  "Your notice title will appear here"}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Clock3 size={17} />

                <span>
                  {time || "3.40 PM"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            PREVIEW INFORMATION
        ========================= */}

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {category}
            </span>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {isPublished
                ? "Published"
                : "Unpublished"}
            </span>

            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
              Order #{order}
            </span>
          </div>

          {description && (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}

          {pdf && (
            <p className="mt-2 text-xs font-medium text-green-700">
              PDF attached
            </p>
          )}
        </div>
      </div>
    </div>
  );
}