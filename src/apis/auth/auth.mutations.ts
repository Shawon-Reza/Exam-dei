"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./auth.api";


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register
  })
}

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
  });
};

export const useResendVerificationOtp = () => {
  return useMutation({
    mutationFn: authApi.resendVerificationOtp,
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: authApi.requestPasswordReset,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => queryClient.setQueryData(["auth", "me"], null),
  })
}