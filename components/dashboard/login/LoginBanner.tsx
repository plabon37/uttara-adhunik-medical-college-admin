"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export default function LoginBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 lg:flex">
      {/* Background Blur */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-teal-300/10 blur-3xl" />

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute left-16 top-16 rounded-2xl bg-white/10 p-5 backdrop-blur-md"
      >
        <GraduationCap className="h-8 w-8 text-white" />
      </motion.div>

      <motion.div
        animate={{ y: [12, -12, 12] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-16 top-24 rounded-2xl bg-white/10 p-5 backdrop-blur-md"
      >
        <ShieldCheck className="h-8 w-8 text-white" />
      </motion.div>

      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute bottom-20 left-24 rounded-2xl bg-white/10 p-5 backdrop-blur-md"
      >
        <Building2 className="h-8 w-8 text-white" />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute bottom-24 right-20 rounded-2xl bg-white/10 p-5 backdrop-blur-md"
      >
        <Stethoscope className="h-8 w-8 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-center px-16 text-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-lg">
            <GraduationCap className="h-12 w-12" />
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Uttara Adhunik
            <br />
            Medical College
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
            Welcome to the official Administration Portal.
            Manage departments, admissions, faculty,
            notices, facilities and website content from
            one secure dashboard.
          </p>

          <div className="mt-12 flex gap-6">
            <div>
              <h3 className="text-3xl font-bold">10+</h3>
              <p className="text-slate-300">
                Departments
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">5000+</h3>
              <p className="text-slate-300">
                Students
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-slate-300">
                Administration
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}