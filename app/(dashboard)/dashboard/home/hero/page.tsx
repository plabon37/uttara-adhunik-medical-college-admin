import HeroTable from "@/components/dashboard/home/hero/HeroTable";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function HeroPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Hero Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage homepage hero slider.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <Link
            href="/dashboard/home"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            href="/dashboard/home/hero/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            <Plus size={18} />
            Add Hero
          </Link>

        </div>

      </div>

      {/* Table */}

      <HeroTable />

    </div>
  );
}