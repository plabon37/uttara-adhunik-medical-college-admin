"use client";

import Link from "next/link";

import {
  type LucideIcon,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  motion,
} from "framer-motion";

// =========================================================
// TYPES
// =========================================================

interface SidebarItemProps {
  title: string;

  href: string;

  icon?: LucideIcon;

  isChild?: boolean;
}

// =========================================================
// COMPONENT
// =========================================================

export default function SidebarItem({
  title,
  href,
  icon: Icon,
  isChild = false,
}: SidebarItemProps) {
  const pathname =
    usePathname();

  // =======================================================
  // ACTIVE
  // =======================================================

  const isActive =
    pathname === href ||
    pathname.startsWith(
      `${href}/`
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <Link
      href={href}
      aria-current={
        isActive
          ? "page"
          : undefined
      }
      className="
        block
      "
    >
      <motion.div
        whileHover={{
          x: 4,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration:
            0.18,
        }}
        className={`
          group
          relative
          flex
          items-center
          gap-3
          rounded-xl
          transition-all
          duration-200
          ${
            isChild
              ? "ml-0 px-4 py-2.5"
              : "px-4 py-3"
          }
          ${
            isActive
              ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-md"
              : "text-slate-700 hover:bg-slate-100"
          }
        `}
      >
        {/* =================================================
            ACTIVE INDICATOR
        ================================================= */}

        {isActive && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-6
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-white
            "
          />
        )}

        {/* =================================================
            ICON
        ================================================= */}

        {Icon && (
          <Icon
            size={20}
            className={
              isActive
                ? "text-white"
                : "text-slate-500 transition-colors group-hover:text-teal-600"
            }
          />
        )}

        {/* =================================================
            TITLE
        ================================================= */}

        <span
          className="
            flex-1
            truncate
            text-sm
            font-medium
          "
        >
          {title}
        </span>
      </motion.div>
    </Link>
  );
}