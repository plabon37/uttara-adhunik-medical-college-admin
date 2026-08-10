"use client";

import { Loader2 } from "lucide-react";

export default function FacilitiesLoading() {
  return (
    <div
      className="
        flex
        min-h-[520px]
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
          <Loader2
            size={30}
            strokeWidth={2}
            className="
              animate-spin
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
          Loading Facilities
        </h2>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            max-w-[480px]
            text-sm
            leading-6
            text-slate-500
          "
        >
          Please wait while we load
          the Facilities section data.
        </p>

        {/* =================================================
            LOADING DOTS
        ================================================= */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-1.5
          "
        >
          <span
            className="
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-[#008B45]
            "
          />

          <span
            className="
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-[#008B45]
              [animation-delay:150ms]
            "
          />

          <span
            className="
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-[#008B45]
              [animation-delay:300ms]
            "
          />
        </div>
      </div>
    </div>
  );
}