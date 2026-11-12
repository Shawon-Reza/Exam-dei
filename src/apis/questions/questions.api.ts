/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosApi from "@/src/lib/axios_instance"


const addQuestionToTopic = async (payload: any) => {
    const res = await axiosApi.post("/api/v1/questions",
        payload
    )
    return res.data
}


const getQuestionsByTopic = async (params: string) => {
    const res = await axiosApi.get(`/api/v1/questions?${params}`)
    return res.data
}




const getTestQuestions = async (testId: string) => {
    const res = await axiosApi.get(`/api/v1/questions/test_questions?testId=${testId}`)
    return res.data
}


const deleteQuestion = async (questionId: string) => {
    const res = await axiosApi.delete(`/api/v1/questions/${questionId}`);
    return res.data;
};


const assignQuestionsToTest = async ({
    testId,
    questions,
}: {
    testId: string;
    questions: unknown[];
}) => {
    const res = await axiosApi.post("/api/v1/questions/assign_question_to_test", {
        testID: testId,
        questions,
    });
    return res.data;
};


const getquestions = async (params: string) => {
    const res = await axiosApi.get(`/api/v1/questions?${params}`)
    return res.data
}


export const questionsApi = {
    addQuestionToTopic,
    getQuestionsByTopic,
    getTestQuestions,
    deleteQuestion,
    assignQuestionsToTest,
    getquestions
}