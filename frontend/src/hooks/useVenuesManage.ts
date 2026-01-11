import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  venuesManageApi,
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
    queryKey: ["provider-venues-manage", query],
    queryFn: () => venuesManageApi.getVenues(query),
    staleTime: 1000 * 60,
  });
};

export const useVenuesArchiveQuery = (query?: {
  search?: string;
  ordering?: string;
}) => {
  return useQuery<Venue[]>({
    queryKey: ["archived-venues", query],
    queryFn: () => venuesManageApi.getArchivedVenues(query),
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
      venuesManageApi.createVenue(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-venues-manage"] });
      queryClient.invalidateQueries({ queryKey: ["client-venues"] });
    },
  });
};

/* -------- UPDATE VENUE -------- */
export const useUpdateVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVenuePayload) =>
      venuesManageApi.updateVenue(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-venues-manage"] });
      queryClient.invalidateQueries({ queryKey: ["client-venues"] });
    },
  });
};

/* -------- ARCHIVE VENUE -------- */
export const useArchiveVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venuesManageApi.archiveVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-venues-manage"] });
      queryClient.invalidateQueries({ queryKey: ["archived-venues"] });
    },
  });
};

export const useUnArchiveVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venuesManageApi.unArchiveVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-venues-manage"] });
      queryClient.invalidateQueries({ queryKey: ["archived-venues"] });
    },
  });
};

/* -------- DELETE VENUE -------- */
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => venuesManageApi.deleteVenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider-venues-manage"] });
      queryClient.invalidateQueries({ queryKey: ["client-venues"] });
    },
  });
};
