"use client";

import { Menu } from "lucide-react";

import { useDashboard } from "@/context/DashboardContext";

export default function MobileMenuButton() {
  const { openSidebar } = useDashboard();

  return (
    <button
      type="button"
      onClick={openSidebar}
      aria-label="Open sidebar"
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
        text-slate-700
        shadow-sm
        transition-all
        duration-200
        hover:border-teal-500
        hover:bg-teal-50
        hover:text-teal-700
        active:scale-95
        lg:hidden
      "
    >
      <Menu size={22} />
    </button>
  );
}