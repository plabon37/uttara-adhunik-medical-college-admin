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

  const active = pathname === href;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          x: 4,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`group relative flex items-center gap-3 rounded-xl transition-all duration-300 ${
          isChild ? "px-4 py-2.5 ml-4" : "px-4 py-3"
        } ${
          active
            ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        {/* Active Indicator */}

        {active && (
          <motion.div
            layoutId="active-sidebar"
            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white"
          />
        )}

        {/* Icon */}

        {Icon && (
          <Icon
            size={20}
            className={`transition ${
              active
                ? "text-white"
                : "text-slate-500 group-hover:text-teal-600"
            }`}
          />
        )}

        {/* Title */}

        <span
          className={`flex-1 text-sm font-medium ${
            active ? "text-white" : ""
          }`}
        >
          {title}
        </span>
      </motion.div>
    </Link>
  );
}