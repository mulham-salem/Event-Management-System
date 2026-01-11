import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { bookingsManageApi } from "../api/bookingsManage";

/* =======================
   Query Keys
======================= */

export const bookingsManageKeys = {
  all: ["provider-bookings-manage"] as const,

  list: (query?: { search?: string; ordering?: string }) =>
    [...bookingsManageKeys.all, query] as const,
};

/* =======================
   Queries
======================= */

export const useGetProviderBookings = (query?: {
  search?: string;
  ordering?: string;
}) => {
  return useQuery({
    queryKey: bookingsManageKeys.list(query),
    queryFn: () => bookingsManageApi.getBookings(query),
  });
};

/* =======================
   Mutations
======================= */

export const useAcceptBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsManageApi.acceptBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookingsManageKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["client-bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizer-bookings"],
      });
    },
  });
};

export const useRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsManageApi.rejectBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookingsManageKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["client-bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizer-bookings"],
      });
    },
  });
};

export const useCancelBookingByProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsManageApi.canceledBooking(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookingsManageKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["client-bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizer-bookings"],
      });
    },
  });
};
