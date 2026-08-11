"use client";

import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

import CampusLifeRow, {
  CampusLifeRowData,
} from "./CampusLifeRow";

// =========================================================
// RE-EXPORT TYPE
// =========================================================

export type { CampusLifeRowData } from "./CampusLifeRow";

// =========================================================
// PROPS
// =========================================================

interface CampusLifeTableProps {
  data: CampusLifeRowData[];

  loading?: boolean;

  onRefresh?: () => void;

  onDelete: (id: string) => void;

  deletingId?: string | null;
}

// =========================================================
// COMPONENT
// =========================================================

export default function CampusLifeTable({
  data,
  loading = false,
  onRefresh,
  onDelete,
  deletingId = null,
}: CampusLifeTableProps) {
  return (
    <div
      className="
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
        <div>
          <h2
            className="
              text-base
              font-bold
              text-slate-900
            "
          >
            Campus Life
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage Campus Life cards displayed on
            the client website.
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {/* REFRESH */}

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="
                inline-flex
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
                hover:bg-slate-50
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

          {/* ADD */}

          <Link
            href="/dashboard/home/campus-life/new"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#008B45]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#00763B]
            "
          >
            <Plus size={17} />

            Add Campus Life
          </Link>
        </div>
      </div>

      {/* =================================================
          TABLE
      ================================================= */}

      <div
        className="
          w-full
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
            min-w-[900px]
            border-collapse
          "
        >
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead
            className="
              bg-slate-50
            "
          >
            <tr
              className="
                border-b
                border-slate-200
              "
            >
              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Preview
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Section
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Cards
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-left
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Status
              </th>

              <th
                className="
                  px-5
                  py-3.5
                  text-right
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wider
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
            {data.map((item) => (
              <CampusLifeRow
                key={item._id}
                data={item}
                onDelete={onDelete}
                isDeleting={
                  deletingId === item._id
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}