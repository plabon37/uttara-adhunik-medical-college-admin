"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarItemProps {
  title: string;
  href: string;
  icon?: LucideIcon;
  isChild?: boolean;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
  isChild = false,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.div
        whileHover={{
          x: 4,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.18,
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
              ? "ml-5 px-4 py-2.5"
              : "px-4 py-3"
          }
          ${
            isActive
              ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-md"
              : "text-slate-700 hover:bg-slate-100"
          }
        `}
      >
        {/* Active Indicator */}
        {isActive && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
        )}

        {/* Icon */}
        {Icon && (
          <Icon
            size={20}
            className={
              isActive
                ? "text-white"
                : "text-slate-500 transition group-hover:text-teal-600"
            }
          />
        )}

        {/* Title */}
        <span className="flex-1 truncate text-sm font-medium">
          {title}
        </span>
      </motion.div>
    </Link>
  );
}