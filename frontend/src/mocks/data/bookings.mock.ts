import { v4 as uuid } from "uuid";
import { random, randomDate, randomTime } from "../helpers/random";
import type { Venue } from "../../api/bookings";

// Mock bookings
export const statuses = ["pending", "confirmed", "cancelled", "completed"];

export const venues: Venue[] = [
    {
        id: "v1",
        name: "Main Conference Hall",
        description: "Large indoor venue for conferences",
    },
    {
        id: "v2",
        name: "Open Air Arena",
        description: "Outdoor venue for concerts and festivals",
    },
    {
        id: "v3",
        name: "Meeting Room A",
        description: "Small private room for workshops",
    },
    {
        id: "v4",
        name: "Design Workshop",
        description: "Community gathering",
    },
    {
        id: "v5",
        name: "Business Forum",
        description: "Annual professional event",
    },
];

export const bookings = Array.from({length: 10}).map(() => ({
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
