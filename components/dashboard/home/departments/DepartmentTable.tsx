"use client";

import DepartmentTableRow, {
  DepartmentData,
} from "./DepartmentTableRow";

// =========================================================
// PROPS
// =========================================================

interface DepartmentTableProps {
  departments: DepartmentData[];

  onDelete: (id: string) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentTable({
  departments,
  onDelete,
}: DepartmentTableProps) {
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
      {/* =====================================================
          DESKTOP TABLE HEADER
      ===================================================== */}

      <div
        className="
          hidden
          grid-cols-[80px_minmax(220px,1fr)_140px_120px_120px_120px]
          items-center
          gap-4
          border-b
          border-slate-200
          bg-slate-50
          px-6
          py-4
          lg:grid
        "
      >
        {/* IMAGE */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Image
        </div>

        {/* DEPARTMENT */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Department
        </div>

        {/* POPULAR */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Popular
        </div>

        {/* STATUS */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Status
        </div>

        {/* ORDER */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Order
        </div>

        {/* ACTIONS */}

        <div
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Actions
        </div>
      </div>

      {/* =====================================================
          TABLE ROWS
      ===================================================== */}

      <div>
        {departments.map(
          (department) => (
            <DepartmentTableRow
              key={department._id}
              department={department}
              onDelete={onDelete}
            />
          )
        )}
      </div>
    </div>
  );
}