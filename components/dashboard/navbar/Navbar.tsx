"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-72 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome Back, Administrator
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-teal-600"
          />
        </div>

        {/* Notification */}

        <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
            A
          </div>

          <div className="text-left">
            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}