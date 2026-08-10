"use client";

import {
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

import type {
  PrincipalMessageTableData,
} from "./PrincipalMessageTable";

// =========================================================
// PROPS
// =========================================================

interface PrincipalMessageTableRowProps {
  data: PrincipalMessageTableData;

  onEdit: (
    id: string
  ) => void;

  onDelete: (
    id: string
  ) => void;

  onToggleStatus: (
    id: string,
    currentStatus: boolean
  ) => void;

  deleting?: boolean;

  updatingStatus?: boolean;
}

// =========================================================
// COMPONENT
// =========================================================

export default function PrincipalMessageTableRow({
  data,
  onEdit,
  onDelete,
  onToggleStatus,
  deleting = false,
  updatingStatus = false,
}: PrincipalMessageTableRowProps) {
  // =======================================================
  // DATE
  // =======================================================

  const formattedDate =
    data.createdAt
      ? new Date(
          data.createdAt
        ).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "—";

  // =======================================================
  // DESCRIPTION
  // =======================================================

  const description =
    data.description.length >
    90
      ? `${data.description.slice(
          0,
          90
        )}...`
      : data.description;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <tr
      className="
        border-b
        border-slate-100
        transition-colors
        hover:bg-slate-50/70
      "
    >
      {/* ===================================================
          SECTION
      =================================================== */}

      <td className="px-5 py-5">
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* IMAGE */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-emerald-50
            "
          >
            {data.principalImage ? (
              <img
                src={
                  data.principalImage
                }
                alt={
                  data.principalName
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <ImageIcon
                size={19}
                className="
                  text-[#008B45]
                "
              />
            )}
          </div>

          {/* NAME */}

          <div className="min-w-0">
            <p
              className="
                font-semibold
                text-slate-800
              "
            >
              Principal Message
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                text-slate-500
              "
            >
              {data.tagline}
            </p>
          </div>
        </div>
      </td>

      {/* ===================================================
          PRINCIPAL
      =================================================== */}

      <td className="px-5 py-5">
        <div>
          <p
            className="
              font-medium
              text-slate-800
            "
          >
            {data.principalName}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            {data.designation}
          </p>
        </div>
      </td>

      {/* ===================================================
          HEADING / DESCRIPTION
      =================================================== */}

      <td className="max-w-[300px] px-5 py-5">
        <p
          className="
            font-medium
            text-slate-700
          "
        >
          {data.heading}
        </p>

        <p
          className="
            mt-1
            line-clamp-2
            text-xs
            leading-5
            text-slate-500
          "
        >
          {description}
        </p>
      </td>

      {/* ===================================================
          STATUS
      =================================================== */}

      <td className="px-5 py-5">
        <button
          type="button"
          disabled={
            updatingStatus
          }
          onClick={() =>
            onToggleStatus(
              data._id,
              data.isActive
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <span
            className={`
              h-2
              w-2
              rounded-full
              ${
                data.isActive
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }
            `}
          />

          <span
            className={`
              text-xs
              font-semibold
              ${
                data.isActive
                  ? "text-emerald-600"
                  : "text-slate-500"
              }
            `}
          >
            {data.isActive
              ? "Published"
              : "Hidden"}
          </span>
        </button>
      </td>

      {/* ===================================================
          DATE
      =================================================== */}

      <td className="px-5 py-5">
        <span
          className="
            whitespace-nowrap
            text-sm
            text-slate-500
          "
        >
          {formattedDate}
        </span>
      </td>

      {/* ===================================================
          ACTIONS
      =================================================== */}

      <td className="px-5 py-5">
        <div
          className="
            flex
            items-center
            justify-end
            gap-2
          "
        >
          {/* EDIT */}

          <button
            type="button"
            onClick={() =>
              onEdit(data._id)
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-600
              transition
              hover:border-[#008B45]
              hover:bg-emerald-50
              hover:text-[#008B45]
            "
            title="Edit Principal Message"
          >
            <Edit3
              size={16}
            />
          </button>

          {/* PUBLISH / HIDE */}

          <button
            type="button"
            disabled={
              updatingStatus
            }
            onClick={() =>
              onToggleStatus(
                data._id,
                data.isActive
              )
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            title={
              data.isActive
                ? "Hide"
                : "Publish"
            }
          >
            {data.isActive ? (
              <EyeOff
                size={16}
              />
            ) : (
              <Eye
                size={16}
              />
            )}
          </button>

          {/* DELETE */}

          <button
            type="button"
            disabled={
              deleting
            }
            onClick={() =>
              onDelete(data._id)
            }
            className="
              flex
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
              hover:text-red-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            title="Delete Principal Message"
          >
            <Trash2
              size={16}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}