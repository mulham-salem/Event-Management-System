import React from "react";
import { Search, Bell } from "lucide-react";

interface HeaderProps {
  pageTitle: string;
  pageSubtitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageSubtitle,
}) => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-8 py-[14px]">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <h2 className="font-nata-sans-bd text-2xl text-gray-800">
            {pageTitle}
          </h2>
          <p className="font-nata-sans-rg text-sm text-gray-500">
            {pageSubtitle}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-xl border border-gray-200 py-2 pl-10 pr-4
                         font-nata-sans-rg
                         focus:border-transparent focus:outline-none
                         focus:ring-2 focus:ring-violet-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative rounded-xl p-2 text-gray-500 transition hover:bg-gray-100">
            <Bell className="h-6 w-6" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
