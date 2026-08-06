"use client";

import { Loader2, LogIn } from "lucide-react";

interface LoginButtonProps {
  loading: boolean;
}

export default function LoginButton({
  loading,
}: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-teal-600
        to-cyan-600
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Signing In...
        </>
      ) : (
        <>
          <LogIn className="h-5 w-5" />
          Sign In
        </>
      )}
    </button>
  );
}