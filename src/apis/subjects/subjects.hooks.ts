"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subjectsApi } from "./subjects.api";

export const subjectsQueryKey = ["subjects", "list"] as const;

export const useSubjects = () => {
  return useQuery({
    queryKey: subjectsQueryKey,
    queryFn: () => subjectsApi.getSubjects(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subjectsApi.createSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subjectsQueryKey }),
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subjectsApi.updateSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subjectsQueryKey }),
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subjectsApi.deleteSubject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subjectsQueryKey }),
  });
};
