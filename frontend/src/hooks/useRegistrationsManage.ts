import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { registrationsManageApi } from "../api/registrationsManage";

/* =======================
   Query Keys
======================= */

export const registrationsManageKeys = {
  all: ["organizer-registrations-manage"] as const,
};

/* =======================
   Queries
======================= */

export const useGetOrganizerRegistrations = () => {
  return useQuery({
    queryKey: registrationsManageKeys.all,
    queryFn: () => registrationsManageApi.getRegistrations(),
  });
};

/* =======================
   Mutations
======================= */

export const useAcceptRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => registrationsManageApi.acceptRegistration(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationsManageKeys.all,
      });
      queryClient.invalidateQueries({ queryKey: ["client-registrations"] });
    },
  });
};

export const useRejectRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => registrationsManageApi.rejectRegistration(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationsManageKeys.all,
      });
      queryClient.invalidateQueries({ queryKey: ["client-registrations"] });
    },
  });
};

export const useCancelRegistrationByProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => registrationsManageApi.canceledRegistration(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: registrationsManageKeys.all,
      });
      queryClient.invalidateQueries({ queryKey: ["client-registrations"] });
    },
  });
};
