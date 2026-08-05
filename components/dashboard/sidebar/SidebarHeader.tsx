"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarHeader() {
  return (
    <Link href="/dashboard">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="border-b border-slate-200 px-6 py-6"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg">
            <GraduationCap size={30} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800 leading-none">
              UAMC
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Admin Dashboard
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}