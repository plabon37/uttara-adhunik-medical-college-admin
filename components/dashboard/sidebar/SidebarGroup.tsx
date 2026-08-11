"use client";

import {
  useState,
} from "react";

import {
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import SidebarItem from "./SidebarItem";

// =========================================================
// TYPES
// =========================================================

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

// =========================================================
// COMPONENT
// =========================================================

export default function SidebarGroup({
  title,
  icon: Icon,
  items,
  defaultOpen = false,
  onItemClick,
}: SidebarGroupProps) {
  const pathname =
    usePathname();

  // =======================================================
  // ACTIVE CHILD
  // =======================================================

  const hasActiveChild =
    items.some(
      (item) =>
        pathname ===
          item.href ||
        pathname.startsWith(
          `${item.href}/`
        )
    );

  // =======================================================
  // MANUAL OPEN
  // =======================================================

  const [
    manualOpen,
    setManualOpen,
  ] = useState(
    defaultOpen
  );

  // =======================================================
  // OPEN STATE
  // =======================================================

  const open =
    hasActiveChild ||
    manualOpen;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        w-full
      "
    >
      {/* =================================================
          GROUP BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setManualOpen(
            (prev) =>
              !prev
          )
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
        {/* =================================================
            LEFT
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
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

        {/* =================================================
            ARROW
        ================================================= */}

        <motion.div
          animate={{
            rotate:
              open
                ? 180
                : 0,
          }}
          transition={{
            duration:
              0.2,
          }}
        >
          <ChevronDown
            size={18}
            className="
              text-slate-500
            "
          />
        </motion.div>
      </button>

      {/* =================================================
          CHILDREN
      ================================================= */}

      <AnimatePresence
        initial={false}
      >
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height:
                "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration:
                0.25,
            }}
            className="
              overflow-hidden
            "
          >
            <div
              className="
                ml-5
                mt-1
                space-y-1
                border-l-2
                border-slate-200
                pl-3
              "
            >
              {items.map(
                (item) => (
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
                        item.href
                      }
                      isChild
                    />
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}