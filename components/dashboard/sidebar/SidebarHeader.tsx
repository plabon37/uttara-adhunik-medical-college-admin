"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SidebarHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <Link
        href="/dashboard"
        className="block"
      >
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex items-center gap-4 px-6 py-5"
        >
          {/* Logo */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-teal-600
              to-cyan-500
              shadow-md
            "
          >
            {/* Replace when logo is available */}

            <Image
              src="/logo.png"
              alt="UAMC Logo"
              width={38}
              height={38}
              priority
              className="object-contain"
            />
          </div>

          {/* Text */}

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-slate-800">
              UAMC
            </h1>

            <p className="truncate text-sm text-slate-500">
              Admin Dashboard
            </p>
          </div>
        </motion.div>
      </Link>
    </header>
  );
}