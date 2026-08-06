"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  dashboard: "Dashboard",

  home: "Home",
  hero: "Hero",
  chairman: "Chairman Message",
  principal: "Principal Message",
  gallery: "Gallery",

  about: "About UAMC",
  overview: "Overview",
  history: "History",
  vision: "Vision & Mission",
  aim: "Aim & Objective",
  organizational: "Organizational Structure",
  founder: "Founder Members",
  ec: "EC Members",
  gb: "GB Members",

  facilities: "Facilities",
  hospital: "Hospital Service",
  departments: "Departments",
  library: "Library",
  "medical-education-unit": "Medical Education Unit",
  training: "Training",
  publications: "Publications",
  seminar: "Seminar",
  hostel: "Hostel",
  laboratory: "Laboratory",
  cafeteria: "Cafeteria",

  admission: "Admission",
  notice: "Notice",
  media: "Media",
  career: "Career",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="min-w-0">
      {/* Mobile */}
      <h1 className="truncate text-lg font-bold text-slate-800 md:hidden">
        {routeNames[segments[segments.length - 1]] ?? "Dashboard"}
      </h1>

      {/* Desktop */}
      <nav className="hidden items-center gap-2 text-sm md:flex">
        <Home size={16} className="text-slate-400" />

        {segments.map((segment, index) => {
          const href =
            "/" + segments.slice(0, index + 1).join("/");

          const isLast = index === segments.length - 1;

          return (
            <div
              key={href}
              className="flex items-center gap-2"
            >
              <ChevronRight
                size={14}
                className="text-slate-400"
              />

              {isLast ? (
                <span className="font-semibold text-slate-800">
                  {routeNames[segment] ?? segment}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-slate-500 transition hover:text-teal-600"
                >
                  {routeNames[segment] ?? segment}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}