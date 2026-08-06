"use client";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        flex-col
        border-r
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Logo */}
      <SidebarHeader />

      {/* Menu */}
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

      {/* Footer */}
      <SidebarFooter />
    </aside>
  );
}