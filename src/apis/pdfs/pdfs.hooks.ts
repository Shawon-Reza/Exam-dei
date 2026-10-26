"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pdfsApi, type CreatePdfPayload } from "./pdfs.api";

export const pdfsQueryKey = ["pdfs"] as const;

export const usePdfs = (topicId: string) => {
  return useQuery({
    queryKey: [...pdfsQueryKey, topicId],
    queryFn: () => pdfsApi.getPdfs(topicId),
    enabled: Boolean(topicId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useCreatePdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePdfPayload) => pdfsApi.createPdf(payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...pdfsQueryKey, variables.topicId],
      });
      // Also invalidate topics so the _count.pdfs refreshes
      void queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};

export const useDeletePdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pdfId }: { pdfId: string; topicId: string }) =>
      pdfsApi.deletePdf(pdfId),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...pdfsQueryKey, variables.topicId],
      });
      // Also invalidate topics so the _count.pdfs refreshes
      void queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });
};
