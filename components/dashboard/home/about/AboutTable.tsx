"use client";

import { useMemo, useState } from "react";
import AboutTableRow, {
  AboutData,
} from "./AboutTableRow";

interface AboutTableProps {
  about: AboutData | null;
  onDelete: (id: string) => void;
}

export default function AboutTable({
  about,
  onDelete,
}: AboutTableProps) {
  const [search, setSearch] = useState("");

  // =========================================
  // FILTER ABOUT
  // =========================================

  const filteredAbout = useMemo(() => {
    if (!about) {
      return null;
    }

    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return about;
    }

    const matches =
      about.title
        ?.toLowerCase()
        .includes(searchValue) ||
      about.highlightText
        ?.toLowerCase()
        .includes(searchValue) ||
      about.tagline
        ?.toLowerCase()
        .includes(searchValue) ||
      about.missionTitle
        ?.toLowerCase()
        .includes(searchValue) ||
      about.visionTitle
        ?.toLowerCase()
        .includes(searchValue);

    return matches ? about : null;
  }, [about, search]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* =========================================
          SEARCH
      ========================================= */}

      <div className="border-b border-slate-200 p-5">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search About section..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#008B45]
              focus:ring-2
              focus:ring-[#008B45]/10
            "
          />
        </div>
      </div>

      {/* =========================================
          RESPONSIVE TABLE
      ========================================= */}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          {/* =========================================
              TABLE HEADER
          ========================================= */}

          <thead>
            <tr className="bg-slate-50 text-left">
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

          {/* =========================================
              TABLE BODY
          ========================================= */}

          <tbody>
            {filteredAbout ? (
              <AboutTableRow
                about={filteredAbout}
                onDelete={onDelete}
              />
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-600">
                    {about
                      ? "No About section found."
                      : "No About section available."}
                  </p>

                  {search && about && (
                    <p className="mt-1 text-xs text-slate-400">
                      Try a different search term.
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