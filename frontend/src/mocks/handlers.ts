import { http, HttpResponse } from "msw";
import { ENV } from "../config/env";
import type { EventDetails } from "../api/events";
import type { EventsResponse } from "../api/events";
import type { VenueItem } from "../api/venues.ts";
import type { VenueDetails } from "../api/venues.ts";
import type { Host } from "../api/hosts.ts";
import { v4 as uuid } from "uuid";
import type {
  CreateBookingPayload,
  UpdateBookingPayload,
  Venue,
} from "../api/bookings";
import type {
  CreateRegistrationPayload,
  UpdateRegistrationPayload,
  Event,
} from "../api/registrations";

// ===== RANDOM HELPERS =====
const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const randomDate = () => {
  const start = new Date(2025, 0, 1).getTime();
  const end = new Date(2025, 11, 30).getTime();
  return new Date(start + Math.random() * (end - start))
    .toISOString()
    .split("T")[0];
};

const randomTime = () => {
  const h = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const m = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];
  return `${h}:${m}`;
};

// ===== EVENT LIST GENERATION =====
const mockEvents: EventsResponse = {
  results: Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    title: random([
      "Cultural Dance Show",
      "Art Exhibition",
      "Traditional Food Festival",
      "Music Night",
      "Historical Workshop",
      "Crafts Training",
      "Heritage Lecture",
      "Local Market Day",
      "Photography Walk",
      "Folk Storytelling",
    ]),
    description: random([
      "A vibrant celebration of culture.",
      "Join us for an immersive experience.",
      "An event showcasing local talent.",
      "Discover the roots of our heritage.",
      "A hands-on experience for all ages.",
    ]),
    date: randomDate(),
    start_time: randomTime(),
    end_time: randomTime(),
    organizer: {
      id: i + 1,
      email: "",
      full_name: "",
      phone: "",
    },
  })),
  total: 50,
  page: 1,
  page_size: 12,
};

// ===== EVENT DETAILS GENERATOR =====
const mockEventDetails: Record<string, EventDetails> = {};

Array.from({ length: 50 }, (_, idx) => {
  const id = String(idx + 1);

  mockEventDetails[id] = {
    id,
    created_at: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    organizer: {
      id: idx + 1,
      email: `organizer${idx + 1}@mail.com`,
      full_name:
        random([
          "Cultural Org",
          "Art House",
          "Folk Heritage Team",
          "Community Center",
          "Local Arts Group",
          "Traditions Hub",
        ]) + ` #${idx + 1}`,
    },
    venue: {
      id: `v${idx + 1}`,
      name:
        random([
          "Main Cultural Hall",
          "Art Complex",
          "Community Theater",
          "Outdoor Heritage Park",
          "Historic Exhibition Hall",
        ]) + ` #${idx + 1}`,
      location_geo: `${35 + Math.random()},${139 + Math.random()}`,
      capacity: Math.floor(Math.random() * 300) + 50,
      images: [
        {
          id: `img-${id}-1`,
          image_url: `/venue_images/${id}_cover.jpg`,
          alt_text: "venue cover",
          is_cover: true,
        },
        {
          id: `img-${id}-2`,
          image_url: `/venue_images/${id}_extra.jpg`,
          alt_text: "extra view",
          is_cover: false,
        },
        {
          id: `img-${id}-3`,
          image_url: `/venue_images/${id}_extra.jpg`,
          alt_text: "extra view",
          is_cover: false,
        },
        {
          id: `img-${id}-4`,
          image_url: `/venue_images/${id}_extra.jpg`,
          alt_text: "extra view",
          is_cover: false,
        },
      ],
    },
  };
});

// ===== VENUE LIST GENERATION =====
const mockVenues: VenueItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: `v${i + 1}`,
  name:
    random([
      "Main Hall",
      "Art Complex",
      "Community Theater",
      "Outdoor Park",
      "Historic Venue",
    ]) + ` #${i + 1}`,
  description: random([
    "Spacious and modern venue.",
    "Perfect for cultural events.",
    "Historic charm with modern facilities.",
  ]),
  location_geo: `${35 + Math.random()},${139 + Math.random()}`,
  capacity: Math.floor(Math.random() * 300) + 50,
  price_per_hour: `${Math.floor(Math.random() * 200) + 50}`,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  provider: {
    id: i + 1,
    email: `provider${i + 1}@mail.com`,
    full_name: random([
      "Cultural Org",
      "Art House",
      "Community Center",
      "Local Arts Group",
    ]),
  },
  images: [
    {
      id: `img-${i}-1`,
      image_url: `/venue_images/${i + 1}_cover.jpg`,
      alt_text: "cover",
      is_cover: true,
    },
    {
      id: `img-${i}-2`,
      image_url: `/venue_images/${i + 1}_extra.jpg`,
      alt_text: "extra",
      is_cover: false,
    },
  ],
}));

// ===== VENUE DETAILS GENERATOR =====
const mockVenueDetails: Record<string, VenueDetails> = {};

mockVenues.forEach((v) => {
  mockVenueDetails[v.id] = {
    ...v,
    schedules: Array.from({ length: 5 }, (_, j) => ({
      id: `s${v.id}-${j + 1}`,
      venue: v.id,
      date: randomDate(),
      start_time: randomTime(),
      end_time: randomTime(),
      is_blocked: Math.random() > 0.5,
      created_at: new Date().toISOString(),
    })),
  };
});

// Mock user (current logged-in user)
const mockMe = {
  full_name: "Mulham Al-Hakim",
  role: "client",
  email: "mulham@example.com",
  phone: "+963999888777",
  profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=mulham",
};

// Mock hosts
const allHosts: Host[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  full_name: `Host ${i + 1}`,
  email: `host${i + 1}@example.com`,
  role: i % 2 == 0 ? "organizer" : "provider",
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  votes_score: Math.floor(Math.random() * 100),
  votes_count: Math.floor(Math.random() * 50),
}));

// Mock recent activity dashboard
const recentActivity = [
  {
    id: 1,
    type: "booking",
    title: "New booking created",
    description: "Wedding Event at Royal Hall",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "registration",
    title: "New registration",
    description: "John Doe registered for Tech Conference",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "venue_rating",
    title: "Venue rated",
    description: "Royal Hall received a 5-star rating",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "event_rating",
    title: "Event rated",
    description: "Tech Conference rated by attendee",
    time: "2 days ago",
  },
];

// Mock bookings
const statuses = ["pending", "confirmed", "cancelled", "completed"];

const venues: Venue[] = [
  {
    id: "venue-1",
    name: "Main Conference Hall",
    description: "Large indoor venue for conferences",
  },
  {
    id: "venue-2",
    name: "Open Air Arena",
    description: "Outdoor venue for concerts and festivals",
  },
  {
    id: "venue-3",
    name: "Meeting Room A",
    description: "Small private room for workshops",
  },
  {
    id: "venue-4",
    name: "Design Workshop",
    description: "Community gathering",
  },
  {
    id: "venue-5",
    name: "Business Forum",
    description: "Annual professional event",
  },
];

let bookings = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  venue: random(venues),
  date: randomDate(),
  start_time: randomTime(),
  end_time: randomTime(),
  notes: Math.random() > 0.5 ? "Special requirements" : "",
  status: random(statuses),
  created_at: new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7
  ).toISOString(),
}));

const bookingApplySearchAndOrdering = (
  data: typeof bookings,
  search?: string,
  ordering?: string
) => {
  let result = [...data];

  if (search) {
    result = result.filter(
      (b) =>
        b.venue.name.toLowerCase().includes(search.toLowerCase()) ||
        b.venue.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (ordering) {
    const isDesc = ordering.startsWith("-");
    const field = isDesc ? ordering.slice(1) : ordering;

    result.sort((a: any, b: any) => {
      if (a[field] < b[field]) return isDesc ? 1 : -1;
      if (a[field] > b[field]) return isDesc ? -1 : 1;
      return 0;
    });
  }

  return result;
};

// Mock Registerations
const events: Event[] = [
  {
    id: "event-1",
    name: "Tech Conference",
    description: "Annual technology conference",
  },
  {
    id: "event-2",
    name: "Music Festival",
    description: "Live music festival",
  },
  {
    id: "event-3",
    name: "Startup Meetup",
    description: "Networking for startups",
  },
];

/* ================= Registrations ================= */

let registrations = Array.from({ length: 10 }).map(() => ({
  id: uuid(),
  event: random(events),
  date: randomDate(),
  start_time: randomTime(),
  end_time: randomTime(),
  notes: Math.random() > 0.5 ? "Looking forward to this event" : "",
  status: random(statuses),
  created_at: new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7
  ).toISOString(),
}));

/* ================= Utils ================= */

const RegisterationApplySearchAndOrdering = (
  data: typeof registrations,
  search?: string,
  ordering?: string
) => {
  let result = [...data];

  if (search) {
    result = result.filter(
      (r) =>
        r.event.title.toLowerCase().includes(search.toLowerCase()) ||
        r.event.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (ordering) {
    const isDesc = ordering.startsWith("-");
    const field = isDesc ? ordering.slice(1) : ordering;

    result.sort((a: any, b: any) => {
      if (a[field] < b[field]) return isDesc ? 1 : -1;
      if (a[field] > b[field]) return isDesc ? -1 : 1;
      return 0;
    });
  }

  return result;
};

// ===== HANDLERS =====
export const handlers = [
  // Login Handler
  http.post(`${ENV.API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    // Fake validation
    if (body.email === "test@example.com" && body.password === "123456") {
      return HttpResponse.json({
        access: "fake-access-token-123",
        role: "client",
      });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // Register Handler
  http.post(`${ENV.API_BASE_URL}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as {
      full_name: string;
      email: string;
      password: string;
      phone: string;
      role: string;
    };

    // Always success for testing
    return HttpResponse.json({
      access: "registered-token-456",
      role: body.role,
    });
  }),

  // Me Handler
  http.get(`${ENV.API_BASE_URL}/auth/me`, ({ request }) => {
    const authHeader = request.headers.get("authorization");

    // ⛔️ simulate unauthorized
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return HttpResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    // ✅ authenticated
    return HttpResponse.json(mockMe, { status: 200 });
  }),

  // Events with Filters Handler
  http.get(`${ENV.API_BASE_URL}/events/public`, ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const min_date = url.searchParams.get("min_date");
    const max_date = url.searchParams.get("max_date");
    const ordering = url.searchParams.get("ordering");
    const page = Number(url.searchParams.get("page") || 1);
    const page_size = Number(url.searchParams.get("page_size") || 12);

    const organizerId = url.searchParams.get("organizer");

    let filtered = [...mockEvents.results];

    // search
    if (search) {
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(search) ||
          e.description.toLowerCase().includes(search)
      );
    }

    // min_date
    if (min_date) {
      filtered = filtered.filter((e) => e.date >= min_date);
    }

    // max_date
    if (max_date) {
      filtered = filtered.filter((e) => e.date <= max_date);
    }

    // organizer
    if (organizerId) {
      const idNum = Number(organizerId);
      filtered = filtered.filter((e) => e.organizer.id === idNum);
    }

    // ordering
    if (ordering === "date")
      filtered.sort((a, b) => (a.date > b.date ? 1 : -1));
    else if (ordering === "-date")
      filtered.sort((a, b) => (a.date < b.date ? 1 : -1));

    const start = (page - 1) * page_size;
    const paginated = filtered.slice(start, start + page_size);

    return HttpResponse.json({
      results: paginated,
      total: filtered.length,
      page,
      page_size,
    });
  }),

  // Specific Event Handler
  http.get(`${ENV.API_BASE_URL}/events/public/:id`, ({ params }) => {
    const id = params.id as string;

    if (!mockEventDetails[id]) {
      return HttpResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(mockEventDetails[id], { status: 200 });
  }),

  // Venues with Filters Handler
  http.get(`${ENV.API_BASE_URL}/venues/public`, async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const min_capacity = Number(url.searchParams.get("min_capacity") || 0);
    const max_capacity = Number(
      url.searchParams.get("max_capacity") || Infinity
    );
    const min_price = Number(url.searchParams.get("min_price") || 0);
    const max_price = Number(url.searchParams.get("max_price") || Infinity);
    const ordering = url.searchParams.get("ordering");
    const page = Number(url.searchParams.get("page") || 1);
    const page_size = Number(url.searchParams.get("page_size") || 12);

    const providerId = url.searchParams.get("provider");

    let filtered = [...mockVenues];

    // Filters
    if (search) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(search) ||
          v.description.toLowerCase().includes(search)
      );
    }
    filtered = filtered.filter(
      (v) =>
        v.capacity >= min_capacity &&
        v.capacity <= max_capacity &&
        Number(v.price_per_hour) >= min_price &&
        Number(v.price_per_hour) <= max_price
    );

    // provider
    if (providerId) {
      const idNum = Number(providerId);
      filtered = filtered.filter((e) => e.provider.id === idNum);
    }

    // Ordering
    if (ordering === "capacity")
      filtered.sort((a, b) => a.capacity - b.capacity);
    else if (ordering === "-capacity")
      filtered.sort((a, b) => b.capacity - a.capacity);
    else if (ordering === "price_per_hour")
      filtered.sort(
        (a, b) => Number(a.price_per_hour) - Number(b.price_per_hour)
      );
    else if (ordering === "-price_per_hour")
      filtered.sort(
        (a, b) => Number(b.price_per_hour) - Number(a.price_per_hour)
      );

    const start = (page - 1) * page_size;
    const paginated = filtered.slice(start, start + page_size);

    return HttpResponse.json({
      results: paginated,
      total: filtered.length,
      page,
      page_size,
    });
  }),

  // Specific Venue Handler
  http.get(`${ENV.API_BASE_URL}/venues/public/:id`, async ({ params }) => {
    const id = params.id as string;
    const venue = mockVenueDetails[id];
    if (!venue)
      return HttpResponse.json({ detail: "Not found" }, { status: 404 });
    return HttpResponse.json(venue);
  }),

  // Organizers Handler
  http.get(`${ENV.API_BASE_URL}/auth/organizers`, async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const minScore = Number(url.searchParams.get("min_score"));
    const minVotes = Number(url.searchParams.get("min_votes"));
    const ordering = url.searchParams.get("ordering");
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("page_size") || 10);

    let filtered = allHosts.filter((h) => h.role === "organizer");

    // 🔍 Search
    if (search) {
      filtered = filtered.filter(
        (h) =>
          h.full_name.toLowerCase().includes(search.toLowerCase()) ||
          h.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ⭐ Min score
    if (!isNaN(minScore)) {
      filtered = filtered.filter((h) => h.votes_score >= minScore);
    }

    // 🗳 Min votes
    if (!isNaN(minVotes)) {
      filtered = filtered.filter((h) => h.votes_count >= minVotes);
    }

    // 🔃 Ordering
    if (ordering === "-votes_score") {
      filtered.sort((a, b) => b.votes_score - a.votes_score);
    }

    if (ordering === "-votes_count") {
      filtered.sort((a, b) => b.votes_count - a.votes_count);
    }

    if (ordering === "-created_at") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // 📄 Pagination
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const results = filtered.slice(start, start + pageSize);

    return HttpResponse.json({
      total,
      page,
      page_size: pageSize,
      results,
    });
  }),

  // Providers Handler
  http.get(`${ENV.API_BASE_URL}/auth/providers`, async ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const minScore = Number(url.searchParams.get("min_score"));
    const minVotes = Number(url.searchParams.get("min_votes"));
    const ordering = url.searchParams.get("ordering");
    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("page_size") || 10);

    let filtered = allHosts.filter((h) => h.role === "provider");

    // 🔍 Search
    if (search) {
      filtered = filtered.filter(
        (h) =>
          h.full_name.toLowerCase().includes(search.toLowerCase()) ||
          h.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ⭐ Min score
    if (!isNaN(minScore)) {
      filtered = filtered.filter((h) => h.votes_score >= minScore);
    }

    // 🗳 Min votes
    if (!isNaN(minVotes)) {
      filtered = filtered.filter((h) => h.votes_count >= minVotes);
    }

    // 🔃 Ordering
    if (ordering === "-votes_score") {
      filtered.sort((a, b) => b.votes_score - a.votes_score);
    }

    if (ordering === "-votes_count") {
      filtered.sort((a, b) => b.votes_count - a.votes_count);
    }

    if (ordering === "-created_at") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // 📄 Pagination
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const results = filtered.slice(start, start + pageSize);

    return HttpResponse.json({
      total,
      page,
      page_size: pageSize,
      results,
    });
  }),

  // Votes Handler
  http.post(`${ENV.API_BASE_URL}/general/votes`, async ({ request }) => {
    const body = (await request.json()) as {
      target_user: number;
      value: 1 | -1;
    };

    const host = allHosts.find((h) => h.id === body.target_user);

    if (!host) {
      return HttpResponse.json({ message: "Host not found" }, { status: 404 });
    }

    // update mock stats
    host.votes_score += body.value;
    host.votes_count += 1;

    return HttpResponse.json({
      id: crypto.randomUUID(),
      target_user: body.target_user,
      value: body.value,
      created_at: new Date().toISOString(),
    });
  }),

  // Client Dashboard Stats Handler
  http.get(`${ENV.API_BASE_URL}/dashboard/stats`, async () => {
    return HttpResponse.json({
      totalBookings: 1248,
      registrations: 856,
      venueRatings: 342,
      eventRatings: 128,
      eventOrganizers: 24,
      venueProviders: 12,
    });
  }),

  // Client Dashboard Recent Activity Handler
  http.get(`${ENV.API_BASE_URL}/dashboard/recent-activity`, async () => {
    return HttpResponse.json(recentActivity);
  }),

  // Get Bookings Handler
  http.get(`${ENV.API_BASE_URL}/venues/bookings`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;
    const ordering = url.searchParams.get("ordering") || undefined;

    const result = bookingApplySearchAndOrdering(bookings, search, ordering);

    return HttpResponse.json(result);
  }),

  // Create Booking Handler
  http.post(`${ENV.API_BASE_URL}/venues/bookings`, async ({ request }) => {
    const body = (await request.json()) as CreateBookingPayload;

    const newBooking = {
      id: uuid(),
      venue: {
        id: body.venue,
        name: "Main Conference Hall",
        description: "Large indoor venue for conferences",
      },
      status: "pending",
      created_at: new Date().toISOString(),
      date: body.date,
      start_time: body.start_time,
      end_time: body.end_time,
      notes: body.notes || "",
    };

    bookings.unshift(newBooking);

    return HttpResponse.json(newBooking, { status: 201 });
  }),

  // Update Booking Handler
  http.put(
    `${ENV.API_BASE_URL}/venues/bookings/:id`,
    async ({ params, request }) => {
      const { id } = params as { id: string };
      const body = (await request.json()) as UpdateBookingPayload;

      const index = bookings.findIndex((b) => b.id === id);

      if (index === -1) {
        return HttpResponse.json(
          { message: "Booking not found" },
          { status: 404 }
        );
      }

      const updatedBooking = {
        ...bookings[index],
        ...body,
      };

      if (typeof body.venue === "string") {
        const venueObj = venues.find((v) => v.id === body.venue);

        if (!venueObj) {
          return HttpResponse.json(
            { message: "Venue not found" },
            { status: 400 }
          );
        }

        updatedBooking.venue = venueObj;
      }

      bookings[index] = updatedBooking;

      return HttpResponse.json(bookings[index]);
    }
  ),

  // Delete Booking Handler
  http.delete(`${ENV.API_BASE_URL}/venues/bookings/:id`, ({ params }) => {
    const { id } = params as { id: string };

    const exists = bookings.some((b) => b.id === id);

    if (!exists) {
      return HttpResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    bookings = bookings.filter((b) => b.id !== id);

    return HttpResponse.json(null, { status: 204 });
  }),

  // Get Registrations Handler
  http.get(`${ENV.API_BASE_URL}/events/registrations`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;
    const ordering = url.searchParams.get("ordering") || undefined;

    const result = RegisterationApplySearchAndOrdering(
      registrations,
      search,
      ordering
    );

    return HttpResponse.json(result);
  }),

  // Create Registration Handler
  http.post(`${ENV.API_BASE_URL}/events/registrations`, async ({ request }) => {
    const body = (await request.json()) as CreateRegistrationPayload;

    const eventObj = events.find((e) => e.id === body.event);

    if (!eventObj) {
      return HttpResponse.json({ message: "Event not found" }, { status: 400 });
    }

    const newRegistration = {
      id: uuid(),
      event: eventObj,
      status: "pending",
      created_at: new Date().toISOString(),
      date: body.date,
      start_time: body.start_time,
      end_time: body.end_time,
      notes: body.notes || "",
    };

    registrations.unshift(newRegistration);

    return HttpResponse.json(newRegistration, { status: 201 });
  }),

  // Update Registration Handler
  http.put(`${ENV.API_BASE_URL}/events/registrations/:id`,
    async ({ params, request }) => {
      const { id } = params as { id: string };
      const body = (await request.json()) as UpdateRegistrationPayload;

      const index = registrations.findIndex((r) => r.id === id);

      if (index === -1) {
        return HttpResponse.json(
          { message: "Registration not found" },
          { status: 404 }
        );
      }

      const updatedRegistration = {
        ...registrations[index],
        ...body,
      };

      if (typeof body.event === "string") {
        const eventObj = events.find((e) => e.id === body.event);

        if (!eventObj) {
          return HttpResponse.json(
            { message: "Event not found" },
            { status: 400 }
          );
        }

        updatedRegistration.event = eventObj;
      }

      registrations[index] = updatedRegistration;

      return HttpResponse.json(registrations[index]);
    }
  ),

  // Delete Registration Handler
  http.delete(`${ENV.API_BASE_URL}/events/registrations/:id`, ({ params }) => {
    const { id } = params as { id: string };

    const exists = registrations.some((r) => r.id === id);

    if (!exists) {
      return HttpResponse.json(
        { message: "Registration not found" },
        { status: 404 }
      );
    }

    registrations = registrations.filter((r) => r.id !== id);

    return HttpResponse.json(null, { status: 204 });
  }),
];
