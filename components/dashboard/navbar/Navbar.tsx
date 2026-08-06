"use client";

import SearchBox from "./SearchBox";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenuButton from "./MobileMenuButton";
import Breadcrumb from "./Breadcrumb";

export default function Navbar() {
  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        z-30
        h-20
        border-b
        border-slate-200
        bg-white/80
        backdrop-blur-xl
        lg:left-72
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="flex min-w-0 items-center gap-4">
          <MobileMenuButton />

          <Breadcrumb />
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchBox />

          <NotificationButton />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}