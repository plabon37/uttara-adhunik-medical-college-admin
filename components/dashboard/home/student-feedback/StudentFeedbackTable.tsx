"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

export interface StudentFeedbackItem {
  _id: string;
  name: string;
  designation: string;
  feedback: string;
  image: string;
  rating: number;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface StudentFeedbackTableProps {
  initialData: StudentFeedbackItem[];
}

export default function StudentFeedbackTable({
  initialData,
}: StudentFeedbackTableProps) {
  const [feedbackList, setFeedbackList] =
    useState<StudentFeedbackItem[]>(
      initialData
    );

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student feedback?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      setDeletingId(id);

      const response = await fetch(
        `/api/student-feedback/${id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to delete student feedback."
        );
      }

      setFeedbackList(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !== id
          )
      );
    } catch (deleteError) {
      console.error(
        "DELETE STUDENT FEEDBACK ERROR:",
        deleteError
      );

      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete student feedback."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (feedbackList.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#008B45]/10">
          <Star
            size={24}
            className="text-[#008B45]"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No Student Feedback Yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Add your first student feedback to
          display testimonials on the homepage.
        </p>

        <Link
          href="/dashboard/home/student-feedback/new"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00763b]"
        >
          <Plus size={18} />

          Add Feedback
        </Link>
      </div>
    );
  }

  // =========================================================
  // TABLE
  // =========================================================

  return (
    <div className="w-full">
      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            {/* =================================================
                TABLE HEAD
            ================================================= */}

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Order
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Feedback
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rating
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody>
              {feedbackList.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/70"
                  >
                    {/* =========================================
                        ORDER
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#008B45]/10 px-2 text-sm font-semibold text-[#008B45]">
                        {item.order}
                      </span>
                    </td>

                    {/* =========================================
                        STUDENT
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <div className="flex items-center gap-3">
                        {/* IMAGE */}

                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#008B45]">
                              {item.name
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* INFO */}

                        <div className="min-w-0">
                          <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900">
                            {item.name}
                          </p>

                          <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                            {item.designation}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =========================================
                        FEEDBACK
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <p className="max-w-[350px] text-sm leading-6 text-slate-600">
                        {item.feedback}
                      </p>
                    </td>

                    {/* =========================================
                        RATING
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <div className="flex items-center gap-1">
                        {[
                          1,
                          2,
                          3,
                          4,
                          5,
                        ].map(
                          (star) => (
                            <Star
                              key={star}
                              size={15}
                              strokeWidth={
                                1.8
                              }
                              className={
                                star <=
                                item.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }
                            />
                          )
                        )}

                        <span className="ml-1 text-xs font-medium text-slate-500">
                          {item.rating}
                        </span>
                      </div>
                    </td>

                    {/* =========================================
                        STATUS
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isPublished
                            ? "bg-[#EAF5EE] text-[#008B45]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.isPublished
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    {/* =========================================
                        ACTIONS
                    ========================================= */}

                    <td className="px-5 py-5 align-middle">
                      <div className="flex items-center justify-end gap-2">
                        {/* EDIT */}

                        <Link
                          href={`/dashboard/home/student-feedback/edit/${item._id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#008B45]/30 hover:bg-[#008B45]/5 hover:text-[#008B45]"
                          title="Edit feedback"
                        >
                          <Edit
                            size={16}
                          />
                        </Link>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                          disabled={
                            deletingId ===
                            item._id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete feedback"
                        >
                          {deletingId ===
                          item._id ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
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
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
          <p className="text-xs text-slate-500">
            Total feedback:{" "}
            <span className="font-semibold text-slate-700">
              {feedbackList.length}
            </span>
          </p>

          <Link
            href="/dashboard/home/student-feedback/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#008B45] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#00763b]"
          >
            <Plus size={15} />

            Add Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}