"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
    >
      {/* Logo */}

      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg">
          <Lock size={36} />
        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to access the UAMC Admin Dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Email */}

        <div className="relative">
          <Mail className="absolute left-4 top-[46px] h-5 w-5 text-slate-400" />

          <LoginInput
            label="Email Address"
            type="email"
            placeholder="admin@gmail.com"
            className="pl-12"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />
        </div>

        {/* Password */}

        <div className="relative">
          <Lock className="absolute left-4 top-[46px] h-5 w-5 text-slate-400" />

          <LoginInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="pl-12 pr-12"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-[46px] text-slate-400 transition hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Remember */}

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              className="rounded border-slate-300"
            />
            Remember Me
          </label>

          <button
            type="button"
            className="font-medium text-teal-600 transition hover:text-teal-700"
          >
            Forgot Password?
          </button>
        </div>

        <LoginButton loading={loading} />
      </form>

      <div className="mt-8 border-t border-slate-200 pt-5 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Uttara Adhunik Medical College
        </p>
      </div>
    </motion.div>
  );
}