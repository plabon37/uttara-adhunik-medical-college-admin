import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import NoticeForm from "@/components/dashboard/home/notices/NoticeForm";

export default function NewNoticePage() {
  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Add Notice
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new homepage notice.
          </p>
        </div>

        <Link
          href="/dashboard/home/notices"
          className="
            inline-flex
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
      </div>

      {/* =========================
          FORM
      ========================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <NoticeForm />
      </div>
    </div>
  );
}