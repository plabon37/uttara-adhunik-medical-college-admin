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
      toast.error("Something went wrong");
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
      className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
    >
      {/* Heading */}

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue to the admin dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Email */}

        <div className="relative">
          <Mail className="absolute left-4 top-[45px] h-5 w-5 text-slate-400" />

          <LoginInput
            label="Email Address"
            type="email"
            placeholder="admin@gmail.com"
            className="pl-11"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />
        </div>

        {/* Password */}

        <div className="relative">
          <Lock className="absolute left-4 top-[45px] h-5 w-5 text-slate-400" />

          <LoginInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="pl-11 pr-12"
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
            className="absolute right-4 top-[45px] text-slate-400 hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {/* Remember & Forgot */}

        <div className="flex items-center justify-between text-sm">
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

        {/* Button */}

        <LoginButton loading={loading} />
      </form>
    </motion.div>
  );
}