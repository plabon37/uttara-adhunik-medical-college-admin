"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

export default function SidebarFooter() {
  return (
    <div className="border-t border-slate-200 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 font-semibold text-white">
          A
        </div>

        <div>
          <h4 className="font-semibold text-slate-800">
            Administrator
          </h4>

          <p className="text-sm text-slate-500">
            admin@gmail.com
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={18} />

        Logout
      </Link>
    </div>
  );
}