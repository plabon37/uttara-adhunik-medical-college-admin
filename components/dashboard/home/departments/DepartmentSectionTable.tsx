"use client";

import DepartmentSectionRow, {
  DepartmentSectionData,
} from "./DepartmentSectionRow";

// =========================================================
// PROPS
// =========================================================

interface DepartmentSectionTableProps {
  section: DepartmentSectionData;

  onDelete: (id: string) => void;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSectionTable({
  section,
  onDelete,
}: DepartmentSectionTableProps) {
  return (
    <div className="w-full">
      <DepartmentSectionRow
        section={section}
        onDelete={onDelete}
      />
    </div>
  );
}