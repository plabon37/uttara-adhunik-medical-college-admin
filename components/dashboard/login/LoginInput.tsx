"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface LoginInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-100 ${className}`}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

LoginInput.displayName = "LoginInput";

export default LoginInput;