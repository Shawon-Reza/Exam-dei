import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { questionsApi } from "./questions.api";
import { topicsQueryKey } from "../topics/topics.hooks";


export const useAddQuestionToTopic = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: questionsApi.addQuestionToTopic,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: topicsQueryKey })
        }
    })
}



export const useGetTopicQuestions = (
    params: string,
    enabled = true
) => {
    return useQuery({
        queryKey: ["questions", "topic", params],
        queryFn: () => questionsApi.getQuestionsByTopic(params),
        enabled: enabled && Boolean(params),
    });
};

export const useGetTestQuestions = (testId: string, enabled = true) => {
    return useQuery({
        queryKey: ["questions", "test", testId],
        queryFn: () => questionsApi.getTestQuestions(testId),
        enabled: enabled && Boolean(testId),
    });
};

export const useDeleteQuestion = (testId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: questionsApi.deleteQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions", "test", testId] });
        },
    });
};

export const useAssignQuestionsToTest = (testId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: questionsApi.assignQuestionsToTest,
        onSuccess: () => {
            // Refresh the "See Questions" list for this test
            queryClient.invalidateQueries({ queryKey: ["questions", "test", testId] });
        },
    });
};


export const useGetQuestions = (params: string, enabled = true) => {
    return useQuery({
        queryKey: ["questions", "", params],
        queryFn: () => questionsApi.getquestions(params),
        enabled: enabled && Boolean(params),
        retry: false,
    });
}