// src/hooks/useProviderDashboard.ts

import { useQuery } from "@tanstack/react-query";

import {
  providerDashboardApi,
  type ProviderStats,
  type RecentBooking,
  type ProviderVenue,
} from "../api/providerDashboard";

/* =========================
   Query Keys
========================= */

export const providerDashboardKeys = {
  all: ["provider-dashboard"] as const,

  stats: () => [...providerDashboardKeys.all, "stats"] as const,

  recentBookings: () =>
    [...providerDashboardKeys.all, "recent-bookings"] as const,

  venues: () => [...providerDashboardKeys.all, "venues"] as const,
};

/* =========================
   Hooks
========================= */

/**
 * Provider dashboard statistics
 * Used in <Stats />
 */
export const useProviderStats = () => {
  return useQuery<ProviderStats>({
    queryKey: providerDashboardKeys.stats(),
    queryFn: providerDashboardApi.getProviderStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Recent booking requests
 * Used in <RecentBookingsRequests />
 */
export const useRecentBookingRequests = () => {
  return useQuery<RecentBooking[]>({
    queryKey: providerDashboardKeys.recentBookings(),
    queryFn: providerDashboardApi.getRecentBookingRequests,
    staleTime: 1000 * 60, // 1 minute
  });
};

/**
 * Provider venues
 * Used in <YourVenues />
 */
export const useProviderVenues = () => {
  return useQuery<ProviderVenue[]>({
    queryKey: providerDashboardKeys.venues(),
    queryFn: providerDashboardApi.getProviderVenues,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
