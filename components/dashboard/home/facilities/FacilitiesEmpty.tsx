"use client";

import { Building2 } from "lucide-react";

export default function FacilitiesEmpty() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        w-full
        items-center
        justify-center
        bg-[#F8FAF9]
        px-4
        py-10
        sm:px-6
      "
    >
      <div
        className="
          flex
          w-full
          max-w-[700px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-12
          text-center
          shadow-sm
          sm:px-10
          sm:py-14
        "
      >
        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
          "
        >
          <Building2
            size={30}
            strokeWidth={1.6}
            className="
              text-[#008B45]
            "
          />
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            mt-5
            text-xl
            font-semibold
            text-slate-800
            sm:text-2xl
          "
        >
          Facilities Section Not Found
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            max-w-[500px]
            text-sm
            leading-6
            text-slate-500
            sm:text-base
          "
        >
          No Facilities section has been
          created yet. Create the
          Facilities section to display
          it on the homepage.
        </p>
      </div>
    </div>
  );
}