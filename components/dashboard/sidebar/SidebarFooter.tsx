"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  Loader2,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function SidebarFooter() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className="border-t border-slate-200 bg-white p-4">
      {/* Profile */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-2xl
          p-3
          transition-all
          duration-200
          hover:bg-slate-100
        "
      >
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 text-lg font-bold text-white shadow-md">

          {/* Replace later */}

          <Image
            src="/avatar.png"
            alt="Admin"
            width={48}
            height={48}
            className="object-cover"
          />

        </div>

        <div className="flex-1 text-left">
          <h3 className="truncate text-sm font-semibold text-slate-800">
            Administrator
          </h3>

          <p className="truncate text-xs text-slate-500">
            admin@uamc.edu.bd
          </p>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronUp
            size={18}
            className="text-slate-500"
          />
        </motion.div>
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
            className="mt-3 space-y-2"
          >
            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              <Settings size={18} />

              Settings
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
                text-red-600
                transition
                hover:bg-red-50
                disabled:opacity-60
              "
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <LogOut size={18} />
              )}

              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}