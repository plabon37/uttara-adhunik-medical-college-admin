"use client";

import {
  ArrowRight,
} from "lucide-react";

// =========================================================
// FACILITY TYPE
// =========================================================

export interface FacilityItem {
  _id?: string;

  name: string;

  image: string;

  title: string;

  description: string;

  detailsText: string;

  detailsLink: string;

  isActive: boolean;

  order: number;
}

// =========================================================
// PROPS
// =========================================================

interface FacilitiesRowProps {
  facility: FacilityItem;

  isSelected: boolean;

  onSelect: () => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function FacilitiesRow({
  facility,
  isSelected,
  onSelect,
}: FacilitiesRowProps) {
  // =======================================================
  // RENDER
  // =======================================================

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        group
        flex
        min-h-[76px]
        w-full
        items-center
        justify-between
        rounded-[7px]
        px-6
        py-4
        text-left
        transition-all
        duration-300
        sm:min-h-[80px]
        sm:px-7
        ${
          isSelected
            ? `
              bg-white
              text-[#008B45]
              shadow-sm
            `
            : `
              bg-white
              text-black
              hover:bg-white
              hover:shadow-sm
            `
        }
      `}
    >
      {/* =================================================
          FACILITY NAME
      ================================================= */}

      <span
        className={`
          font-serif
          text-lg
          font-bold
          leading-tight
          sm:text-xl
          lg:text-[21px]
          ${
            isSelected
              ? "text-[#008B45]"
              : "text-black"
          }
        `}
      >
        {facility.name}
      </span>

      {/* =================================================
          ARROW
      ================================================= */}

      {!isSelected && (
        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-[2px]
            bg-[#E6F4EC]
            text-[#FFC800]
            transition-all
            duration-300
            group-hover:bg-[#D9EFE3]
          "
        >
          <ArrowRight
            size={25}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </span>
      )}
    </button>
  );
}