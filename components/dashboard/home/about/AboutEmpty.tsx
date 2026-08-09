"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Plus,
} from "lucide-react";

export default function AboutEmpty() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 shadow-sm sm:px-8">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
          <Building2
            size={30}
            strokeWidth={1.6}
            className="text-[#008B45]"
          />
        </div>

        {/* Title */}

        <h2 className="mt-5 text-xl font-semibold text-slate-800 sm:text-2xl">
          About Section Not Found
        </h2>

        {/* Description */}

        <p className="mt-3 text-sm leading-6 text-slate-500">
          No About UAMC content has been created
          yet. Create the About section to
          display it on the homepage.
        </p>

        {/* Create Button */}

        <Link
          href="/dashboard/home/about/new"
          className="
            mt-6
            inline-flex
            min-h-11
            items-center
            gap-2
            rounded-xl
            bg-[#008B45]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#00763B]
            hover:shadow-md
          "
        >
          <Plus size={18} />

          Create About Section

          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}