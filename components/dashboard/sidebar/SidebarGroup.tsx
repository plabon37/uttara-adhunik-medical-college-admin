"use client";

import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import SidebarItem from "./SidebarItem";

interface SidebarGroupItem {
  title: string;
  href: string;
}

interface SidebarGroupProps {
  title: string;
  icon: LucideIcon;
  items: SidebarGroupItem[];
  defaultOpen?: boolean;
  onItemClick?: () => void;
}

export default function SidebarGroup({
  title,
  icon: Icon,
  items,
  defaultOpen = false,
  onItemClick,
}: SidebarGroupProps) {
  const pathname = usePathname();

  const hasActiveChild = items.some(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  const [manualOpen, setManualOpen] =
    useState(defaultOpen);

  const open = hasActiveChild || manualOpen;

  return (
    <div className="rounded-2xl">
      {/* Group Button */}

      <button
        type="button"
        onClick={() =>
          setManualOpen((prev) => !prev)
        }
        className="
          group
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          px-4
          py-3
          text-left
          transition-all
          duration-200
          hover:bg-slate-100
        "
      >
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className={`
              transition-colors
              ${
                open
                  ? "text-teal-600"
                  : "text-slate-500 group-hover:text-teal-600"
              }
            `}
          />

          <span
            className={`
              text-sm
              font-medium
              ${
                open
                  ? "text-teal-700"
                  : "text-slate-700"
              }
            `}
          >
            {title}
          </span>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <ChevronDown
            size={18}
            className="text-slate-500"
          />
        </motion.div>
      </button>

      {/* Children */}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="ml-5 mt-1 border-l-2 border-slate-200 pl-3 space-y-1">
              {items.map((item) => (
  <div
    key={item.href}
    onClick={onItemClick}
  >
    <SidebarItem
      title={item.title}
      href={item.href}
      isChild
    />
  </div>
))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}