import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Navbar from "@/components/dashboard/navbar/Navbar";
import MobileSidebar from "@/components/dashboard/sidebar/MobileSidebar";

import { DashboardProvider } from "@/context/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-slate-100">
        <Sidebar />

        <MobileSidebar />

        <div className="min-h-screen lg:ml-72">
          <Navbar />

          <main className="px-4 pt-24 pb-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}