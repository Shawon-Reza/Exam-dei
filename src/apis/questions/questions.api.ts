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
    const res = await axiosApi.get(`/api/v1/questions/assign_to_test?testID=${testId}`)
    return res.data
}


const removeQuestionFromTest = async ({
    testId,
    questionId,
}: {
    testId: string;
    questionId: string;
}) => {
    const res = await axiosApi.delete(
        `/api/v1/questions/assign_to_test?testID=${testId}&questionID=${questionId}`
    );
    return res.data;
};


const assignQuestionsToTest = async ({
    topicId,
    testId,
    questionIds,
}: {
    topicId: string;
    testId: string;
    questionIds: string[];
}) => {
    const res = await axiosApi.post("/api/v1/questions/assign_to_test", {
        topicID: topicId,
        testID: testId,
        questionIds,
    });
    return res.data;
};


export const questionsApi = {
    addQuestionToTopic,
    getQuestionsByTopic,
    getTestQuestions,
    removeQuestionFromTest,
    assignQuestionsToTest,
}