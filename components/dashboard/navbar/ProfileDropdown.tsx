"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileDropdown() {
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Profile Button */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          shadow-sm
          transition-all
          duration-200
          hover:border-teal-500
          hover:bg-teal-50
        "
      >
        {/* Avatar */}

        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-600 to-cyan-500">
          <Image
            src="/avatar.png"
            alt="Administrator"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>

        {/* Info */}

        <div className="hidden text-left lg:block">
          <h3 className="text-sm font-semibold text-slate-800">
            Administrator
          </h3>

          <p className="text-xs text-slate-500">
            admin@uamc.edu.bd
          </p>
        </div>

        <ChevronDown
          size={18}
          className="hidden text-slate-500 lg:block"
        />
      </button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              mt-3
              w-64
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
            "
          >
            {/* Header */}

            <div className="border-b border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800">
                Administrator
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                admin@uamc.edu.bd
              </p>
            </div>

            {/* Menu */}

            <div className="p-2">

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                <User size={18} />
                My Profile
              </Link>

              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                <Settings size={18} />
                Settings
              </Link>

              <button
                type="button"
                disabled={loading}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                <LogOut size={18} />
                {loading ? "Logging out..." : "Logout"}
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}