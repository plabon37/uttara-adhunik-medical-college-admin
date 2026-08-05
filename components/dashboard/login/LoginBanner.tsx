"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope } from "lucide-react";

export default function LoginBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-700 lg:flex lg:flex-col lg:justify-between">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating Circle 1 */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />

      {/* Floating Circle 2 */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-14 text-white">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
            <Stethoscope className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Uttara Adhunik Medical College
            </h2>

            <p className="text-sm text-cyan-100">
              Admin Management System
            </p>
          </div>
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Welcome Back,
            <br />
            Administrator
          </h1>

          <p className="text-lg leading-8 text-cyan-100">
            Manage your website, services, projects, galleries, team members,
            and all dynamic content securely from one centralized dashboard.
          </p>

          <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-md">
            <ShieldCheck className="h-8 w-8 text-emerald-300" />

            <div>
              <h3 className="font-semibold">
                Secure Authentication
              </h3>

              <p className="text-sm text-cyan-100">
                Protected with JWT Authentication & HttpOnly Cookies.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-cyan-100"
        >
          © {new Date().getFullYear()} Uttara Adhunik Medical College.
          <br />
          All Rights Reserved.
        </motion.div>
      </div>
    </div>
  );
}