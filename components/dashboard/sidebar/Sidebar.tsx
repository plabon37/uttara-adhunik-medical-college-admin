"use client";

import { sidebarMenu } from "@/lib/constants/sidebar-menu";
import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

function SidebarFooter() {
  return (
    <div className="border-t border-slate-200 px-4 py-4">
      {/* Sidebar footer content */}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl">
      {/* Header */}

      <SidebarHeader />

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="space-y-2">
          {sidebarMenu.map((item) => {
            if (item.items) {
              return (
                <SidebarGroup
  key={item.title}
  title={item.title}
  icon={item.icon}
  items={item.items}
  defaultOpen={item.title === "Home"}
/>
              );
            }

            return (
              <SidebarItem
                key={item.title}
                title={item.title}
                href={item.href!}
                icon={item.icon}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <SidebarFooter />
    </aside>
  );
}