"use client";

import {
  useSyncExternalStore,
} from "react";

import {
  sidebarMenu,
} from "@/lib/constants/sidebar-menu";

import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";

// =========================================================
// PROPS
// =========================================================

interface SidebarMenuProps {
  onItemClick?: () => void;
}

// =========================================================
// HYDRATION-SAFE CLIENT CHECK
// =========================================================

const emptySubscribe = () => {
  return () => {};
};

const getServerSnapshot = () => {
  return false;
};

const getClientSnapshot = () => {
  return true;
};

// =========================================================
// COMPONENT
// =========================================================

export default function SidebarMenu({
  onItemClick,
}: SidebarMenuProps) {
  // =======================================================
  // HYDRATION STATE
  //
  // Server:
  // false
  //
  // First client render:
  // false
  //
  // After hydration:
  // true
  //
  // No useEffect + setState required.
  // =======================================================

  const isClient =
    useSyncExternalStore(
      emptySubscribe,
      getClientSnapshot,
      getServerSnapshot
    );

  // =======================================================
  // SERVER / INITIAL CLIENT
  // =======================================================

  if (!isClient) {
    return (
      <nav
        aria-label="Dashboard navigation"
        className="
          flex
          flex-col
          gap-1
        "
      />
    );
  }

  // =======================================================
  // CLIENT MENU
  // =======================================================

  return (
    <nav
      aria-label="Dashboard navigation"
      className="
        flex
        flex-col
        gap-1
      "
    >
      {sidebarMenu.map(
        (item) => {
          // =================================================
          // GROUP
          // =================================================

          if (
            item.items &&
            item.items.length > 0
          ) {
            return (
              <SidebarGroup
                key={
                  item.title
                }
                title={
                  item.title
                }
                icon={
                  item.icon
                }
                items={
                  item.items
                }
                onItemClick={
                  onItemClick
                }
              />
            );
          }

          // =================================================
          // NORMAL ITEM
          // =================================================

          return (
            <div
              key={
                item.title
              }
              onClick={
                onItemClick
              }
            >
              <SidebarItem
                title={
                  item.title
                }
                href={
                  item.href || "#"
                }
                icon={
                  item.icon
                }
              />
            </div>
          );
        }
      )}
    </nav>
  );
}