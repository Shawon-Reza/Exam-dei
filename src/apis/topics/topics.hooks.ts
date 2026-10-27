"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { topicsApi } from "./topics.api";

export const topicsQueryKey = ["topics"] as const;

export const useTopics = (subjectId: string, search: string) => {
  return useQuery({
    queryKey: [...topicsQueryKey, subjectId, search],
    queryFn: () => topicsApi.getTopics(subjectId, search),
    enabled: Boolean(subjectId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topicsApi.createTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicsQueryKey }),
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topicsApi.updateTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicsQueryKey }),
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: topicsApi.deleteTopic,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: topicsQueryKey }),
  });
};

export const useTopicDeepDetails = (topicID: string) => {
  return useQuery({
    queryKey: ["topic_deep_details", topicID],
    queryFn: () => topicsApi.topic_deep_details(topicID),
    enabled: Boolean(topicID),
  });
};