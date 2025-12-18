import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi, type LoginPayload, type SignupPayload } from "../api/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => authApi.login(data),
    onSuccess: (data) => {
      if (data.access) {
        localStorage.setItem("authToken", data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) localStorage.setItem("currentRole", data.role);
      navigate("/dashboard");
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
        localStorage.setItem("authToken", data.access);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
      if (data.role) localStorage.setItem("currentRole", data.role);
      navigate("/dashboard");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    staleTime: 1000 * 60 * 5, // 5 دقائق
    retry: false, // لو فشل ما يعيد
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    // 1️⃣ حذف التوكن
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentRole");

    // 2️⃣ مسح كل كاش اليوزر
    queryClient.removeQueries({ queryKey: ["me"] });

    // 3️⃣ إعادة توجيه
    navigate("/", { replace: true });
  };

  return { logout };
};
