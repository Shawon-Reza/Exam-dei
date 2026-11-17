"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.api";

export const useUserProfile = () =>
  useQuery({
    queryKey: ["user", "profile"],
    queryFn: userApi.getUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
