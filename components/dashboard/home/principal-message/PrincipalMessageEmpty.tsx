"use client";

import {
  MessageSquareQuote,
} from "lucide-react";

export default function PrincipalMessageEmpty() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-12
        text-center
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
        <MessageSquareQuote
          size={30}
          strokeWidth={1.8}
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
        No Principal Message
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
        Create a Principal Message
        section to display the
        principal&apos;s message on
        the website.
      </p>
    </div>
  );
}