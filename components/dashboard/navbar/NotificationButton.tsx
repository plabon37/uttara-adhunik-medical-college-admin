"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Notification Button */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm
          transition-all
          duration-200
          hover:border-teal-500
          hover:bg-teal-50
          hover:text-teal-700
          active:scale-95
        "
      >
        <Bell size={20} />

        {/* Badge */}

        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />

          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
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
              w-80
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
            "
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="font-semibold text-slate-800">
                Notifications
              </h3>

              <button
                type="button"
                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
              >
                <CheckCheck size={16} />

                Mark all read
              </button>
            </div>

            {/* Body */}

            <div className="max-h-80 overflow-y-auto">
              <div className="px-5 py-6 text-center text-sm text-slate-500">
                No new notifications.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}