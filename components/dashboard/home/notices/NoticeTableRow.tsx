"use client";

import Link from "next/link";
import { FileText, Pencil, Trash2 } from "lucide-react";

interface Notice {
  _id: string;
  title: string;
  category: string;
  pdf: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
}

interface NoticeTableRowProps {
  notice: Notice;
}

export default function NoticeTableRow({
  notice,
}: NoticeTableRowProps) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">
      {/* Category */}
      <td className="px-6 py-4">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          {notice.category}
        </span>
      </td>

      {/* Title */}
      <td className="px-6 py-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            {notice.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Display Order: {notice.order}
          </p>
        </div>
      </td>

      {/* PDF */}
      <td className="px-6 py-4">
        {notice.pdf ? (
          <a
            href={notice.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <FileText size={16} />
            PDF
          </a>
        ) : (
          <span className="text-sm text-slate-400">
            No PDF
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {notice.isPublished ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Published
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Draft
          </span>
        )}
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-sm text-slate-500">
        {new Date(notice.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

<td className="px-6 py-4">
  <div className="flex items-center justify-center gap-3">

    <Link
      href={`/dashboard/notices/${notice._id}/edit`}
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
    >
      <Pencil size={18} />
    </Link>

    <button
      type="button"
      onClick={async () => {
        const ok = window.confirm(
          "Delete this notice?"
        );

        if (!ok) return;

        const res = await fetch(
          `/api/notices/${notice._id}`,
          {
            method: "DELETE",
          }
        );

        const result = await res.json();

        if (res.ok) {
          window.location.reload();
        } else {
          alert(result.message);
        }
      }}
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
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>
    </tr>
  );
}