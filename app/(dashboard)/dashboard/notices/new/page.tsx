import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import NoticeForm from "@/components/dashboard/home/notices/NoticeForm";

export const metadata = {
  title: "Create Notice",
};

export default function NewNoticePage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Notice
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new notice for the website.
          </p>

        </div>

        <Link
          href="/dashboard/notices"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-semibold
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />

          Back
        </Link>

      </div>

      <NoticeForm />

    </div>
  );
}