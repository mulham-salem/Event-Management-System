import { v4 as uuid } from "uuid";
import { random, randomDate, randomTime } from "../helpers/random.helpers";
import type { Event, Registration } from "../../api/registrations";

export const statuses = ["pending", "approved", "rejected", "canceled"];

// Mock Registrations
export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Tech Conference",
    description: "Annual technology conference",
    date: randomDate(),
    start_time: randomTime(),
    end_time: randomTime(),
    is_registered: true,
  },
  {
    id: "e2",
    title: "Music Festival",
    description: "Live music festival",
    date: randomDate(),
    start_time: randomTime(),
    end_time: randomTime(),
    is_registered: true,
  },
  {
    id: "e3",
    title: "Startup Meetup",
    description: "Networking for startups",
    date: randomDate(),
    start_time: randomTime(),
    end_time: randomTime(),
    is_registered: true,
  },
];

export const eventsId = ["e1", "e2", "e3"];

export const registrations: Registration[] = Array.from({ length: 6 }).map(() => {
  const selectedEvent = random(mockEvents);
  return {
    id: uuid(),
    event: selectedEvent.id, 
    event_data: selectedEvent, 
    status: random(statuses),
    created_at: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7
    ).toISOString(),
  };
});
