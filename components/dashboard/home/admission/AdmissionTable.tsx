"use client";

import {
  Edit3,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";

// =========================================================
// ADMISSION TYPE
// =========================================================

export interface AdmissionData {
  _id: string;

  backgroundImage: string;

  titlePrefix: string;

  title: string;

  description: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// PROPS
// =========================================================

interface AdmissionTableProps {
  admission: AdmissionData;

  onDelete: () => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AdmissionTable({
  admission,
  onDelete,
}: AdmissionTableProps) {
  const router =
    useRouter();

  // =======================================================
  // EDIT
  // =======================================================

  const handleEdit = () => {
    router.push(
      `/dashboard/home/admission/edit/${admission._id}`
    );
  };

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this Admission section?"
      );

    if (!confirmed) {
      return;
    }

    try {
      // ===================================================
      // DELETE API
      // ===================================================

      const response =
        await fetch(
          "/api/admission",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              id: admission._id,
            }),
          }
        );

      // ===================================================
      // RESPONSE
      // ===================================================

      const responseText =
        await response.text();

      let result:
        | {
            success?: boolean;
            message?: string;
          }
        | null = null;

      try {
        result =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          "Delete API returned an invalid response."
        );
      }

      // ===================================================
      // ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            "Failed to delete Admission section."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      onDelete();
    } catch (error) {
      console.error(
        "DELETE ADMISSION ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete Admission section."
      );
    }
  };

  // =======================================================
  // DATE
  // =======================================================

  const formattedDate =
    admission.createdAt
      ? new Date(
          admission.createdAt
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
  // RENDER
  // =======================================================

  return (
    <div
      className="
        mt-8
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
          TABLE HEADER
      =================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-5
          py-4
          sm:px-6
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-800
            "
          >
            Admission Section
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Manage your Admission
            section content.
          </p>
        </div>

        {/* STATUS */}

        <span
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            px-3
            py-1.5
            text-xs
            font-semibold
            ${
              admission.isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${
                admission.isActive
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }
            `}
          />

          {admission.isActive
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="overflow-x-auto">
        <table
          className="
            w-full
            min-w-[900px]
            border-collapse
          "
        >
          {/* =================================================
              HEAD
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
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Preview
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Title
              </th>

              <th
                className="
                  px-6
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
                  px-6
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
                  px-6
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
              BODY
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
              {/* ===========================================
                  IMAGE
              =========================================== */}

              <td
                className="
                  px-6
                  py-5
                "
              >
                <div
                  className="
                    h-[76px]
                    w-[125px]
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-100
                  "
                >
                  {admission.backgroundImage ? (
                    <img
                      src={
                        admission.backgroundImage
                      }
                      alt="Admission"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-slate-400
                      "
                    >
                      <ImageIcon
                        size={24}
                      />
                    </div>
                  )}
                </div>
              </td>

              {/* ===========================================
                  TITLE
              =========================================== */}

              <td
                className="
                  px-6
                  py-5
                "
              >
                <div
                  className="
                    min-w-[180px]
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#008B45]
                    "
                  >
                    {
                      admission.titlePrefix
                    }{" "}
                    {
                      admission.title
                    }
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-400
                    "
                  >
                    Admission Section
                  </p>
                </div>
              </td>

              {/* ===========================================
                  DESCRIPTION
              =========================================== */}

              <td
                className="
                  max-w-[420px]
                  px-6
                  py-5
                "
              >
                <p
                  className="
                    line-clamp-2
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {
                    admission.description
                  }
                </p>
              </td>

              {/* ===========================================
                  DATE
              =========================================== */}

              <td
                className="
                  whitespace-nowrap
                  px-6
                  py-5
                  text-sm
                  text-slate-500
                "
              >
                {formattedDate}
              </td>

              {/* ===========================================
                  ACTIONS
              =========================================== */}

              <td
                className="
                  px-6
                  py-5
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
                  {/* =======================================
                      EDIT
                  ======================================= */}

                  <button
                    type="button"
                    onClick={
                      handleEdit
                    }
                    className="
                      inline-flex
                      h-10
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-3
                      text-sm
                      font-semibold
                      text-emerald-700
                      transition
                      hover:border-emerald-300
                      hover:bg-emerald-100
                      hover:text-emerald-800
                    "
                  >
                    <Edit3
                      size={16}
                      strokeWidth={2}
                    />

                    Edit
                  </button>

                  {/* =======================================
                      DELETE
                  ======================================= */}

                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    className="
                      inline-flex
                      h-10
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-3
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:border-red-300
                      hover:bg-red-100
                      hover:text-red-700
                    "
                  >
                    <Trash2
                      size={16}
                      strokeWidth={2}
                    />

                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          bg-slate-50/50
          px-6
          py-3
        "
      >
        <p
          className="
            text-xs
            text-slate-400
          "
        >
          1 Admission section
        </p>

        <p
          className="
            text-xs
            text-slate-400
          "
        >
          Last updated{" "}
          {admission.updatedAt
            ? new Date(
                admission.updatedAt
              ).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : "—"}
        </p>
      </div>
    </div>
  );
}