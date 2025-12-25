import { random, randomDate, randomTime } from "../helpers/random";
import type { VenueItem, VenueDetails } from "../../api/venues";

// ===== VENUE LIST GENERATION =====
export const mockVenues: VenueItem[] = Array.from({length: 50}, (_, i) => ({
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
export const mockVenueDetails: Record<string, VenueDetails> = {};

mockVenues.forEach((v) => {
    mockVenueDetails[v.id] = {
        ...v,
        schedules: Array.from({length: 5}, (_, j) => ({
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