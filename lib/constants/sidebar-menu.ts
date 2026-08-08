import {
  Home,
  Building2,
  Hospital,
  GraduationCap,
  Newspaper,
  Briefcase,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Home",
    icon: Home,
    items: [
      {
        title: "Hero",
        href: "/dashboard/home/hero",
      },
      {
        title: "Notice Banner",
        href: "/dashboard/home/notices",
      },
      {
        title: "Publications",
        href: "/dashboard/home/publications",
      },
      {
        title: "Why Choose UAMC",
        href: "/dashboard/home/why-uamc",
      },
      {
        title: "Statistics",
        href: "/dashboard/home/statistics",
      },
      {
        title: "Gallery",
        href: "/dashboard/home/gallery",
      },
      {
        title: "Notice",
        href: "/dashboard/home/notice",
      },
      {
        title: "Contact",
        href: "/dashboard/home/contact",
      },
    ],
  },

  {
    title: "About UAMC",
    icon: Building2,
    items: [
      {
        title: "Overview",
        href: "/dashboard/about/overview",
      },
      {
        title: "History",
        href: "/dashboard/about/history",
      },
      {
        title: "Vision & Mission",
        href: "/dashboard/about/vision-mission",
      },
      {
        title: "Aim & Objective",
        href: "/dashboard/about/aim-objective",
      },
      {
        title: "Organizational Structure",
        href: "/dashboard/about/organizational-structure",
      },
      {
        title: "Founder Members",
        href: "/dashboard/about/founder-members",
      },
      {
        title: "EC Members",
        href: "/dashboard/about/ec-members",
      },
      {
        title: "GB Members",
        href: "/dashboard/about/gb-members",
      },
    ],
  },

  {
    title: "Facilities",
    icon: Hospital,
    items: [
      {
        title: "Hospital Service",
        href: "/dashboard/facilities/hospital-service",
      },
      {
        title: "Departments",
        href: "/dashboard/facilities/departments",
      },
      {
        title: "Library",
        href: "/dashboard/facilities/library",
      },
      {
        title: "Medical Education Unit",
        href: "/dashboard/facilities/medical-education-unit",
      },
      {
        title: "Training",
        href: "/dashboard/facilities/training",
      },
      {
        title: "Publications",
        href: "/dashboard/facilities/publications",
      },
      {
        title: "Seminar",
        href: "/dashboard/facilities/seminar",
      },
      {
        title: "Hostel",
        href: "/dashboard/facilities/hostel",
      },
      {
        title: "Laboratory",
        href: "/dashboard/facilities/laboratory",
      },
      {
        title: "Cafeteria",
        href: "/dashboard/facilities/cafeteria",
      },
    ],
  },

  {
    title: "Admission",
    icon: GraduationCap,
    items: [
      {
        title: "Admission Procedure & Fees",
        href: "/dashboard/admission/procedure-fees",
      },
      {
        title: "Admission Papers",
        href: "/dashboard/admission/papers",
      },
      {
        title: "Application Form",
        href: "/dashboard/admission/application-form",
      },
      {
        title: "Admission Result",
        href: "/dashboard/admission/result",
      },
      {
        title: "Online Registration",
        href: "/dashboard/admission/online-registration",
      },
    ],
  },

  {
    title: "Notice & Media",
    icon: Newspaper,
    href: "/dashboard/notice-media",
  },

  {
    title: "Career",
    icon: Briefcase,
    href: "/dashboard/career",
  },
];