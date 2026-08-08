"use client";

import Link from "next/link";
import {
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  slug: string;
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
  createdAt: string;
}

interface NoticeTableRowProps {
  notice: Notice;
  onDelete: (id: string) => void;
}

export default function NoticeTableRow({
  notice,
  onDelete,
}: NoticeTableRowProps) {
  const noticeDate = new Date(
    notice.date
  );

  return (
    <tr className="border-t border-slate-200">
      {/* =========================
          TITLE
      ========================= */}

      <td className="px-6 py-4">
        <div className="max-w-md">
          <h3 className="font-semibold text-slate-800">
            {notice.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
            {notice.slug}
          </p>
        </div>
      </td>

      {/* =========================
          CATEGORY
      ========================= */}

      <td className="px-6 py-4">
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {notice.category}
        </span>
      </td>

      {/* =========================
          DATE
      ========================= */}

      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {noticeDate.toLocaleDateString()}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {notice.time}
          </p>
        </div>
      </td>

      {/* =========================
          ORDER
      ========================= */}

      <td className="px-6 py-4">
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          #{notice.order}
        </span>
      </td>

      {/* =========================
          STATUS
      ========================= */}

      <td className="px-6 py-4">
        {notice.isPublished ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Unpublished
          </span>
        )}
      </td>

      {/* =========================
          CREATED
      ========================= */}

      <td className="px-6 py-4 text-sm text-slate-500">
        {new Date(
          notice.createdAt
        ).toLocaleDateString()}
      </td>

      {/* =========================
          ACTIONS
      ========================= */}

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          {/* PDF */}

          {notice.pdf && (
            <a
              href={notice.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-50
                text-green-600
                transition
                hover:bg-green-100
              "
              title="View PDF"
            >
              <FileText size={18} />
            </a>
          )}

          {/* Edit */}

          <Link
            href={`/dashboard/home/notices/edit/${notice._id}`}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
              transition
              hover:bg-blue-100
            "
            title="Edit Notice"
          >
            <Pencil size={18} />
          </Link>

          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(notice._id)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
              transition
              hover:bg-red-100
            "
            title="Delete Notice"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}