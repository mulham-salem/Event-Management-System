import { authHandlers } from "./handlers/auth.handlers";
import { eventsHandlers } from "./handlers/events.handlers";
import { venuesHandlers } from "./handlers/venues.handlers";
import { hostsHandlers } from "./handlers/hosts.handlers";
import { clientDashboardHandlers } from "./handlers/clientDashboard.handlers";
import { bookingsHandlers } from "./handlers/bookings.handlers";
import { registrationsHandlers } from "./handlers/registrations.handlers";
import { ratingsHandlers } from "./handlers/ratings.handlers";
import { providerDashboardHandlers } from "./handlers/providerDashboard.handlers";
import { venuesManageHandlers } from "./handlers/venuesManage.handlers";
import { bookingsManageHandlers } from "./handlers/bookingsManage.handlers";

// ===== HANDLERS =====
export const handlers = [
    ...authHandlers,
    ...eventsHandlers,
    ...venuesHandlers,
    ...hostsHandlers,
    ...clientDashboardHandlers,
    ...bookingsHandlers,
    ...registrationsHandlers,
    ...ratingsHandlers,
    ...providerDashboardHandlers,
    ...venuesManageHandlers,
    ...bookingsManageHandlers,
];
