import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { testsApi } from "./test.api"



export const useTests = (topicId: string) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["tests", topicId],
        queryFn: () => testsApi.getAllTestByTopic(topicId)
    })
}


export const useCreateTest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: testsApi.createTest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tests"] })
        }
    })
}

export const useDeleteTestByID = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: testsApi.deleteTestByID,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tests"] })
        }
    })
}

export const useUpdateTest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => testsApi.updateTest(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tests"] })
        }
    })
}