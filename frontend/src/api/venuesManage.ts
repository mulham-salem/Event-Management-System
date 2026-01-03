import axiosClient from "./axiosClient";
import type { AverageRating } from "./venues";

/* =======================
   Types
======================= */

export interface VenueLocation {
  location: string; // "lat,lng"
  area: string;
  city: string;
}

export type VenueStatus = "active" | "archived";

export interface Venue {
  id: string;
  name: string;
  description?: string;
  location_geo: VenueLocation;
  capacity: number;
  price_per_hour: number;
  status: VenueStatus;
  created_at: string;
  average_rating: AverageRating;
  last_time_archived?: string;
}

export interface CreateVenuePayload {
  name: string;
  description?: string;
  location_geo: VenueLocation;
  capacity: number;
  price_per_hour: number;
}

export interface UpdateVenuePayload {
  id: string;
  name?: string;
  description?: string;
  location_geo?: VenueLocation;
  capacity?: number;
  price_per_hour?: number;
}

/* =======================
   API
======================= */

export const venueManageApi = {
  /* -------- GET -------- */
  getVenues: async (query?: {
    search?: string;
    ordering?: string;
  }): Promise<Venue[]> => {
    const res = await axiosClient.get("/venues", {
      params: {
        ...(query?.search && { search: query.search }),
        ...(query?.ordering && { ordering: query.ordering }),
      },
    });
    return res.data;
  },

  /* -------- CREATE -------- */
  createVenue: async (payload: CreateVenuePayload): Promise<Venue> => {
    const res = await axiosClient.post("/venues/create", payload);
    return res.data;
  },

  /* -------- UPDATE -------- */
  updateVenue: async (payload: UpdateVenuePayload): Promise<Venue> => {
    const { id, ...data } = payload;
    const res = await axiosClient.put(`/venues/${id}`, data);
    return res.data;
  },

  /* -------- ARCHIVE -------- */
  getArchivedVenues: async (query?: { search?: string; ordering?: string; }): Promise<Venue[]> => {
    const res = await axiosClient.get("/venues/archived", {
      params: {
        ...(query?.search && { search: query.search }),
        ...(query?.ordering && { ordering: query.ordering }),
      },
    });
    return res.data;
  },
  
  archiveVenue: async (id: string): Promise<void> => {
    await axiosClient.post(`/venues/archive/${id}`);
  },

  unArchiveVenue: async (id: string): Promise<void> => {
    await axiosClient.post(`/venues/unarchive/${id}`);
  },

  /* -------- DELETE -------- */
  deleteVenue: async (id: string): Promise<void> => {
    await axiosClient.delete(`/venues/${id}`);
  },
};
