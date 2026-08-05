"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoginButtonProps {
  loading: boolean;
}

export default function LoginButton({
  loading,
}: LoginButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: loading ? 1 : 1.02,
      }}
      whileTap={{
        scale: loading ? 1 : 0.98,
      }}
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Logging in...
        </>
      ) : (
        "Login"
      )}
    </motion.button>
  );
}