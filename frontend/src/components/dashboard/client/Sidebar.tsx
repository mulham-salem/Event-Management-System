import React, { cloneElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMe, useLogout } from "../../../hooks/useAuth";
import {
  Home,
  Calendar,
  Users,
  Star,
  Heart,
  MoreVertical,
  LogOut,
  User,
  Building2,
  CalendarDays,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface SidebarDashboardProps {
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarDashboardProps> = ({ onSectionChange }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  let currentSection = location.pathname.split("/").pop();
  if (currentSection === "events") currentSection = "registrations";
  if (currentSection === "venues") currentSection = "bookings";

  const { data: me, isLoading } = useMe();

  const { logout } = useLogout();

  const mainMenuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5 text-violet-600" />,
      path: "/client/dashboard",
    },
  ];

  const managementItems = [
    {
      name: "bookings",
      label: "Venue Bookings",
      icon: <Calendar className="h-5 w-5 text-gray-500" />,
      path: "/client/bookings",
    },
    {
      name: "registrations",
      label: "Event Registrations",
      icon: <Users className="h-5 w-5 text-gray-500" />,
      path: "/client/registrations",
    },
    {
      name: "venuesRatings",
      label: "Venue Ratings",
      icon: <Star className="h-5 w-5 text-gray-500" />,
      path: "/client/venues",
    },
    {
      name: "eventsRatings",
      label: "Event Ratings",
      icon: <Heart className="h-5 w-5 text-gray-500" />,
      path: "/client/events",
    },   
    {
      name: "providers",
      label: "Venue Providers",
      icon: <Building2 className="h-5 w-5 text-gray-500" />,
      path: "/client/providers",
    },
    {
      name: "organizers",
      label: "Event Organizers",
      icon: <CalendarDays className="h-5 w-5 text-gray-500" />,
      path: "/client/organizers",
    },
  ];

  const sidebarStyle = `
    .sidebar-item:hover { 
      background: linear-gradient(90deg, #f3e8ff 0%, transparent 100%); 
    }
    .sidebar-item.active { 
      background: linear-gradient(90deg, #f3e8ff 0%, transparent 100%); 
      border-left: 3px solid #7c3aed; 
    }
    .sidebar-item.active svg {
      color: #7c3aed !important;
    }
  `;

  return (
    <>
      <style>{sidebarStyle}</style>
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="border-b border-gray-100 p-[16px]">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-nata-sans-eb text-2xl tracking-wide">
                <span className="text-[#5a2ea6]">List</span>
                <span className="bg-gradient-to-r from-[#5a2ea6] to-[#db2777] bg-clip-text text-transparent">
                  EMO
                </span>
              </div>
              <p className="font-nata-sans-md text-xs tracking-wide text-gray-400">
                Client Suite
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <div className="mb-3 px-3 font-nata-sans-md text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </div>

          {mainMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => onSectionChange(item.name)}
              className={`sidebar-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-gray-700 transition-all ${
                currentSection === item.name ? "active" : ""
              }`}
            >
              {cloneElement(item.icon, {
                className: `w-5 h-5 ${
                  currentSection === item.name
                    ? "text-violet-600"
                    : "text-gray-500"
                }`,
              })}
              <span className="font-nata-sans-md">{item.label}</span>
            </Link>
          ))}

          <div className="px-3 py-3 font-nata-sans-md text-xs font-semibold uppercase tracking-wider text-gray-400">
            Management
          </div>

          {managementItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => onSectionChange(item.name)}
              className={`sidebar-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-gray-700 transition-all ${
                currentSection === item.name ? "active" : ""
              }`}
            >
              {cloneElement(item.icon, {
                className: `w-5 h-5 ${
                  currentSection === item.name
                    ? "text-violet-600"
                    : "text-gray-500"
                }`,
              })}
              <span className="font-nata-sans-md">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="relative border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 p-2">
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 font-nata-sans-bd text-white">
              {me?.full_name
                ? me.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "UM"}
            </div>

            {/* User Info */}
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <>
                  <p className="truncate font-nata-sans-md text-sm text-gray-400">
                    username
                  </p>
                  <p className="font-nata-sans-rg text-xs text-gray-200">
                    role
                  </p>
                </>
              ) : (
                <>
                  <p className="truncate font-nata-sans-md text-sm text-gray-800">
                    {me?.full_name}
                  </p>
                  <p className="font-nata-sans-rg text-xs text-gray-400">
                    {me?.role}
                  </p>
                </>
              )}
            </div>

            {/* 3 dots menu */}
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Dropdown */}
          {openMenu && (
            <div className="absolute bottom-20 right-8 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setOpenMenu(false);
                  // navigate("/account") ← لو عندك صفحة حساب
                }}
              >
                <User className="h-4 w-4" />
                Account
              </button>

              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  setOpenMenu(false);
                  logout();
                  toast.success("Logout successfully");
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
