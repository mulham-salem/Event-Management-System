import { useQuery } from "@tanstack/react-query";
import { clientDashboardApi, type DashboardStatsResponse, type RecentActivityItem } from "../api/clientDashboard";

export const useDashboardStats = () => {
  return useQuery<DashboardStatsResponse>({
    queryKey: ["client-dashboard", "stats"],
    queryFn: clientDashboardApi.getStats,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useRecentActivity = () => {
  return useQuery<RecentActivityItem[]>({
    queryKey: ["client-dashboard", "recent-activity"],
    queryFn: clientDashboardApi.getRecentActivity,
    staleTime: 1000 * 60 * 2, 
  });
};