import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registrationsApi,
  type GetRegistrationsParams,
  type Registration,
  type CreateRegistrationPayload,
  type UpdateRegistrationPayload,
} from "../api/registrations";

export const useRegistrations = (params?: GetRegistrationsParams) => {
  return useQuery<Registration[]>({
    queryKey: ["registrations", params],
    queryFn: () => registrationsApi.getRegistrations(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCreateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRegistrationPayload) =>
      registrationsApi.createRegistration(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registrations"],
      });
    },
  });
};

export const useUpdateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateRegistrationPayload;
    }) => registrationsApi.updateRegistration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registrations"],
      });
    },
  });
};

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => registrationsApi.deleteRegistration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registrations"],
      });
    },
  });
};
