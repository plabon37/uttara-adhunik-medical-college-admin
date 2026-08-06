"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarMenu from "./SidebarMenu";

import { useDashboard } from "@/context/DashboardContext";

export default function MobileSidebar() {
  const { sidebarOpen, closeSidebar } = useDashboard();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[280px] max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeSidebar}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <SidebarHeader />

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <SidebarMenu onItemClick={closeSidebar} />
            </div>

            {/* Footer */}
            <SidebarFooter />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}