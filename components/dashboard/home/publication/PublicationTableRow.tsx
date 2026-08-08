"use client";

import Link from "next/link";
import {
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

interface Publication {
  _id: string;
  title: string;
  slug: string;
  category: "Journal" | "Tenders";
  description: string;
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

interface PublicationTableRowProps {
  publication: Publication;
  onDelete: (id: string) => void;
}

export default function PublicationTableRow({
  publication,
  onDelete,
}: PublicationTableRowProps) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70">
      {/* =========================
          PDF
      ========================= */}

      <td className="px-6 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
          <FileText
            size={22}
            className="text-red-600"
          />
        </div>
      </td>

      {/* =========================
          TITLE
      ========================= */}

      <td className="px-6 py-4">
        <div className="max-w-[320px]">
          <h3 className="line-clamp-2 font-semibold text-slate-800">
            {publication.title}
          </h3>

          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
            {publication.description}
          </p>
        </div>
      </td>

      {/* =========================
          CATEGORY
      ========================= */}

      <td className="px-6 py-4">
        <span className="rounded-lg bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
          {publication.category}
        </span>
      </td>

      {/* =========================
          ORDER
      ========================= */}

      <td className="px-6 py-4">
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          #{publication.order}
        </span>
      </td>

      {/* =========================
          STATUS
      ========================= */}

      <td className="px-6 py-4">
        {publication.isPublished ? (
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
          DATE
      ========================= */}

      <td className="px-6 py-4 text-sm text-slate-500">
        {new Date(
          publication.date
        ).toLocaleDateString()}
      </td>

      {/* =========================
          ACTIONS
      ========================= */}

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Link
            href={`/dashboard/home/publications/edit/${publication._id}`}
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
            onClick={() =>
              onDelete(publication._id)
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
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}