import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  bookingsApi,
  type GetBookingsParams,
  type Booking,
  type CreateBookingPayload,
  type UpdateBookingPayload,
} from "../api/bookings";

export const useBookings = (params?: GetBookingsParams) => {
  return useQuery<Booking[]>({
    queryKey: ["bookings", params],
    queryFn: () => bookingsApi.getBookings(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      bookingsApi.createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingPayload }) =>
      bookingsApi.updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsApi.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};
