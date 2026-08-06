"use client";

import { sidebarMenu } from "@/lib/constants/sidebar-menu";

import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";

interface SidebarMenuProps {
  onItemClick?: () => void;
}

export default function SidebarMenu({
  onItemClick,
}: SidebarMenuProps) {
  return (
    <nav className="space-y-2">
      {sidebarMenu.map((item) => {
        if (item.items) {
          return (
            <SidebarGroup
  key={item.title}
  title={item.title}
  icon={item.icon}
  items={item.items}
  onItemClick={onItemClick}
/>
          );
        }

        return (
          <div
            key={item.title}
            onClick={onItemClick}
          >
            <SidebarItem
              title={item.title}
              href={item.href}
              icon={item.icon}
            />
          </div>
        );
      })}
    </nav>
  );
}