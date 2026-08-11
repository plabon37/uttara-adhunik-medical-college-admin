"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-[260px]
        shrink-0
        flex-col
        border-r
        border-slate-200
        bg-white
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <SidebarHeader />

      {/* =================================================
          MENU
      ================================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          py-5
          scrollbar-thin
          scrollbar-thumb-slate-300
          scrollbar-track-transparent
        "
      >
        <SidebarMenu />
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <SidebarFooter />
    </aside>
  );
}