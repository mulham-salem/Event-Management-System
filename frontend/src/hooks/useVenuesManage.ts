import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  venueManageApi,
  type Venue,
  type CreateVenuePayload,
  type UpdateVenuePayload,
} from "../api/venuesManage";

/* =======================
   Queries
======================= */

/* -------- GET VENUES -------- */
export const useVenuesQuery = (query?: {
  search?: string;
  ordering?: string;
}) => {
  return useQuery<Venue[]>({
    queryKey: ["venues", query],
    queryFn: () => venueManageApi.getVenues(query),
    staleTime: 1000 * 60,
  });
};

export const useVenuesArchiveQuery = (query?: {
  search?: string;
  ordering?: string;
}) => {
  return useQuery<Venue[]>({
    queryKey: ["archived-venues", query],
    queryFn: () => venueManageApi.getArchivedVenues(query),
    staleTime: 1000 * 60,
  });
};

/* =======================
   Mutations
======================= */

/* -------- CREATE VENUE -------- */
export const useCreateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVenuePayload) =>
      venueManageApi.createVenue(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};

/* -------- UPDATE VENUE -------- */
export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVenuePayload) =>
      venueManageApi.updateVenue(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};

/* -------- ARCHIVE VENUE -------- */
export const useArchiveVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venueManageApi.archiveVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({ queryKey: ["archived-venues"] });
    },
  });
};

export const useUnArchiveVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venueManageApi.unArchiveVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      queryClient.invalidateQueries({ queryKey: ["archived-venues"] });
    },
  });
};

/* -------- DELETE VENUE -------- */
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venueManageApi.deleteVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
};
