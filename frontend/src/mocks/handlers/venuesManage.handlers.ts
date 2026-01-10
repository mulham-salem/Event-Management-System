import { http, HttpResponse } from "msw";
import { ENV } from "../../config/env";

import {
  filterVenues,
  createVenue,
  updateVenue,
  archiveVenue,
  unArchiveVenue,
  deleteVenue,
} from "../helpers/venuesManage.helpers";

import { archivedVenuesDB, venueManageDB } from "../data/venuesManage.mock";
import type { CreateVenuePayload, UpdateVenuePayload } from "../../api/venuesManage";

/* =======================
   Handlers
======================= */

export const venuesManageHandlers = [
  /* -------- GET -------- */
  http.get(`${ENV.API_BASE_URL}/venues/`, ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") ?? undefined;
    const ordering = url.searchParams.get("ordering") ?? undefined;

    const data = filterVenues(venueManageDB, search, ordering);

    return HttpResponse.json(data, { status: 200 });
  }),

  /* -------- GET -------- */
  http.get(`${ENV.API_BASE_URL}/venues/archived`, ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") ?? undefined;
    const ordering = url.searchParams.get("ordering") ?? undefined;

    const data = filterVenues(archivedVenuesDB, search, ordering);

    return HttpResponse.json(data, { status: 200 });
  }),

  /* -------- CREATE -------- */
  http.post(`${ENV.API_BASE_URL}/venues/create`, async ({ request }) => {
      const payload = await request.json();
      const venue = createVenue(payload as CreateVenuePayload);

      return HttpResponse.json(venue, { status: 201 });
    }
  ),

  /* -------- UPDATE -------- */
  http.put(`${ENV.API_BASE_URL}/venues/:id`, async ({ params, request }) => {
      const payload = await request.json();
      const venue = updateVenue(params.id as string, payload as UpdateVenuePayload);

      if (!venue) {
        return HttpResponse.json(
          { message: "Venue not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(venue, { status: 200 });
    }
  ),

  /* -------- ARCHIVE -------- */
  http.post(`${ENV.API_BASE_URL}/venues/archive/:id`, ({ params }) => {
      const ok = archiveVenue(params.id as string);

      if (!ok) {
        return HttpResponse.json(
          { message: "Venue not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(null, { status: 200 });
    }
  ),

  /* -------- UNARCHIVE -------- */
  http.post(`${ENV.API_BASE_URL}/venues/unarchive/:id`, ({ params }) => {
      const ok = unArchiveVenue(params.id as string);

      if (!ok) {
        return HttpResponse.json(
          { message: "Venue not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(null, { status: 200 });
    }
  ),

  /* -------- DELETE -------- */
  http.delete(`${ENV.API_BASE_URL}/venues/:id`, ({ params }) => {
      deleteVenue(params.id as string);
      return HttpResponse.json(null, { status: 204 });
    }
  ),
];