import Link from "next/link";
import { Plus } from "lucide-react";

import NoticeTable from "@/components/dashboard/home/notices/NoticeTable";

export const metadata = {
  title: "Notice Management",
};

export default function NoticePage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Notice Management
          </h1>

          <p className="mt-2 text-slate-500">
            Create, update and manage website notices.
          </p>

        </div>

        <Link
          href="/dashboard/notices/new"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-teal-600
            px-6
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

      <NoticeTable />

    </div>
  );
}