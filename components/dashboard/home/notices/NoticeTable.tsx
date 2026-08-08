"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import NoticeLoading from "./NoticeLoading";
import NoticeEmpty from "./NoticeEmpty";
import NoticeTableRow from "./NoticeTableRow";

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

export default function NoticeTable() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // GET ALL NOTICES
  // ==========================

  const getNotices = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/notices", {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Failed to load notices."
        );
      }

      setNotices(result.data || []);
    } catch (error) {
      console.error(
        "GET NOTICE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load notices."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetch(
          "/api/notices",
          {
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(
            result.message ||
              "Failed to load notices."
          );
        }

        setNotices(result.data || []);
      } catch (error) {
        console.error(
          "GET NOTICE ERROR:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load notices."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadNotices();
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) =>
      notice.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [notices, search]);

  // ==========================
  // DELETE NOTICE
  // ==========================

  const handleDelete = async (
    id: string
  ) => {
    try {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this Notice?"
        );

      if (!confirmDelete) return;

      const res = await fetch(
        `/api/notices/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Delete failed."
        );
      }

      toast.success(result.message);

      await getNotices();
    } catch (error) {
      console.error(
        "DELETE NOTICE ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Delete failed."
      );
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return <NoticeLoading />;
  }

  // ==========================
  // EMPTY
  // ==========================

  if (filteredNotices.length === 0) {
    return (
      <NoticeEmpty
        title={
          search
            ? "No Notice Found"
            : "No Notices Available"
        }
        description={
          search
            ? "No notices matched your search."
            : "There are no notices available. Click the 'Add Notice' button to create your first notice."
        }
      />
    );
  }

  return (
    <div>
      {/* =========================
          SEARCH
      ========================= */}

      <div className="border-b border-slate-200 p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search Notice..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-teal-500
            "
          />
        </div>
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================= */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Order
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredNotices.map(
              (notice) => (
                <NoticeTableRow
                  key={notice._id}
                  notice={notice}
                  onDelete={handleDelete}
                />
              )
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          MOBILE VIEW
      ========================= */}

      <div className="space-y-5 p-5 lg:hidden">
        {filteredNotices.map(
          (notice) => {
            const noticeDate = new Date(
              notice.date
            );

            return (
              <div
                key={notice._id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                "
              >
                <div className="space-y-4 p-5">
                  {/* Title */}

                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      {notice.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {notice.category}
                    </p>
                  </div>

                  {/* Date + Time */}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {noticeDate.toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Time
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {notice.time}
                      </p>
                    </div>
                  </div>

                  {/* Order + Status */}

                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      Order #{notice.order}
                    </span>

                    {notice.isPublished ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Unpublished
                      </span>
                    )}
                  </div>

                  {/* Created */}

                  <div className="text-sm text-slate-500">
                    Created :{" "}
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}
                  </div>

                  {/* Actions */}

                  <div className="flex gap-3">
                    <a
                      href={`/dashboard/home/notices/edit/${notice._id}`}
                      className="
                        flex-1
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-3
                        text-center
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                      "
                    >
                      Edit
                    </a>

                    <button
                      onClick={() =>
                        handleDelete(
                          notice._id
                        )
                      }
                      className="
                        flex-1
                        rounded-xl
                        bg-red-600
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                      "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}