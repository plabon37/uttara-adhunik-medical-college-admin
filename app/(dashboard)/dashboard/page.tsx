import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Users,
  UserRound,
  Megaphone,
  Mail,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Notices",
    value: "24",
    change: "+12%",
    description: "from last month",
    icon: Bell,
  },
  {
    title: "News",
    value: "18",
    change: "+8%",
    description: "from last month",
    icon: Newspaper,
  },
  {
    title: "Publications",
    value: "32",
    change: "+15%",
    description: "from last month",
    icon: BookOpen,
  },
  {
    title: "Departments",
    value: "14",
    change: "+4%",
    description: "from last month",
    icon: Building2,
  },
  {
    title: "Facilities",
    value: "16",
    change: "+7%",
    description: "from last month",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    value: "09",
    change: "+10%",
    description: "from last month",
    icon: CalendarDays,
  },
  {
    title: "Feedback",
    value: "47",
    change: "+18%",
    description: "from last month",
    icon: MessageSquare,
  },
  {
    title: "Subscribers",
    value: "128",
    change: "+22%",
    description: "from last month",
    icon: Mail,
  },
];

const contentOverview = [
  {
    name: "Notices",
    value: 24,
    icon: Bell,
    percentage: 82,
  },
  {
    name: "Publications",
    value: 32,
    icon: BookOpen,
    percentage: 91,
  },
  {
    name: "News",
    value: 18,
    icon: Newspaper,
    percentage: 68,
  },
  {
    name: "Facilities",
    value: 16,
    icon: Building2,
    percentage: 57,
  },
];

const recentActivities = [
  {
    title: "New notice published",
    description: "Admission related notice was added",
    time: "10 minutes ago",
    icon: Bell,
  },
  {
    title: "New publication added",
    description: "Research publication was uploaded",
    time: "1 hour ago",
    icon: BookOpen,
  },
  {
    title: "Student feedback received",
    description: "A new student feedback was submitted",
    time: "3 hours ago",
    icon: MessageSquare,
  },
  {
    title: "Newsletter subscriber",
    description: "A new user subscribed to newsletter",
    time: "5 hours ago",
    icon: Mail,
  },
];

const quickActions = [
  {
    title: "Add Notice",
    icon: Bell,
  },
  {
    title: "Add News",
    icon: Newspaper,
  },
  {
    title: "Add Publication",
    icon: BookOpen,
  },
  {
    title: "View Feedback",
    icon: MessageSquare,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen w-full bg-[#F7F9F8]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <LayoutDashboard
                size={20}
                className="text-[#008B45]"
              />

              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#008B45]">
                Admin Panel
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage and monitor your UAMC website from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:block">
              <p className="text-xs text-slate-400">
                Today
              </p>

              <p className="text-sm font-semibold text-slate-700">
                August 13, 2026
              </p>
            </div>

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#008B45]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#00743A]
              "
            >
              <Activity size={17} />
              Overview
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN STAT CARDS
        ====================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                {/* Decorative background */}

                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-[#008B45]/5
                    transition-transform
                    duration-300
                    group-hover:scale-150
                  "
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#E8F5EE]
                        text-[#008B45]
                      "
                    >
                      <Icon size={21} />
                    </div>

                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        rounded-full
                        bg-green-50
                        px-2.5
                        py-1
                        text-xs
                        font-semibold
                        text-green-600
                      "
                    >
                      <TrendingUp size={12} />
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex items-end justify-between">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </h2>

                    <ArrowUpRight
                      size={20}
                      className="
                        text-slate-300
                        transition
                        group-hover:text-[#008B45]
                      "
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* =====================================================
            MIDDLE SECTION
        ====================================================== */}

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_1fr]">
          {/* ===================================================
              CONTENT OVERVIEW
          ==================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Content Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Overview of your website content.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#008B45]">
                <FileText size={19} />
              </div>
            </div>

            <div className="mt-7 space-y-6">
              {contentOverview.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <Icon size={17} />
                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {item.name}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-[#008B45]
                          transition-all
                          duration-500
                        "
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================
              RECENT ACTIVITY
          ==================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest activity from your website.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#008B45]">
                <Activity size={19} />
              </div>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#E8F5EE]
                        text-[#008B45]
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-1 sm:flex-row">
                        <h3 className="text-sm font-semibold text-slate-800">
                          {activity.title}
                        </h3>

                        <span className="shrink-0 text-xs text-slate-400">
                          {activity.time}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quickly access frequently used sections.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-4
                    text-left
                    transition-all
                    duration-300
                    hover:border-[#008B45]/30
                    hover:bg-[#E8F5EE]
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-slate-600
                        shadow-sm
                        transition-colors
                        group-hover:text-[#008B45]
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      {action.title}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="
                      text-slate-400
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:text-[#008B45]
                    "
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            BOTTOM INFO
        ====================================================== */}

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Students
                </p>

                <p className="text-xl font-bold text-slate-800">
                  1,240
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Faculty Members
                </p>

                <p className="text-xl font-bold text-slate-800">
                  86
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <UserRound size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Alumni
                </p>

                <p className="text-xl font-bold text-slate-800">
                  3,540
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}