import { authHandlers } from "./handlers/auth.handlers";
import { eventsHandlers } from "./handlers/events.handlers";
import { venuesHandlers } from "./handlers/venues.handlers";
import { hostsHandlers } from "./handlers/hosts.handlers";
import { clientDashboardHandlers } from "./handlers/clientDashboard.handlers";
import { bookingsHandlers } from "./handlers/bookings.handlers";
import { registrationsHandlers } from "./handlers/registrations.handlers";

// ===== HANDLERS =====
export const handlers = [
    ...authHandlers,
    ...eventsHandlers,
    ...venuesHandlers,
    ...hostsHandlers,
    ...clientDashboardHandlers,
    ...bookingsHandlers,
    ...registrationsHandlers,
];
