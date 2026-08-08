"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import PublicationLoading from "./PublicationLoading";
import PublicationEmpty from "./PublicationEmpty";
import PublicationTableRow from "./PublicationTableRow";

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

export default function PublicationTable() {
  const [publications, setPublications] =
    useState<Publication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // ==========================
  // GET PUBLICATIONS
  // ==========================

  const getPublications = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/publications",
        {
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch publications."
        );
      }

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      setPublications(data);
    } catch (error) {
      console.error(
        "GET PUBLICATIONS ERROR:",
        error
      );

      toast.error(
        "Failed to load publications."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {
    const timer = setTimeout(() => {
      getPublications();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  const filteredPublications =
    useMemo(() => {
      const searchValue =
        search.toLowerCase().trim();

      if (!searchValue) {
        return publications;
      }

      return publications.filter(
        (publication) =>
          publication.title
            .toLowerCase()
            .includes(searchValue) ||
          publication.category
            .toLowerCase()
            .includes(searchValue)
      );
    }, [
      publications,
      search,
    ]);

  // ==========================
  // DELETE
  // ==========================

  const handleDelete = async (
    id: string
  ) => {
    try {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this Publication?"
        );

      if (!confirmDelete) {
        return;
      }

      const res = await fetch(
        `/api/publications/${id}`,
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

      toast.success(
        result.message ||
          "Publication deleted successfully."
      );

      await getPublications();
    } catch (error) {
      console.error(
        "DELETE PUBLICATION ERROR:",
        error
      );

      toast.error(
        "Delete failed."
      );
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return <PublicationLoading />;
  }

  // ==========================
  // EMPTY
  // ==========================

  if (
    publications.length === 0
  ) {
    return <PublicationEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* ==========================
          SEARCH
      ========================== */}

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
            placeholder="Search Publication..."
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
              focus:ring-2
              focus:ring-teal-500/10
            "
          />
        </div>
      </div>

      {/* ==========================
          NO SEARCH RESULT
      ========================== */}

      {filteredPublications.length ===
      0 ? (
        <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              No Publication Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              No publication matches your
              search.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ==========================
              DESKTOP TABLE
          ========================== */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    PDF
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPublications.map(
                  (publication) => (
                    <PublicationTableRow
                      key={
                        publication._id
                      }
                      publication={
                        publication
                      }
                      onDelete={
                        handleDelete
                      }
                    />
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ==========================
              MOBILE VIEW
          ========================== */}

          <div className="space-y-5 p-5 lg:hidden">
            {filteredPublications.map(
              (publication) => (
                <div
                  key={
                    publication._id
                  }
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                  "
                >
                  {/* Header */}

                  <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <span className="text-xs font-bold text-red-600">
                        PDF
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h2 className="line-clamp-2 text-lg font-bold text-slate-800">
                        {
                          publication.title
                        }
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          publication.category
                        }
                      </p>
                    </div>
                  </div>

                  {/* Content */}

                  <div className="space-y-4 p-5">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                      {
                        publication.description
                      }
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        #
                        {
                          publication.order
                        }
                      </span>

                      {publication.isPublished ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Unpublished
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-slate-500">
                      Date:{" "}
                      {new Date(
                        publication.date
                      ).toLocaleDateString()}
                    </div>

                    {/* Actions */}

                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/home/publications/edit/${publication._id}`}
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
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            publication._id
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
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}