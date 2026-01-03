import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload, type SignupPayload } from "../api/auth";
import { setToken, removeToken } from "../utils/authToken";
import { setRole, removeRole } from "../utils/authRole";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (data) => {
      if (data.access) {
        setToken(data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) setRole(data.role);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupPayload) => authApi.signup(data),
    onSuccess: (data) => {
      if (data.access) {
        setToken(data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) setRole(data.role);;
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    removeToken();
    removeRole();

    queryClient.removeQueries({ queryKey: ["me"] });
  };

  return { logout };
};
