import type { Host } from "../../api/hosts";

// Mock hosts
export const allHosts: Host[] = Array.from({length: 50}).map((_, i) => ({
    id: i + 1,
    full_name: `Host ${i + 1}`,
    email: `host${i + 1}@example.com`,
    role: i % 2 == 0 ? "organizer" : "provider",
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    votes_score: Math.floor(Math.random() * 100),
    votes_count: Math.floor(Math.random() * 50),
}));
