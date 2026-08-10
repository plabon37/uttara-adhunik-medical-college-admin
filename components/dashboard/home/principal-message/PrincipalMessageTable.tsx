"use client";

import {
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

// =========================================================
// DATA TYPE
// =========================================================

export interface PrincipalMessageTableData {
  _id: string;

  tagline: string;

  titlePrefix: string;

  titleHighlight: string;

  signatureImage: string;

  principalName: string;

  designation: string;

  heading: string;

  description: string;

  principalImage: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}

// =========================================================
// PROPS
// =========================================================

interface PrincipalMessageTableProps {
  data: PrincipalMessageTableData | null;

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

export default function PrincipalMessageTable({
  data,
  onEdit,
  onDelete,
  onToggleStatus,
  deleting = false,
  updatingStatus = false,
}: PrincipalMessageTableProps) {
  // =======================================================
  // EMPTY STATE
  // =======================================================

  if (!data) {
    return null;
  }

  // =======================================================
  // DATE FORMAT
  // =======================================================

  const formattedDate = data.createdAt
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
  // DESCRIPTION PREVIEW
  // =======================================================

  const descriptionPreview =
    data.description.length >
    100
      ? `${data.description.slice(
          0,
          100
        )}...`
      : data.description;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* ===================================================
          DESKTOP TABLE
      =================================================== */}

      <div className="hidden overflow-x-auto lg:block">
        <table
          className="
            w-full
            min-w-[1000px]
            border-collapse
          "
        >
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <thead>
            <tr
              className="
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <th
                className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-semibold
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
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Principal
              </th>

              <th
                className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Description
              </th>

              <th
                className="
                  px-5
                  py-4
                  text-left
                  text-xs
                  font-semibold
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
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Created
              </th>

              <th
                className="
                  px-5
                  py-4
                  text-right
                  text-xs
                  font-semibold
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
            <tr
              className="
                border-b
                border-slate-100
                transition
                hover:bg-slate-50/70
              "
            >
              {/* =================================================
                  SECTION
              ================================================= */}

              <td className="px-5 py-5">
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
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
                        size={20}
                        className="
                          text-[#008B45]
                        "
                      />
                    )}
                  </div>

                  <div>
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
                        text-xs
                        text-slate-500
                      "
                    >
                      {data.tagline}
                    </p>
                  </div>
                </div>
              </td>

              {/* =================================================
                  PRINCIPAL
              ================================================= */}

              <td className="px-5 py-5">
                <div>
                  <p
                    className="
                      font-semibold
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

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <td className="max-w-[300px] px-5 py-5">
                <p
                  className="
                    line-clamp-2
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  {descriptionPreview}
                </p>
              </td>

              {/* =================================================
                  STATUS
              ================================================= */}

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

              {/* =================================================
                  CREATED
              ================================================= */}

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

              {/* =================================================
                  ACTIONS
              ================================================= */}

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
                      onEdit(
                        data._id
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
                      hover:border-[#008B45]
                      hover:bg-emerald-50
                      hover:text-[#008B45]
                    "
                    title="Edit"
                  >
                    <Edit3
                      size={16}
                    />
                  </button>

                  {/* TOGGLE */}

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
                      onDelete(
                        data._id
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
                      border-red-100
                      bg-white
                      text-red-500
                      transition
                      hover:bg-red-50
                      hover:text-red-600
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    title="Delete"
                  >
                    <Trash2
                      size={16}
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===================================================
          MOBILE CARD
      =================================================== */}

      <div
        className="
          divide-y
          divide-slate-100
          lg:hidden
        "
      >
        <div className="p-5">
          {/* HEADER */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
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
                    size={20}
                    className="
                      text-[#008B45]
                    "
                  />
                )}
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    font-semibold
                    text-slate-800
                  "
                >
                  Principal Message
                </h3>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {data.principalName}
                </p>
              </div>
            </div>

            {/* STATUS */}

            <span
              className={`
                shrink-0
                rounded-full
                px-2.5
                py-1
                text-[11px]
                font-semibold
                ${
                  data.isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              {data.isActive
                ? "Published"
                : "Hidden"}
            </span>
          </div>

          {/* DETAILS */}

          <div
            className="
              mt-5
              space-y-3
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Designation
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-700
                "
              >
                {data.designation}
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Heading
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                {data.heading}
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Description
              </p>

              <p
                className="
                  mt-1
                  line-clamp-3
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {data.description}
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                Created
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                {formattedDate}
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={() =>
                onEdit(data._id)
              }
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <Edit3
                size={16}
              />

              Edit
            </button>

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
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-blue-600
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

            <button
              type="button"
              disabled={
                deleting
              }
              onClick={() =>
                onDelete(
                  data._id
                )
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-red-100
                bg-white
                text-red-500
                transition
                hover:bg-red-50
              "
              title="Delete"
            >
              <Trash2
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}