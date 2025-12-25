import { http, HttpResponse } from "msw";
import { ENV } from "../../config/env";
import { mockMe } from "../data/users.mock";

export const authHandlers = [
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
];