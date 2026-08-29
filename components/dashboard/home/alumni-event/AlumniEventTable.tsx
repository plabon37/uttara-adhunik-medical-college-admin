"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Edit3,
  MapPin,
  RefreshCw,
  Trash2,
} from "lucide-react";

// =================================================
// TYPES
// =================================================

export interface AlumniEventRowData {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isPublished: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface AlumniEventTableProps {
  data: AlumniEventRowData[];
  loading: boolean;
  onRefresh: () => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  deletingId: string | null;
}

// =================================================
// COMPONENT
// =================================================

export default function AlumniEventTable({
  data,
  loading,
  onRefresh,
  onDelete,
  deletingId,
}: AlumniEventTableProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =================================================
          TABLE HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
            Homepage
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-900">
            Alumni Events
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage events displayed on the client website.
          </p>
        </div>

        {/* REFRESH BUTTON */}

        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#008B45] hover:text-[#008B45] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      {loading ? (
        /* =================================================
            LOADING STATE
        ================================================= */

        <div className="flex min-h-[300px] items-center justify-center p-6">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#008B45]" />
        </div>
      ) : data.length === 0 ? (
        /* =================================================
            EMPTY STATE
        ================================================= */

        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-[#008B45]">
            <CalendarDays size={24} />
          </div>

          <h3 className="mt-4 text-base font-bold text-slate-900">
            No Alumni Events
          </h3>

          <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
            Create your first Alumni Event to display it on the website.
          </p>

          <Link
            href="/dashboard/home/alumni-event/new"
            className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00763B]"
          >
            Create Alumni Event

            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      ) : (
        /* =================================================
            EVENTS TABLE
        ================================================= */

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            {/* =================================================
                TABLE HEADER
            ================================================= */}

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Order
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Event
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>
              {data.map((event, index) => {
                const displayOrder = String(
                  Number(event.order ?? index) + 1
                ).padStart(2, "0");

                const isDeleting = deletingId === event._id;

                return (
                  <tr
                    key={event._id}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/70"
                  >
                    {/* =========================================
                        ORDER
                    ========================================= */}

                    <td className="px-5 py-4">
                      <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-emerald-50 px-2 text-sm font-bold text-[#008B45]">
                        {displayOrder}
                      </span>
                    </td>

                    {/* =========================================
                        EVENT
                    ========================================= */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        {/* EVENT IMAGE */}

                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {event.image ? (
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <CalendarDays size={20} />
                            </div>
                          )}
                        </div>

                        {/* EVENT INFO */}

                        <div className="min-w-0">
                          <p
                            title={event.title}
                            className="max-w-[330px] truncate text-sm font-semibold text-slate-900"
                          >
                            {event.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Alumni Event
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =========================================
                        DATE & TIME
                    ========================================= */}

                    <td className="px-5 py-4">
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            size={15}
                            className="text-slate-400"
                          />

                          <span>{event.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3
                            size={15}
                            className="text-slate-400"
                          />

                          <span>{event.time}</span>
                        </div>
                      </div>
                    </td>

                    {/* =========================================
                        LOCATION
                    ========================================= */}

                    <td className="px-5 py-4">
                      <div className="flex max-w-[220px] items-center gap-2 text-sm text-slate-600">
                        <MapPin
                          size={16}
                          className="shrink-0 text-slate-400"
                        />

                        <span
                          title={event.location}
                          className="truncate"
                        >
                          {event.location}
                        </span>
                      </div>
                    </td>

                    {/* =========================================
                        STATUS
                    ========================================= */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                          event.isPublished
                            ? "bg-emerald-50 text-[#008B45] ring-1 ring-inset ring-emerald-600/20"
                            : "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/10"
                        }`}
                      >
                        <span
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            event.isPublished
                              ? "bg-[#008B45]"
                              : "bg-slate-400"
                          }`}
                        />

                        {event.isPublished
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    {/* =========================================
                        ACTIONS
                    ========================================= */}

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* EDIT */}

                        <Link
                          href={`/dashboard/home/alumni-event/edit/${event._id}`}
                          title="Edit Alumni Event"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#008B45] hover:bg-emerald-50 hover:text-[#008B45] focus:outline-none focus:ring-2 focus:ring-[#008B45]/15"
                        >
                          <Edit3 size={16} />
                        </Link>

                        {/* DELETE */}

                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => void onDelete(event._id)}
                          title="Delete Alumni Event"
                          aria-label={`Delete ${event.title}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}