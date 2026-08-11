"use client";

import Image from "next/image";

import Link from "next/link";

import {
  CalendarDays,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

export interface NewsRowData {
  _id: string;

  title: string;

  slug: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: string;

  isPublished: boolean;

  order: number;

  createdAt?: string;

  updatedAt?: string;
}

interface NewsTableProps {
  data: NewsRowData[];

  loading?: boolean;

  onRefresh?: () => void | Promise<void>;

  onDelete?: (
    id: string
  ) => void | Promise<void>;

  deletingId?: string | null;
}

// =========================================================
// DATE FORMAT
// =========================================================

function formatDate(
  value: string
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

// =========================================================
// COMPONENT
// =========================================================

export default function NewsTable({
  data,
  loading = false,
  onRefresh,
  onDelete,
  deletingId = null,
}: NewsTableProps) {
  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-slate-200
          px-5
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        {/* TITLE */}

        <div>
          <h2
            className="
              flex
              items-center
              gap-2
              text-lg
              font-bold
              text-slate-900
            "
          >
            <FileText
              size={19}
              className="text-[#008B45]"
            />

            News List
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage all homepage news
            items.
          </p>
        </div>

        {/* REFRESH */}

        {onRefresh && (
          <button
            type="button"
            onClick={
              onRefresh
            }
            disabled={
              loading
            }
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        )}
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
            min-w-[950px]
            border-collapse
          "
        >
          {/* =================================================
              TABLE HEAD
          ================================================= */}

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <th
                className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                News
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Category
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Author
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-left
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Date
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Order
              </th>

              <th
                className="
                  px-4
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Status
              </th>

              <th
                className="
                  px-5
                  py-4
                  text-right
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-5
                    py-16
                    text-center
                  "
                >
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-3
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    <Loader2
                      size={20}
                      className="
                        animate-spin
                        text-[#008B45]
                      "
                    />

                    Loading News...
                  </div>
                </td>
              </tr>
            ) : (
              data.map(
                (item) => (
                  <tr
                    key={
                      item._id
                    }
                    className="
                      border-b
                      border-slate-100
                      transition
                      hover:bg-slate-50/70
                    "
                  >
                    {/* =================================================
                        NEWS
                    ================================================= */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >
                        {/* IMAGE */}

                        <div
                          className="
                            relative
                            h-16
                            w-24
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            bg-slate-100
                          "
                        >
                          {item.image ? (
                            <Image
                              src={
                                item.image
                              }
                              alt={
                                item.title
                              }
                              fill
                              sizes="96px"
                              className="
                                object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                text-slate-400
                              "
                            >
                              <FileText
                                size={20}
                              />
                            </div>
                          )}
                        </div>

                        {/* TEXT */}

                        <div
                          className="
                            min-w-0
                          "
                        >
                          <p
                            className="
                              max-w-[300px]
                              truncate
                              text-sm
                              font-semibold
                              text-slate-900
                            "
                            title={
                              item.title
                            }
                          >
                            {item.title}
                          </p>

                          <p
                            className="
                              mt-1
                              max-w-[300px]
                              truncate
                              text-xs
                              text-slate-400
                            "
                            title={
                              item.slug
                            }
                          >
                            /news/
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        CATEGORY
                    ================================================= */}

                    <td
                      className="
                        px-4
                        py-4
                      "
                    >
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-[#EAF5EE]
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-[#008B45]
                        "
                      >
                        {
                          item.category
                        }
                      </span>
                    </td>

                    {/* =================================================
                        AUTHOR
                    ================================================= */}

                    <td
                      className="
                        px-4
                        py-4
                        text-sm
                        text-slate-600
                      "
                    >
                      {
                        item.author
                      }
                    </td>

                    {/* =================================================
                        DATE
                    ================================================= */}

                    <td
                      className="
                        px-4
                        py-4
                      "
                    >
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          whitespace-nowrap
                          text-sm
                          text-slate-600
                        "
                      >
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {formatDate(
                          item.date
                        )}
                      </span>
                    </td>

                    {/* =================================================
                        ORDER
                    ================================================= */}

                    <td
                      className="
                        px-4
                        py-4
                        text-center
                      "
                    >
                      <span
                        className="
                          inline-flex
                          h-8
                          min-w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-100
                          px-2
                          text-xs
                          font-bold
                          text-slate-600
                        "
                      >
                        {
                          item.order
                        }
                      </span>
                    </td>

                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <td
                      className="
                        px-4
                        py-4
                        text-center
                      "
                    >
                      {item.isPublished ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-emerald-50
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-[#008B45]
                          "
                        >
                          <Eye
                            size={14}
                          />

                          Published
                        </span>
                      ) : (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-slate-500
                          "
                        >
                          <EyeOff
                            size={14}
                          />

                          Draft
                        </span>
                      )}
                    </td>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-2
                        "
                      >
                        {/* EDIT */}

                        <Link
                          href={`/dashboard/home/news/edit/${item._id}`}
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                            transition
                            hover:border-[#008B45]
                            hover:bg-[#EAF5EE]
                            hover:text-[#008B45]
                          "
                          title="Edit News"
                        >
                          <Edit3
                            size={16}
                          />
                        </Link>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            onDelete?.(
                              item._id
                            )
                          }
                          disabled={
                            deletingId ===
                            item._id
                          }
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-100
                            bg-white
                            text-red-500
                            transition
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                          title="Delete News"
                        >
                          {deletingId ===
                          item._id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={16}
                            />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}