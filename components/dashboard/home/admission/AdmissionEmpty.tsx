"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Plus } from "lucide-react";

export default function AdmissionEmpty() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center px-4 py-10 sm:px-6">
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10 sm:py-14">
        {/* =================================================
            EMPTY STATE ICON
        ================================================= */}

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
          <GraduationCap
            size={30}
            strokeWidth={1.6}
            className="text-[#008B45]"
          />
        </div>

        {/* =================================================
            EMPTY STATE TITLE
        ================================================= */}

        <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Admission Section Not Found
        </h2>

        {/* =================================================
            EMPTY STATE DESCRIPTION
        ================================================= */}

        <p className="mt-3 max-w-[480px] text-sm leading-6 text-slate-500">
          No Admission content has been created yet. Create the Admission
          section to display admission information on the website homepage.
        </p>

        {/* =================================================
            CREATE ADMISSION BUTTON
        ================================================= */}

        <Link
          href="/dashboard/home/admission/new"
          className="group mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008B45] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#00763B] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#008B45]/20"
        >
          <Plus size={18} />

          <span>Create Admission Section</span>

          <ArrowRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}