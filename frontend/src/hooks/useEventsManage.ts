import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  eventsManageApi,
  type Event,
  type FetchEventsParams,
  type CreateEventPayload,
  type UpdateEventPayload,
} from "../api/eventsManage";

import type { Booking } from "../api/bookings";

/* =======================
   Query Keys
======================= */

const EVENTS_KEYS = {
  all: ["organizer-events-manage"] as const,
  list: (filters: FetchEventsParams) =>
    ["organizer-events-manage", filters] as const,
  archived: (filters: FetchEventsParams) =>
    ["archived-events", filters] as const,
  bookings: (filters: FetchEventsParams) =>
    ["organizer-bookings", filters] as const,
};

/* =======================
   Queries
======================= */

export const useEventsQuery = (filters: FetchEventsParams) => {
  return useQuery<Event[]>({
    queryKey: EVENTS_KEYS.list(filters),
    queryFn: () => eventsManageApi.getEvents(filters),
  });
};

export const useEventsArchiveQuery = (filters: FetchEventsParams) => {
  return useQuery<Event[]>({
    queryKey: EVENTS_KEYS.archived(filters),
    queryFn: () => eventsManageApi.getArchivedEvents(filters),
  });
};

export const useMyBookingsQuery = (filters: FetchEventsParams) => {
  return useQuery<Booking[]>({
    queryKey: EVENTS_KEYS.bookings(filters),
    queryFn: () => eventsManageApi.getMyBookings(filters),
  });
};

/* =======================
   Mutations
======================= */

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) =>
      eventsManageApi.createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["client-events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEventPayload) =>
      eventsManageApi.updateEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["client-events"] });
    },
  });
};

export const useArchiveEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsManageApi.archiveEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["archived-events"] });
    },
  });
};

export const useUnArchiveEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsManageApi.unArchiveEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["archived-events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsManageApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["client-events"] });
    },
  });
};
