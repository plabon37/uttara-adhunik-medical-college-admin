"use client";

import {
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";

interface NoticePreviewProps {
  title: string;
  category: string;
  pdf: string;
  isPublished: boolean;
}

export default function NoticePreview({
  title,
  category,
  pdf,
  isPublished,
}: NoticePreviewProps) {
  const now = new Date();

  const day = now.getDate();

  const month = now.toLocaleDateString(
    "en-US",
    {
      month: "short",
    }
  );

  const year = now.getFullYear();

  const time = now.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-bold text-slate-800">
          Live Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preview before saving
        </p>
      </div>

      {/* Preview */}

      <div className="space-y-6 bg-slate-50 p-6">

        {/* Category */}

        <div className="inline-flex rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white">
          {category || "General Notice"}
        </div>

        {/* Notice Card */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#EEF0FA] shadow-sm">

          <div className="flex flex-col gap-5 p-6 sm:flex-row">

            {/* Date */}

            <div className="flex w-full flex-row items-center gap-4 sm:w-auto sm:flex-col sm:items-center">

              <div className="text-center">
                <h3 className="text-5xl font-bold text-slate-800">
                  {day}
                </h3>
              </div>

              <div className="rounded-md bg-green-700 px-5 py-3 text-center text-white shadow">
                <p className="text-2xl font-bold">
                  {month}
                </p>

                <p className="text-lg">
                  {year}
                </p>
              </div>

            </div>

            {/* Content */}

            <div className="flex-1">

              <h2 className="text-2xl font-bold leading-10 text-slate-800">
                {title ||
                  "Your Notice Title Will Appear Here"}
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-slate-600">

                <div className="flex items-center gap-2">
                  <Clock3 size={18} />

                  <span>{time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />

                  <span>
                    {day} {month} {year}
                  </span>
                </div>

              </div>

              {/* Status */}

              <div className="mt-6">

                {isPublished ? (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                    Draft
                  </span>
                )}

              </div>

              {/* PDF */}

              {pdf && (
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <FileText size={18} />

                  View PDF
                </a>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}