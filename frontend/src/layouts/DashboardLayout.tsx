import React, {useRef, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";

// Components
import {Sidebar} from "../components/dashboard/client/Sidebar";
import {Header} from "../components/dashboard/client/Header";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export type LayoutContextType = {
    scrollableNodeRef: React.RefObject<HTMLDivElement | null>;
};

export const DashboardLayout: React.FC = () => {
    const [currentSection, setCurrentSection] = useState("dashboard");
    const location = useLocation();
    let current = location.pathname.split("/").pop()!;

    if (current === "events") current = "registrations";
    if (current === "venues") current = "bookings";

    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);

    const titles: Record<string, { title: string; subtitle: string }> = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Welcome back! Here's your overview.",
        },
        bookings: {
            title: "Venue Bookings",
            subtitle: "Manage all your event bookings in one place.",
        },
        registrations: {
            title: "Registrations",
            subtitle: "Track and manage event registrations.",
        },
        venuesRatings: {
            title: "Venue Ratings",
            subtitle: "View and manage venue ratings and reviews.",
        },
        eventsRatings: {
            title: "Event Ratings",
            subtitle: "Monitor event feedback and ratings.",
        },
        providers: {
            title: "venue providers",
            subtitle: "View People who list and manage venues.",
        },
        organizers: {
            title: "event organizers",
            subtitle: "View People who responsible for events organization.",
        },
    };

    return (
        <div className="flex h-screen bg-gray-50 font-nata-sans-rg">
            {/* Sidebar */}
            <Sidebar
                onSectionChange={setCurrentSection}
            />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <Header
                    pageTitle={titles[current].title}
                    pageSubtitle={titles[current].subtitle}
                />

                <SimpleBar
                    scrollableNodeProps={{ ref: scrollableNodeRef }}
                    style={{ maxHeight: "90vh" }}
                    className="custom-scrollbar"
                >

                    {/* Page Content */}
                    <main className="flex-1 p-4">
                        <Outlet context={{ scrollableNodeRef } satisfies LayoutContextType} />
                    </main>

                </SimpleBar>
            </div>
        </div>
    );
};
