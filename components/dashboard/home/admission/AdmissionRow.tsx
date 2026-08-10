"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Edit,
  ExternalLink,
  Trash2,
} from "lucide-react";

// =========================================================
// TYPE
// =========================================================

interface AdmissionData {
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

interface AdmissionRowProps {
  admission: AdmissionData;

  onDelete: (
    id: string
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function AdmissionRow({
  admission,
  onDelete,
}: AdmissionRowProps) {
  return (
    <tr
      className="
        border-b
        border-gray-100
        transition
        hover:bg-gray-50/70
      "
    >
      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}

      <td
        className="
          px-6
          py-5
        "
      >
        <div
          className="
            relative
            h-16
            w-28
            overflow-hidden
            rounded-lg
            bg-gray-100
          "
        >
          <Image
            src={
              admission.backgroundImage
            }
            alt="Admission background"
            fill
            className="
              object-cover
            "
            sizes="112px"
          />
        </div>
      </td>

      {/* =================================================
          TITLE
      ================================================= */}

      <td
        className="
          min-w-[220px]
          px-6
          py-5
        "
      >
        <div
          className="
            font-semibold
            text-gray-900
          "
        >
          <span
            className="
              text-[#008B45]
            "
          >
            {admission.titlePrefix}
          </span>

          <span className="mx-1">
            {admission.title}
          </span>
        </div>

        <p
          className="
            mt-1
            max-w-[350px]
            truncate
            text-xs
            text-gray-500
          "
        >
          {admission.description}
        </p>
      </td>

      {/* =================================================
          BUTTON
      ================================================= */}

      <td
        className="
          px-6
          py-5
        "
      >
        <span
          className="
            inline-flex
            rounded-lg
            bg-gray-100
            px-3
            py-1.5
            text-xs
            font-medium
            text-gray-700
          "
        >
          {admission.buttonText}
        </span>
      </td>

      {/* =================================================
          STATUS
      ================================================= */}

      <td
        className="
          px-6
          py-5
        "
      >
        {admission.isActive ? (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-[#E8F7F0]
              px-3
              py-1.5
              text-xs
              font-semibold
              text-[#008B45]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#008B45]
              "
            />

            Active
          </span>
        ) : (
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-gray-100
              px-3
              py-1.5
              text-xs
              font-semibold
              text-gray-500
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gray-400
              "
            />

            Inactive
          </span>
        )}
      </td>

      {/* =================================================
          ACTIONS
      ================================================= */}

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
            gap-2
          "
        >
          {/* =============================================
              EDIT
          ============================================= */}

          <Link
            href={`/dashboard/home/admission/edit/${admission._id}`}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-gray-200
              text-gray-600
              transition
              hover:border-[#008B45]
              hover:bg-[#E8F7F0]
              hover:text-[#008B45]
            "
            title="Edit Admission"
          >
            <Edit size={16} />
          </Link>

          {/* =============================================
              VIEW
          ============================================= */}

          <a
            href={
              admission.buttonLink
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-gray-200
              text-gray-600
              transition
              hover:border-blue-500
              hover:bg-blue-50
              hover:text-blue-600
            "
            title="Open Link"
          >
            <ExternalLink
              size={16}
            />
          </a>

          {/* =============================================
              DELETE
          ============================================= */}

          <button
            type="button"
            onClick={() =>
              onDelete(
                admission._id
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
              border-gray-200
              text-gray-500
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
            title="Delete Admission"
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