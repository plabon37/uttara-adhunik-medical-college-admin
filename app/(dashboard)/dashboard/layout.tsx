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
      <div
        className="
          min-h-screen
          bg-slate-100
        "
      >
        {/* =================================================
            DESKTOP SIDEBAR
        ================================================= */}

        <div
          className="
            fixed
            inset-y-0
            left-0
            z-40
            hidden
            w-[260px]
            lg:block
          "
        >
          <Sidebar />
        </div>

        {/* =================================================
            MOBILE SIDEBAR
        ================================================= */}

        <MobileSidebar />

        {/* =================================================
            MAIN AREA
        ================================================= */}

        <div
          className="
            min-h-screen
            lg:ml-[260px]
          "
        >
          {/* =================================================
              NAVBAR
          ================================================= */}

          <Navbar />

          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <main
            className="
              w-full
              px-4
              pb-8
              pt-24
              sm:px-6
              lg:px-8
            "
          >
            <div
              className="
                w-full
                max-w-[1600px]
                mx-auto
              "
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}