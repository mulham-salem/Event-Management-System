import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    eventManageApi,
    type Event,
    type FetchEventsParams,
    type CreateEventPayload,
    type UpdateEventPayload
} from "../api/eventsManage";

import type { Booking } from "../api/bookings";


/* =======================
   Query Keys
======================= */

const EVENTS_KEYS = {
    all: ["manage-events"] as const,
    list: (filters: FetchEventsParams) => ["manage-events", filters] as const,
    archived: (filters: FetchEventsParams) =>
        ["archived-events", filters] as const,
    bookings: (filters: FetchEventsParams) => ["my-bookings", filters] as const,
};

/* =======================
   Queries
======================= */

export const useEventsQuery = (filters: FetchEventsParams) => {
    return useQuery<Event[]>({
        queryKey: EVENTS_KEYS.list(filters),
        queryFn: () => eventManageApi.getEvents(filters),
    });
};

export const useEventsArchiveQuery = (filters: FetchEventsParams) => {
    return useQuery<Event[]>({
        queryKey: EVENTS_KEYS.archived(filters),
        queryFn: () => eventManageApi.getArchivedEvents(filters),
    });
};

export const useMyBookingsQuery = (filters: FetchEventsParams) => {
    return useQuery<Booking[]>({
        queryKey: EVENTS_KEYS.bookings(filters),
        queryFn: () => eventManageApi.getMyBookings(filters),
    });
};

/* =======================
   Mutations
======================= */

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateEventPayload) =>
            eventManageApi.createEvent(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: EVENTS_KEYS.all});
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateEventPayload) =>
            eventManageApi.updateEvent(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: EVENTS_KEYS.all});
        },
    });
};

export const useArchiveEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => eventManageApi.archiveEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: EVENTS_KEYS.all});
            queryClient.invalidateQueries({queryKey: ["archived-events"]});
        },
    });
};

export const useUnArchiveEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => eventManageApi.unArchiveEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: EVENTS_KEYS.all});
            queryClient.invalidateQueries({queryKey: ["archived-events"]});
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => eventManageApi.deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: EVENTS_KEYS.all});
        },
    });
};
