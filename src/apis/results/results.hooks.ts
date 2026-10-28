import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resultsApi, type SubmitResultPayload } from "./results.api";

export const useSubmitResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resultsApi.submitResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
};