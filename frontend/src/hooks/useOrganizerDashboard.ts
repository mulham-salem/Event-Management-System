import { useQuery } from "@tanstack/react-query";

import {
  organizerDashboardApi,
  type DashboardStats,
  type RecentRegistration,
  type UpcomingEvent,
} from "../api/organizerDashboard";


const KEYS = {
  root: ["organizer-dashboard"] as const,
  stats: () => [...KEYS.root, "stats"] as const,
  recentRegistrations: () =>
    [...KEYS.root, "recent-registrations"] as const,
  upcomingEvents: () =>
    [...KEYS.root, "upcoming-events"] as const,
};

/**
 * Dashboard Stats
 */
export const useOrganizerStats = () => {
  return useQuery<DashboardStats>({
    queryKey: KEYS.stats(),
    queryFn: organizerDashboardApi.getOrganizerStats,
  });
};

/**
 * Recent Registrations
 */
export const useOrganizerRecentRegistrations = () => {
  return useQuery<RecentRegistration[]>({
    queryKey: KEYS.recentRegistrations(),
    queryFn: organizerDashboardApi.getRecentRegistrations,
  });
};

/**
 * Upcoming Events
 */
export const useOrganizerUpcomingEvents = () => {
  return useQuery<UpcomingEvent[]>({
    queryKey: KEYS.upcomingEvents(),
    queryFn: organizerDashboardApi.getUpcomingEvents,
  });
};
