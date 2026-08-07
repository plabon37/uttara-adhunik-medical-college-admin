"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import NoticeEmpty from "./NoticeEmpty";
import NoticeLoading from "./NoticeLoading";
import NoticeTableRow from "./NoticeTableRow";

interface Notice {
  _id: string;
  title: string;
  category: string;
  pdf: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export default function NoticeTable() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getNotices = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/notices", {
        cache: "no-store",
      });
const data = await res.json();

if (!res.ok) {
  throw new Error(data.message);
}

if (Array.isArray(data.data)) {
  setNotices(data.data);
} else {
  setNotices([]);
}
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialNotices = async () => {
      await getNotices();
    };

    void fetchInitialNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) =>
      notice.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [notices, search]);

  const handleDelete = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this notice?"
      );

      if (!confirmed) return;

      const res = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      getNotices();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed.");
    }
  };

  if (loading) {
    return <NoticeLoading />;
  }

  if (filteredNotices.length === 0) {
    return <NoticeEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-5 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Notice List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Notices : {filteredNotices.length}
          </p>
        </div>

        <Link
          href="/dashboard/notices/new"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Notice
        </Link>

      </div>

      {/* Search */}

      <div className="border-b border-slate-200 p-5">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Notice..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-teal-500"
          />

        </div>

      </div>
            {/* Desktop Table */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                PDF
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
            {filteredNotices.map((notice) => (
              <NoticeTableRow
                key={notice._id}
                notice={notice}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}

      <div className="space-y-5 p-5 lg:hidden">
        {filteredNotices.map((notice) => (
          <div
            key={notice._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="space-y-5 p-5">

              <div className="flex items-center justify-between">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                  {notice.category}
                </span>

                {notice.isPublished ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Draft
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {notice.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Display Order : {notice.order}
                </p>
              </div>

              <div className="text-sm text-slate-500">
                {new Date(
                  notice.createdAt
                ).toLocaleDateString()}
              </div>

              <div className="flex gap-3">

                <Link
                  href={`/dashboard/notices/${notice._id}/edit`}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(notice._id)
                  }
                  className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
          </div>
  );
}