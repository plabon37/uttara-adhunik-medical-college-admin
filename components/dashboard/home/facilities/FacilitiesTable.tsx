"use client";

import { useMemo } from "react";

import FacilitiesRow, {
  FacilityItem,
} from "./FacilitiesRow";

// =========================================================
// PROPS
// =========================================================

interface FacilitiesTableProps {
  facilities: FacilityItem[];

  selectedFacilityId?: string;

  onSelect: (
    facility: FacilityItem
  ) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function FacilitiesTable({
  facilities,
  selectedFacilityId,
  onSelect,
}: FacilitiesTableProps) {
  // =======================================================
  // ACTIVE + SORTED FACILITIES
  // =======================================================

  const activeFacilities =
    useMemo(() => {
      return [...facilities]
        .filter(
          (facility) =>
            facility.isActive !==
            false
        )
        .sort(
          (a, b) =>
            a.order - b.order
        );
    }, [facilities]);

  // =======================================================
  // SELECTED FACILITY ID
  // =======================================================
  //
  // If parent provides a selected ID,
  // use that.
  //
  // Otherwise automatically use
  // the first active facility.
  // =======================================================

  const activeSelectedId =
    selectedFacilityId ||
    activeFacilities[0]?._id;

  // =======================================================
  // EMPTY
  // =======================================================

  if (
    activeFacilities.length ===
    0
  ) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          w-full
          items-center
          justify-center
          rounded-xl
          bg-white
          px-6
          text-center
        "
      >
        <p
          className="
            text-sm
            leading-6
            text-slate-500
          "
        >
          No facilities are
          available.
        </p>
      </div>
    );
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-5
      "
    >
      {activeFacilities.map(
        (facility) => (
          <FacilitiesRow
            key={
              facility._id ||
              `${facility.name}-${facility.order}`
            }
            facility={
              facility
            }
            isSelected={
              facility._id ===
              activeSelectedId
            }
            onSelect={() =>
              onSelect(
                facility
              )
            }
          />
        )
      )}
    </div>
  );
}