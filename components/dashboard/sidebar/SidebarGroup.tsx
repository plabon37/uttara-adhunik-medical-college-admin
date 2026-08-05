"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SidebarItem from "./SidebarItem";

interface ChildItem {
  title: string;
  href: string;
}

interface SidebarGroupProps {
  title: string;
  icon: React.ElementType;
  items: ChildItem[];
  defaultOpen?: boolean;
}

export default function SidebarGroup({
  title,
  icon: Icon,
  items,
  defaultOpen = false,
}: SidebarGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      {/* Group Button */}

      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 hover:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className="text-slate-500 transition group-hover:text-teal-600"
          />

          <span className="font-medium text-slate-700">
            {title}
          </span>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
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
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-6 border-l-2 border-slate-200 pl-3 space-y-1">
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  isChild
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}