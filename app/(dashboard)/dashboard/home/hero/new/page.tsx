import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import HeroForm from "@/components/dashboard/home/hero/HeroForm";

export default function NewHeroPage() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Add Hero
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new homepage hero section.
          </p>
        </div>

        <Link
          href="/dashboard/home/hero"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Form */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <HeroForm />
      </div>
    </div>
  );
}