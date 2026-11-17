import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { testsApi, type CreateTestPayload, type CreateTestResponse } from "./test.api"


export const useTests = (topicId?: string, search = "") => {
    return useQuery({
        queryKey: ["tests", topicId ?? "all", search],
        queryFn: () => {
            if (topicId) {
                return testsApi.getAllTestByTopic(topicId)
            }

            const params = new URLSearchParams()
            if (search) {
                params.set("search", search)
            }

            return testsApi.getTest(params.toString())
        },
        retry: 1,
    })
}

export const useTestsBySubject = (subjectId: string) => {
    return useQuery({
        queryKey: ["tests", "subject", subjectId],
        queryFn: () => testsApi.getAllTestBySubject(subjectId),
        enabled: Boolean(subjectId),
    })
}


export const useTestsByQuery = (params: string, enabled = true) => {
    return useQuery({
        queryKey: ["tests", params],
        queryFn: () => testsApi.getTest(params),
        enabled,
    })
}


export const useCreateTest = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateTestResponse, Error, CreateTestPayload>({
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