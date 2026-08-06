"use client";

import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <>
      {/* Desktop Search */}
      <div className="relative hidden xl:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search pages, notices, careers..."
          className="
            h-11
            w-80
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            pl-11
            pr-4
            text-sm
            text-slate-700
            placeholder:text-slate-400
            outline-none
            transition-all
            duration-200
            focus:border-teal-500
            focus:bg-white
            focus:ring-4
            focus:ring-teal-100
          "
        />
      </div>

      {/* Tablet Search */}
      <div className="relative hidden md:block xl:hidden">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            h-11
            w-56
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            pl-11
            pr-4
            text-sm
            outline-none
            transition-all
            duration-200
            focus:border-teal-500
            focus:bg-white
            focus:ring-4
            focus:ring-teal-100
          "
        />
      </div>

      {/* Mobile Search */}
      <button
        type="button"
        aria-label="Search"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          shadow-sm
          transition-all
          duration-200
          hover:border-teal-500
          hover:bg-teal-50
          hover:text-teal-700
          active:scale-95
          md:hidden
        "
      >
        <Search size={20} />
      </button>
    </>
  );
}