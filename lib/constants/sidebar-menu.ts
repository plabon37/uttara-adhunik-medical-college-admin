import {
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Home,
  LayoutDashboard,
  Newspaper,
  Settings,
  LogOut,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },

  {
    title: "Home",
    icon: Home,
    items: [
      {
        title: "Hero",
        href: "/dashboard/home/hero",
      },
      {
        title: "Chairman Message",
        href: "/dashboard/home/chairman-message",
      },
      {
        title: "Principal Message",
        href: "/dashboard/home/principal-message",
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
        title: "Facilities Overview",
        href: "/dashboard/home/facilities-overview",
      },
      {
        title: "Latest Notice",
        href: "/dashboard/home/latest-notice",
      },
      {
        title: "Gallery",
        href: "/dashboard/home/gallery",
      },
      {
        title: "Testimonials",
        href: "/dashboard/home/testimonials",
      },
      {
        title: "Partners",
        href: "/dashboard/home/partners",
      },
      {
        title: "FAQ",
        href: "/dashboard/home/faq",
      },
    ],
  },

  {
    title: "About UAMC",
    icon: Building2,
    items: [
      {
        title: "About UAMC Page",
        href: "/dashboard/about",
      },
      {
        title: "Overview",
        href: "/dashboard/about/overview",
      },
      {
        title: "History of UAMC",
        href: "/dashboard/about/history",
      },
      {
        title: "Vision & Mission",
        href: "/dashboard/about/vision-mission",
      },
      {
        title: "Aim & Objectives",
        href: "/dashboard/about/aim-objectives",
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
    icon: Building2,
    items: [
      {
        title: "Facilities Page",
        href: "/dashboard/facilities",
      },
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
        title: "Admission Page",
        href: "/dashboard/admission",
      },
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
        title: "Admission Results",
        href: "/dashboard/admission/results",
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
    items: [
      {
        title: "Notice",
        href: "/dashboard/notice-media/notice",
      },
      {
        title: "News",
        href: "/dashboard/notice-media/news",
      },
      {
        title: "Events",
        href: "/dashboard/notice-media/events",
      },
      {
        title: "Gallery",
        href: "/dashboard/notice-media/gallery",
      },
      {
        title: "Video Gallery",
        href: "/dashboard/notice-media/videos",
      },
      {
        title: "Downloads",
        href: "/dashboard/notice-media/downloads",
      },
    ],
  },

  {
    title: "Career",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Job Circular",
        href: "/dashboard/career/jobs",
      },
      {
        title: "Apply Online",
        href: "/dashboard/career/apply",
      },
      {
        title: "Applications",
        href: "/dashboard/career/applications",
      },
      {
        title: "Career Settings",
        href: "/dashboard/career/settings",
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },

  {
    title: "Logout",
    icon: LogOut,
    href: "/logout",
  },
];