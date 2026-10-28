import axiosApi from "@/src/lib/axios_instance";

export type SubmitResultPayload = {
  testId: string;
  topicId: string;
  score: number;
  negativeScore: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  testType: "PREDEFINED" | "PRACTICE";
};

export type ResultResponse = {
  id: string;
  testId: string;
  userId: string;
  topicId: string;
  score: number;
  negativeScore: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  testType: "PREDEFINED" | "PRACTICE";
  createdAt: string;
  updatedAt: string;
};

export type SubmitResultResponse = {
  success: boolean;
  message: string;
  data?: ResultResponse;
};

async function submitResult(payload: SubmitResultPayload): Promise<SubmitResultResponse> {
  const res = await axiosApi.post("/api/v1/results/", payload);
  return res.data;
}

export const resultsApi = {
  submitResult,
};