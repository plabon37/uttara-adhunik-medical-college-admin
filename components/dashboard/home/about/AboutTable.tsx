"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import AboutTableRow, { AboutData } from "./AboutTableRow";

interface AboutTableProps {
  about: AboutData | null;
  onDelete: (id: string) => void;
}

export default function AboutTable({
  about,
  onDelete,
}: AboutTableProps) {
  const [search, setSearch] = useState("");

  // =================================================
  // FILTER ABOUT DATA
  // =================================================

  const filteredAbout = useMemo(() => {
    if (!about) {
      return null;
    }

    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return about;
    }

    const searchableFields = [
      about.title,
      about.highlightText,
      about.tagline,
      about.missionTitle,
      about.visionTitle,
    ];

    const matches = searchableFields.some((field) =>
      field?.toLowerCase().includes(searchValue)
    );

    return matches ? about : null;
  }, [about, search]);

  const hasSearch = search.trim().length > 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <div className="border-b border-slate-200 bg-white p-4 sm:p-5">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search About section..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#008B45] focus:ring-2 focus:ring-[#008B45]/10"
          />
        </div>
      </div>

      {/* =================================================
          ABOUT TABLE
      ================================================= */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead>
            <span className="sr-only">About Section</span>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Logo
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                About
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Mission
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Vision
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody>
            {filteredAbout ? (
              <AboutTableRow
                about={filteredAbout}
                onDelete={onDelete}
              />
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-14 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    {about
                      ? "No matching About section found."
                      : "No About section available."}
                  </p>

                  {hasSearch && about && (
                    <p className="mt-1 text-xs text-slate-400">
                      Try searching with a different keyword.
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}