import axiosApi from "@/src/lib/axios_instance"


const getAllTestByTopic = async (topicId: string) => {
    const res = await axiosApi.get(`/api/v1/tests/?topicId=${topicId}`)
    return res.data
}

const createTest = async (payload: Record<string, unknown>) => {
    const res = await axiosApi.post(`/api/v1/tests`, payload)
    return res.data
}


const deleteTestByID = async (id: string) => {
    const res = await axiosApi.delete(`/api/v1/tests/${id}`)
    return res.data
}

const updateTest = async (id: string, payload: Record<string, unknown>) => {
    const res = await axiosApi.patch(`/api/v1/tests/${id}`, payload)
    return res.data
}

export const testsApi = {
    getAllTestByTopic,
    createTest,
    deleteTestByID,
    updateTest
}


