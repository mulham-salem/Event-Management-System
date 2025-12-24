import axiosClient from "./axiosClient";

export type EventRegistrationStatus  = "pending" | "confirmed" | "cancelled" | "completed";

export interface Event {
    id: string;
    name: string;
    description: string;
}

export interface Registration {
    id: string;
    event: Event,
    date: string; // ISO date
    start_time: string; // HH:mm
    end_time: string; // HH:mm
    notes?: string;
    status: EventRegistrationStatus;
    created_at: string; // ISO datetime
}

export interface GetRegistrationsParams {
    search?: string; // search keyword
    ordering?: string; // e.g. "date", "-created_at"
}

export interface CreateRegistrationPayload {
    event: string; // event id
    date: string;
    start_time: string;
    end_time: string;
    notes?: string;
}

export type UpdateRegistrationPayload = Partial<CreateRegistrationPayload>;

export const registrationsApi = {
    getRegistrations: async (params?: GetRegistrationsParams): Promise<Registration[]> => {
        const res = await axiosClient.get("/events/registrations", { params });
        return res.data;
    },

    createRegistration: async (payload: CreateRegistrationPayload): Promise<Registration> => {
        const res = await axiosClient.post("/events/registrations", payload);
        return res.data;
    },

    updateRegistration: async (id: string, payload: UpdateRegistrationPayload): Promise<Registration> => {
        const res = await axiosClient.put(`/events/registrations/${id}`, payload);
        return res.data;
    },

    deleteRegistration: async (id: string): Promise<void> => {
        await axiosClient.delete(`/events/registrations/${id}`);
    },
};
