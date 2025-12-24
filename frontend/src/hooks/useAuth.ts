import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi, type LoginPayload, type SignupPayload } from "../api/auth";
import { setToken, removeToken } from "../utils/authToken";
import { setRole, removeRole } from "../utils/authRole";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (data) => {
      if (data.access) {
        setToken(data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) setRole(data.role);
      navigate("/client/dashboard", { replace: true });
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupPayload) => authApi.signup(data),
    onSuccess: (data) => {
      if (data.access) {
        setToken(data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) setRole(data.role);;
      navigate("/client/dashboard", { replace: true });
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
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    removeRole();

    queryClient.removeQueries({ queryKey: ["me"] });

    navigate("/", { replace: true });
  };

  return { logout };
};
