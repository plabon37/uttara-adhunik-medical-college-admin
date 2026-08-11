"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowUpRight,
  Edit,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

export interface CampusLifeRowData {
  _id: string;

  tagline: string;

  title: string;

  description: string;

  items: CampusLifeRowItem[];

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}

export interface CampusLifeRowItem {
  _id?: string;

  title: string;

  image: string;

  link: string;

  isActive: boolean;

  order: number;
}

// =========================================================
// PROPS
// =========================================================

interface CampusLifeRowProps {
  data: CampusLifeRowData;

  onDelete: (
    id: string
  ) => void;

  isDeleting?: boolean;
}

// =========================================================
// COMPONENT
// =========================================================

export default function CampusLifeRow({
  data,

  onDelete,

  isDeleting = false,
}: CampusLifeRowProps) {
  const activeItems =
    Array.isArray(data.items)
      ? data.items.filter(
          (item) =>
            item.isActive
        )
      : [];

  const firstImage =
    [...activeItems]
      .sort(
        (a, b) =>
          a.order - b.order
      )
      .find(
        (item) =>
          Boolean(
            item.image
          )
      )?.image || "";

  // =======================================================
  // DELETE CONFIRMATION
  // =======================================================

  const handleDelete =
    () => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${data.title}"?`
        );

      if (!confirmed) {
        return;
      }

      onDelete(data._id);
    };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <tr
      className="
        border-b
        border-slate-100
        last:border-b-0
        hover:bg-slate-50/70
      "
    >
      {/* =================================================
          PREVIEW
      ================================================= */}

      <td
        className="
          px-5
          py-4
        "
      >
        <div
          className="
            relative
            h-16
            w-24
            overflow-hidden
            rounded-xl
            bg-slate-100
          "
        >
          {firstImage ? (
            <Image
              src={
                firstImage
              }
              alt={
                data.title ||
                "Campus Life"
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
                items-center
                justify-center
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              No Image
            </div>
          )}
        </div>
      </td>

      {/* =================================================
          TITLE
      ================================================= */}

      <td
        className="
          px-5
          py-4
        "
      >
        <div
          className="
            min-w-[180px]
          "
        >
          <p
            className="
              truncate
              text-sm
              font-bold
              text-slate-900
            "
          >
            {data.title ||
              "Campus Life"}
          </p>

          <p
            className="
              mt-1
              line-clamp-2
              max-w-[300px]
              text-xs
              leading-5
              text-slate-500
            "
          >
            {data.description ||
              "No description available."}
          </p>
        </div>
      </td>

      {/* =================================================
          CARDS
      ================================================= */}

      <td
        className="
          px-5
          py-4
        "
      >
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-slate-100
            px-3
            py-1
            text-xs
            font-semibold
            text-slate-700
          "
        >
          {data.items?.length ||
            0}{" "}
          Cards
        </span>
      </td>

      {/* =================================================
          STATUS
      ================================================= */}

      <td
        className="
          px-5
          py-4
        "
      >
        {data.isActive ? (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            <Eye
              size={13}
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
              py-1
              text-xs
              font-semibold
              text-slate-500
            "
          >
            <EyeOff
              size={13}
            />

            Hidden
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
            href={`/dashboard/home/campus-life/edit/${data._id}`}
            title="Edit Campus Life"
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
              text-slate-600
              transition
              hover:border-[#008B45]
              hover:bg-[#008B45]/5
              hover:text-[#008B45]
            "
          >
            <Edit
              size={16}
            />
          </Link>

          {/* PREVIEW / WEBSITE LINK */}

          {activeItems.length >
            0 &&
            activeItems[0]
              ?.link &&
            activeItems[0]
              .link !== "#" ? (
            <a
              href={
                activeItems[0]
                  .link
              }
              target="_blank"
              rel="noopener noreferrer"
              title="Open Link"
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
                text-slate-600
                transition
                hover:border-cyan-500
                hover:bg-cyan-50
                hover:text-cyan-600
              "
            >
              <ArrowUpRight
                size={16}
              />
            </a>
          ) : null}

          {/* DELETE */}

          <button
            type="button"
            title="Delete Campus Life"
            disabled={
              isDeleting
            }
            onClick={
              handleDelete
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
              hover:text-red-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
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