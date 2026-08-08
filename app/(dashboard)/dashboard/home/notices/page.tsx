import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import NoticeTable from "@/components/dashboard/home/notices/NoticeTable";

export default function NoticePage() {
  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Notice Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage homepage notices.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Back */}

          <Link
            href="/dashboard"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-5
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <ArrowLeft size={18} />

            Back
          </Link>

          {/* Add Notice */}

          <Link
            href="/dashboard/home/notices/new"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-teal-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-teal-700
            "
          >
            <Plus size={18} />

            Add Notice
          </Link>
        </div>
      </div>

      {/* =========================
          NOTICE TABLE
      ========================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <NoticeTable />
      </div>
    </div>
  );
}