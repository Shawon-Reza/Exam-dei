import axiosApi from "@/src/lib/axios_instance"


export type CreateTestPayload = {
  name: string;
  slug: string;
  description?: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  status: "UPCOMING" | "LIVE" | "PRACTICE";
  type?: "SUBJECT" | "TOPIC";
  topicId?: string;
  subjectId?: string;
};

export type TestResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  status: "UPCOMING" | "LIVE" | "PRACTICE";
  topicId: string | null;
  subjectId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTestResponse = {
  status: number;
  success: boolean;
  message: string;
  data: TestResponse;
};

const getAllTestByTopic = async (topicId: string) => {
    const res = await axiosApi.get(`/api/v1/tests/?topicId=${topicId}`)
    return res.data
}

const getTest = async (params : string) => {
    const res = await axiosApi.get(`/api/v1/tests/${params ? `?${params}` : ""}`)
    return res.data
}

const createTest = async (payload: CreateTestPayload): Promise<CreateTestResponse> => {
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
    getTest,
    createTest,
    deleteTestByID,
    updateTest
}
