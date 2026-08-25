import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import NoticeTable from "@/components/dashboard/home/notices/NoticeTable";

export default function NoticePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#008B45]">
              Website
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Notice Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create, manage, and organize notices displayed on the website
              homepage.
            </p>
          </div>

          {/* =================================================
              PAGE ACTIONS
          ================================================= */}

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Back Button */}
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Back
            </Link>

            {/* Add Notice Button */}
            <Link
              href="/dashboard/home/notices/new"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00763B]"
            >
              <Plus size={18} />
              Add Notice
            </Link>
          </div>
        </div>

        {/* =================================================
            NOTICE TABLE
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <NoticeTable />
        </div>
      </div>
    </main>
  );
}