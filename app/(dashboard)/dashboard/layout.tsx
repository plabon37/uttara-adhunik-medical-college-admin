import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Navbar from "@/components/dashboard/navbar/Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="px-8 pb-8 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}